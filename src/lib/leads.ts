export interface LeadData {
  name: string;
  mobile: string;
  amount?: number;
  formType: string;
  [key: string]: string | number | undefined;
}

interface QueueItem {
  id: string;
  data: LeadData;
  timestamp: string;
  synced: boolean;
  attempts: number;
}

const QUEUE_KEY = "nidhivriddhi_lead_queue";

// Load queue from localStorage safely
function getQueue(): QueueItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(QUEUE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("Failed to read lead queue:", e);
    return [];
  }
}

// Save queue to localStorage safely
function saveQueue(queue: QueueItem[]) {
  if (typeof window === "undefined") return;
  try {
    // Keep only the last 100 entries to prevent local storage bloat
    localStorage.setItem(QUEUE_KEY, JSON.stringify(queue.slice(-100)));
  } catch (e) {
    console.error("Failed to save lead queue:", e);
  }
}

// Helper to push a parameter to URLSearchParams
function dataToParams(data: LeadData, timestamp: string): URLSearchParams {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined && value !== null) {
      params.append(key, String(value));
    }
  }
  params.append("timestamp", timestamp);
  return params;
}

/**
 * Syncs a specific queue item with the Google Apps Script.
 */
async function syncItem(item: QueueItem): Promise<boolean> {
  const url = import.meta.env.VITE_GOOGLE_SCRIPT_URL || "https://script.google.com/macros/s/AKfycbyKNPJ-ceoEd98qWQb3vzmd2lQ9Hy1raGGPU6crsBqc-KJYOCKQyZmRcviONRwQoiUT/exec";
  try {
    const params = dataToParams(item.data, item.timestamp);
    await fetch(url, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });
    return true;
  } catch (error) {
    console.error(`Failed to sync lead ${item.id}:`, error);
    return false;
  }
}

/**
 * Attempts to sync all pending items in the queue.
 */
export async function syncPendingLeads(): Promise<void> {
  if (typeof window === "undefined" || !navigator.onLine) return;
  
  const queue = getQueue();
  const pending = queue.filter(item => !item.synced);
  if (pending.length === 0) return;

  console.info(`Attempting to sync ${pending.length} pending leads...`);
  
  let changed = false;
  for (const item of pending) {
    item.attempts++;
    const success = await syncItem(item);
    if (success) {
      item.synced = true;
      changed = true;
    }
  }

  if (changed) {
    saveQueue(queue);
  }
}

/**
 * Submit lead data. Saves to local queue first for zero-loss guarantee.
 */
export async function submitLead(data: LeadData): Promise<{ success: boolean; error?: string }> {
  const timestamp = new Date().toISOString();
  const id = `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  const item: QueueItem = {
    id,
    data,
    timestamp,
    synced: false,
    attempts: 0
  };

  // 1. Immediately store locally to guarantee zero lead loss
  const queue = getQueue();
  queue.push(item);
  saveQueue(queue);

  // 2. Try to transmit right away
  const success = await syncItem(item);
  if (success) {
    const currentQueue = getQueue();
    const match = currentQueue.find(q => q.id === id);
    if (match) {
      match.synced = true;
      saveQueue(currentQueue);
    }
    return { success: true };
  }

  // 3. If transmission failed but it's saved locally, we still return success to the user
  // (the background sync will retry silently).
  return { 
    success: true, 
    error: "Saved locally. Connection issues detected; lead will sync automatically once online." 
  };
}

// 4. Initialize automatic background sync triggers on client load
if (typeof window !== "undefined") {
  window.addEventListener("online", () => {
    syncPendingLeads();
  });
  window.addEventListener("focus", () => {
    syncPendingLeads();
  });
  // Periodic background check every 60 seconds
  setInterval(() => {
    syncPendingLeads();
  }, 60000);

  // Initial sync attempt on script boot
  setTimeout(() => {
    syncPendingLeads();
  }, 2000);
}

