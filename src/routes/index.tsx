import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Phone, MessageCircle, ShieldCheck, Lock, ArrowRight, CheckCircle2,
  Sparkles, Building2, Users, Wallet, Award, Clock, TrendingUp,
  FileText, IdCard, Receipt, Banknote, Star, ChevronDown, ChevronRight,
  X, Calculator as CalcIcon, Briefcase, Stethoscope, Home, Factory,
} from "lucide-react";
import heroImg from "@/assets/hero-fintech.jpg";
import logoImg from "@/assets/logo.png";
import { submitLead } from "@/lib/leads";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nidhivriddhi — Personal Loans From 9.99% p.a. | 25+ Lending Partners" },
      { name: "description", content: "Compare loan offers from 25+ leading banks & NBFCs. Personal, business, home loans with dedicated relationship managers." },
      { property: "og:title", content: "Nidhivriddhi — Premium Loan Solutions" },
      { property: "og:description", content: "₹500 Cr+ funding facilitated. Check eligibility in 60 seconds." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: LandingPage,
});

/* -------------------- Data -------------------- */
const BANKS = [
  "HDFC Bank", "ICICI Bank", "Axis Bank", "Kotak Mahindra Bank", "IndusInd Bank",
  "Yes Bank", "IDFC FIRST Bank", "AU Small Finance Bank", "Tata Capital", "Bajaj Finserv",
  "Aditya Birla Finance", "L&T Finance", "Poonawalla Fincorp", "Hero FinCorp",
  "Piramal Finance", "SMFG India Credit", "IIFL Finance",
];

const WHATSAPP = "918073261126";
const PHONE = "+918073261126";

/* -------------------- Page -------------------- */
function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <ScrollProgress />
      <Header />
      <Hero />
      <BanksMarquee />
      <TrustCounters />
      <WhyUs />
      <EmiCalculator />
      <Testimonials />
      <HowItWorks />
      <Documents />
      <Faqs />
      <Comparison />
      <FinalTrust />
      <FinalCTA />
      <Footer />
      <StickyCTA />
      <FloatingActions />
      <ExitIntent />
    </div>
  );
}

/* -------------------- Scroll Progress -------------------- */
function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      setP(total > 0 ? (h.scrollTop / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-[3px] bg-transparent">
      <div className="h-full transition-[width] duration-150" style={{ width: `${p}%`, background: "var(--gradient-gold)" }} />
    </div>
  );
}

/* -------------------- Header -------------------- */
function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-40">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-10">
        <div className="flex items-center">
          <img src={logoImg} alt="Nidhivriddhi Logo" className="h-11 md:h-12 w-auto object-contain bg-white rounded-xl px-3.5 py-1.5 shadow-md" />
        </div>
        <a href={`tel:${PHONE}`} className="hidden items-center gap-2 rounded-full glass-dark px-4 py-2 text-sm font-medium text-white md:inline-flex">
          <Phone className="h-4 w-4 text-gold" /> {PHONE}
        </a>
      </div>
    </header>
  );
}

/* -------------------- HERO -------------------- */
function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-hero pt-28 pb-20 lg:pt-32 lg:pb-28">
      {/* Decorative glow */}
      <div aria-hidden className="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full opacity-30 blur-3xl" style={{ background: "radial-gradient(circle, oklch(0.78 0.13 82) 0%, transparent 70%)" }} />
      <div aria-hidden className="pointer-events-none absolute top-1/3 -right-40 h-[600px] w-[600px] rounded-full opacity-20 blur-3xl" style={{ background: "radial-gradient(circle, oklch(0.5 0.15 158) 0%, transparent 70%)" }} />
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(white 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:px-10">
        {/* Left */}
        <div className="text-white animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full glass-dark px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-gold">
            <Sparkles className="h-3.5 w-3.5" /> Premium Loan Advisory
          </div>
          <h1 className="mt-6 font-display text-[2.6rem] font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-[4rem]">
            Personal Loans Starting From{" "}
            <span className="text-gradient-gold">9.99% p.a.</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
            Competitive rates, a dedicated relationship manager, and funding solutions tailored for eligible customers — sourced from 25+ leading banks & NBFCs.
          </p>

          <ul className="mt-8 grid max-w-xl grid-cols-1 gap-2.5 sm:grid-cols-2">
            {[
              "Multiple Banking Partners",
              "Dedicated Relationship Manager",
              "End-to-End Assistance",
              "Fast Processing Support",
            ].map((t) => (
              <li key={t} className="flex items-center gap-2.5 rounded-xl glass-dark px-3.5 py-2.5 text-sm text-white/90">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-gold" /> {t}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex items-center gap-5 text-xs text-white/60">
            <div className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-gold" /> RBI-regulated lenders</div>
            <div className="hidden h-3 w-px bg-white/20 sm:block" />
            <div className="flex items-center gap-1.5"><Lock className="h-4 w-4 text-gold" /> 256-bit SSL secured</div>
          </div>
        </div>

        {/* Right: Form + floating image */}
        <div className="relative">
          <div className="absolute -top-10 -right-6 hidden lg:block animate-float">
            <img src={heroImg} alt="Premium banking app interface with golden coins" width={420} height={420} className="w-[340px] rounded-3xl shadow-luxe ring-1 ring-gold/30" />
          </div>
          <div className="relative z-10 rounded-3xl glass p-6 shadow-luxe sm:p-8">
            <LeadForm compact={false} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------- Lead Form (multi-step) -------------------- */
function LeadForm({ compact }: { compact: boolean }) {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState(() => {
    try {
      const saved = localStorage.getItem("nv_eligibility");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.need) return parsed.need;
      }
    } catch (e) {}
    return 500000;
  });
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const handleSync = () => {
      try {
        const saved = localStorage.getItem("nv_eligibility");
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.need && amount === 500000) {
            setAmount(parsed.need);
          }
        }
      } catch (e) {}
    };
    window.addEventListener("scroll", handleSync);
    window.addEventListener("focus", handleSync);
    return () => {
      window.removeEventListener("scroll", handleSync);
      window.removeEventListener("focus", handleSync);
    };
  }, [amount]);

  const next = () => setStep((s) => Math.min(3, s + 1));
  const back = () => setStep((s) => Math.max(1, s - 1));

  const submit = async () => {
    if (!/^[6-9]\d{9}$/.test(mobile)) return alert("Enter a valid 10-digit mobile number");
    if (name.trim().length < 2) return alert("Enter your full name");
    
    let extraData = {};
    try {
      const saved = localStorage.getItem("nv_eligibility");
      if (saved) {
        const parsed = JSON.parse(saved);
        extraData = {
          employment: parsed.employment,
          income: parsed.income,
          age: parsed.age,
          need: parsed.need,
        };
      }
    } catch (e) {}

    setSubmitting(true);
    const result = await submitLead({
      name,
      mobile,
      amount,
      formType: compact ? "Compact Lead Form" : "Main Lead Form",
      ...extraData,
    });
    setSubmitting(false);

    if (result.success) {
      setDone(true);
    } else {
      alert("Failed to submit eligibility check: " + (result.error || "Unknown error"));
    }
  };

  if (done) {
    return (
      <div className="py-8 text-center animate-fade-up">
        <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-gold to-[oklch(0.7_0.15_70)] shadow-gold animate-glow">
          <CheckCircle2 className="h-8 w-8 text-primary" />
        </div>
        <h3 className="font-display text-2xl font-semibold text-primary">You're in good hands</h3>
        <p className="mt-2 text-sm text-muted-foreground">A relationship manager will call you within 15 minutes with personalized offers.</p>
      </div>
    );
  }

  return (
    <div>
      {!compact && (
        <div className="mb-5 flex items-center justify-between">
          <div>
            <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">Step {step} of 3</div>
            <h3 className="mt-1 font-display text-2xl font-semibold text-primary">Check Eligibility</h3>
          </div>
          <div className="flex gap-1.5">
            {[1, 2, 3].map((n) => (
              <div key={n} className={`h-1.5 w-8 rounded-full transition-all ${n <= step ? "bg-gradient-to-r from-gold to-[oklch(0.7_0.15_70)]" : "bg-border"}`} />
            ))}
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-4 animate-fade-up">
          <label className="block text-sm font-medium text-foreground">Loan Amount Required</label>
          <div className="flex items-baseline gap-2 rounded-2xl border border-input bg-white/70 px-4 py-3">
            <span className="text-lg font-semibold text-primary">₹</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full bg-transparent text-2xl font-semibold text-primary outline-none"
            />
          </div>
          <input type="range" min={50000} max={10000000} step={50000} value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="w-full accent-[oklch(0.27_0.06_160)]" />
          <div className="flex justify-between text-xs text-muted-foreground"><span>₹50K</span><span>₹1Cr</span></div>
          <div className="grid grid-cols-4 gap-2">
            {[1000000, 2000000, 5000000, 10000000].map((v) => (
              <button key={v} type="button" onClick={() => setAmount(v)} className={`rounded-lg border px-2 py-1.5 text-xs font-medium transition ${amount === v ? "border-primary bg-primary text-primary-foreground" : "border-border bg-white/60 text-foreground hover:border-primary/40"}`}>
                ₹{v >= 10000000 ? `${v / 10000000}Cr` : `${v / 100000}L`}
              </button>
            ))}
          </div>
          <CtaButton onClick={next}>Continue <ArrowRight className="h-4 w-4" /></CtaButton>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4 animate-fade-up">
          <label className="block text-sm font-medium">Full Name</label>
          <input autoFocus value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Rohan Sharma"
            className="w-full rounded-2xl border border-input bg-white/70 px-4 py-3.5 text-base outline-none focus:border-primary" />
          <div className="flex gap-2">
            <button onClick={back} className="rounded-2xl border border-border px-4 py-3 text-sm font-medium">Back</button>
            <CtaButton onClick={next}>Continue <ArrowRight className="h-4 w-4" /></CtaButton>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4 animate-fade-up">
          <label className="block text-sm font-medium">Mobile Number</label>
          <div className="flex items-center gap-2 rounded-2xl border border-input bg-white/70 px-4 py-3.5">
            <span className="text-sm font-medium text-muted-foreground">+91</span>
            <input autoFocus disabled={submitting} value={mobile} onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))} placeholder="10-digit mobile"
              className="w-full bg-transparent text-base outline-none disabled:opacity-50" />
          </div>
          <div className="flex gap-2">
            <button onClick={back} disabled={submitting} className="rounded-2xl border border-border px-4 py-3 text-sm font-medium disabled:pointer-events-none disabled:opacity-50">Back</button>
            <CtaButton onClick={submit} disabled={submitting}>
              {submitting ? "Submitting..." : <>Check Eligibility <ArrowRight className="h-4 w-4" /></>}
            </CtaButton>
          </div>
          <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground"><Lock className="h-3.5 w-3.5" /> Secure & Confidential — your data is encrypted.</p>
        </div>
      )}
    </div>
  );
}

function CtaButton({ children, onClick, type = "button", disabled }: { children: React.ReactNode; onClick?: () => void; type?: "button" | "submit"; disabled?: boolean; }) {
  return (
    <button type={type} onClick={onClick} disabled={disabled}
      className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-primary to-primary-glow px-5 py-3.5 text-sm font-semibold text-primary-foreground shadow-luxe transition hover:shadow-gold hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-50">
      {children}
    </button>
  );
}

/* -------------------- Banks Marquee -------------------- */
function BankPill({ name }: { name: string }) {
  return (
    <div className="flex h-16 w-44 shrink-0 items-center justify-center rounded-xl border border-border bg-white px-4 text-center text-sm font-semibold text-muted-foreground transition hover:text-primary hover:shadow-md hover:-translate-y-0.5 hover:border-primary/30">
      {name}
    </div>
  );
}

function BanksMarquee() {
  const loop = [...BANKS, ...BANKS];
  return (
    <section className="border-b border-border bg-gradient-to-b from-background to-secondary py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-5 text-center lg:px-10">
        <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-glow">Trusted Lending Partners</div>
        <h2 className="mt-3 font-display text-3xl font-semibold text-primary sm:text-4xl lg:text-[2.75rem]">
          Access Funding Through Leading <br className="hidden sm:block" /> Banks & Financial Institutions
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">Compare multiple lender options through a single application process.</p>
      </div>

      <div className="relative mt-12 overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-background to-transparent" />
        <div aria-hidden className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-secondary to-transparent" />
        <div className="flex w-max gap-4 animate-marquee">
          {loop.map((b, i) => <BankPill key={i} name={b} />)}
        </div>
      </div>
    </section>
  );
}

/* -------------------- Trust Counters -------------------- */
function useCountUp(target: number, duration = 1600) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          setVal(Math.floor(target * eased));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.3 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target, duration]);
  return { val, ref };
}

function Counter({ value, suffix, prefix, label, icon: Icon }: { value: number; suffix?: string; prefix?: string; label: string; icon: React.ElementType }) {
  const { val, ref } = useCountUp(value);
  return (
    <div ref={ref} className="rounded-2xl border border-border bg-card p-6 text-center shadow-sm">
      <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-xl bg-primary/5 text-primary">
        <Icon className="h-6 w-6" />
      </div>
      <div className="font-display text-3xl font-semibold text-primary lg:text-4xl">
        {prefix}{val.toLocaleString("en-IN")}{suffix}
      </div>
      <div className="mt-1.5 text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

function TrustCounters() {
  return (
    <section className="bg-secondary pb-20">
      <div className="mx-auto grid max-w-7xl gap-4 px-5 sm:grid-cols-2 lg:grid-cols-4 lg:px-10">
        <Counter icon={Wallet} prefix="₹" value={500} suffix="+ Cr" label="Funding Facilitated" />
        <Counter icon={Users} value={10000} suffix="+" label="Customers Assisted" />
        <Counter icon={Building2} value={25} suffix="+" label="Lending Partners" />
        <Counter icon={Award} value={100} suffix="%" label="Dedicated Support" />
      </div>
    </section>
  );
}

/* -------------------- Why Us -------------------- */
function WhyUs() {
  const items = [
    { icon: Building2, title: "Multiple Lender Comparison", desc: "Side-by-side offers from 25+ leading banks and NBFCs." },
    { icon: Users, title: "Dedicated Relationship Manager", desc: "A single point of contact through every stage of your loan." },
    { icon: Clock, title: "Faster Processing Guidance", desc: "Streamlined documentation and follow-ups for quicker turnaround." },
    { icon: TrendingUp, title: "Competitive Funding Solutions", desc: "Offers tailored to your profile, income, and repayment capacity." },
    { icon: Sparkles, title: "Expert Consultation", desc: "Advisory from professionals who understand lender requirements." },
    { icon: ShieldCheck, title: "End-to-End Support", desc: "From document collection to disbursal — we manage it all." },
  ];
  return (
    <Section eyebrow="The Nidhivriddhi Advantage" title="Why customers choose Nidhivriddhi">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => (
          <div key={it.title} className="group relative overflow-hidden rounded-2xl border border-border bg-card p-7 transition hover:-translate-y-1 hover:shadow-luxe">
            <div className="mb-5 inline-grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary-glow text-primary-foreground transition group-hover:scale-110">
              <it.icon className="h-6 w-6" />
            </div>
            <h3 className="font-display text-xl font-semibold text-primary">{it.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{it.desc}</p>
            <div aria-hidden className="absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-gold/0 blur-2xl transition group-hover:bg-gold/20" />
          </div>
        ))}
      </div>
    </Section>
  );
}

function Section({ eyebrow, title, subtitle, children, dark, id }: { eyebrow?: string; title: string; subtitle?: string; children: React.ReactNode; dark?: boolean; id?: string; }) {
  return (
    <section id={id} className={`py-20 lg:py-28 ${dark ? "bg-hero text-white" : ""}`}>
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          {eyebrow && <div className={`text-[11px] font-semibold uppercase tracking-[0.22em] ${dark ? "text-gold" : "text-primary-glow"}`}>{eyebrow}</div>}
          <h2 className={`mt-3 font-display text-3xl font-semibold sm:text-4xl lg:text-[2.75rem] ${dark ? "text-white" : "text-primary"}`}>{title}</h2>
          {subtitle && <p className={`mx-auto mt-4 max-w-xl ${dark ? "text-white/70" : "text-muted-foreground"}`}>{subtitle}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}



/* -------------------- EMI Calculator -------------------- */
function EmiCalculator() {
  const [amount, setAmount] = useState(500000);
  const [rate, setRate] = useState(9.99);
  const [tenure, setTenure] = useState(36);

  const { emi, totalInterest, total } = useMemo(() => {
    const r = rate / 12 / 100;
    const n = tenure;
    const emi = (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const total = emi * n;
    return { emi: Math.round(emi), totalInterest: Math.round(total - amount), total: Math.round(total) };
  }, [amount, rate, tenure]);

  const principalPct = (amount / total) * 100;
  const interestPct = 100 - principalPct;

  return (
    <Section eyebrow="EMI Calculator" title="Plan your repayment with confidence">
      <div className="grid gap-6 rounded-3xl border border-border bg-card p-6 shadow-luxe lg:grid-cols-[1.2fr_1fr] lg:p-10">
        <div className="space-y-7">
          <Slider label="Loan Amount" value={amount} setValue={setAmount} min={50000} max={10000000} step={50000} display={`₹ ${amount.toLocaleString("en-IN")}`} isEditable />
          <Slider label="Interest Rate" value={rate} setValue={setRate} min={9.99} max={24} step={0.01} display={`${rate.toFixed(2)} % p.a.`} isEditable />
          <Slider label="Tenure" value={tenure} setValue={setTenure} min={6} max={84} step={1} display={`${tenure} months`} isEditable />
        </div>

        <div className="rounded-2xl bg-hero p-7 text-white">
          <div className="text-xs uppercase tracking-[0.18em] text-gold">Monthly EMI</div>
          <div className="mt-2 font-display text-4xl font-semibold text-gradient-gold">₹ {emi.toLocaleString("en-IN")}</div>

          {/* Donut */}
          <div className="my-7 grid place-items-center">
            <div className="relative h-44 w-44 rounded-full" style={{ background: `conic-gradient(oklch(0.78 0.13 82) 0 ${principalPct}%, oklch(0.45 0.09 158) ${principalPct}% 100%)` }}>
              <div className="absolute inset-3 grid place-items-center rounded-full bg-primary text-center">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.18em] text-white/60">Total</div>
                  <div className="font-display text-lg font-semibold text-white">
                    {total >= 10000000 ? `₹ ${(total / 10000000).toFixed(2)}Cr` : `₹ ${(total / 100000).toFixed(2)}L`}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-xl bg-white/5 p-3">
              <div className="flex items-center gap-2 text-white/60"><span className="h-2.5 w-2.5 rounded-full bg-gold" /> Principal</div>
              <div className="mt-1 font-semibold">₹ {amount.toLocaleString("en-IN")}</div>
            </div>
            <div className="rounded-xl bg-white/5 p-3">
              <div className="flex items-center gap-2 text-white/60"><span className="h-2.5 w-2.5 rounded-full" style={{ background: "oklch(0.45 0.09 158)" }} /> Interest</div>
              <div className="mt-1 font-semibold">₹ {totalInterest.toLocaleString("en-IN")}</div>
            </div>
          </div>
          <div className="mt-3 text-center text-xs text-white/50">Interest {interestPct.toFixed(0)}% of total repayment</div>
        </div>
      </div>
    </Section>
  );
}

function Slider({ label, value, setValue, min, max, step, display, isEditable }: { label: string; value: number; setValue: (n: number) => void; min: number; max: number; step: number; display: string; isEditable?: boolean; }) {
  const [editing, setEditing] = useState(false);
  const [tempVal, setTempVal] = useState(String(value));

  useEffect(() => {
    setTempVal(String(value));
  }, [value]);

  const finishEdit = () => {
    setEditing(false);
    let num = Number(tempVal.replace(/[^0-9.]/g, ""));
    if (isNaN(num)) num = value;
    num = Math.max(min, Math.min(max, num));
    setValue(num);
  };

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium">{label}</span>
        {isEditable && editing ? (
          <input
            type="number"
            value={tempVal}
            onChange={(e) => setTempVal(e.target.value)}
            onBlur={finishEdit}
            onKeyDown={(e) => e.key === "Enter" && finishEdit()}
            autoFocus
            className="w-28 rounded-lg border border-primary bg-white px-2 py-0.5 text-right text-sm font-semibold text-primary outline-none"
          />
        ) : (
          <span
            onClick={() => isEditable && setEditing(true)}
            className={`rounded-lg bg-secondary px-3 py-1 text-sm font-semibold text-primary ${isEditable ? "cursor-pointer hover:bg-secondary/80 hover:text-primary-glow" : ""}`}
            title={isEditable ? "Click to edit amount" : undefined}
          >
            {display}
          </span>
        )}
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => setValue(Number(e.target.value))} className="w-full accent-[oklch(0.27_0.06_160)]" />
    </div>
  );
}

const TESTIMONIALS = [
  { name: "Rohan Sharma", role: "Senior Software Engineer — Bengaluru", initials: "RS", review: "Got a personal loan approved in less than 24 hours for my home renovation. The relationship manager handled all the bank coordination smoothly.", rating: 5 },
  { name: "Priya Iyer", role: "Consultant — Bengaluru", initials: "PI", review: "Consolidated all my high-interest credit card debts into a single personal loan at 10.2% p.a. The monthly savings on interest payments are huge.", rating: 5 },
  { name: "Aditya Sen", role: "Data Scientist — Pune", initials: "AS", review: "Outstanding rate matching. I was skeptical about the 9.99% rate, but they successfully matched me with a leading lender with minimal documentation.", rating: 5 },
  { name: "Meera Kapoor", role: "Design Director — Mumbai", initials: "MK", review: "Needed urgent personal funds for a family medical procedure. They got the loan processed and disbursed within 48 hours. Absolute lifesaver.", rating: 5 },
  { name: "Kunal Verma", role: "Product Manager — Delhi NCR", initials: "KV", review: "Applied for a wedding expenses loan. The portal made it easy to compare and select a bank with flexible pre-closure options and zero hidden charges.", rating: 5 },
];
function Testimonials() {
  const loop = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];
  return (
    <Section eyebrow="Customer Success Stories" title="Trusted by professionals across India">
      <div className="relative mt-8 overflow-hidden">
        {/* Soft edge gradients for smooth visual blend */}
        <div aria-hidden className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-background to-transparent" />
        <div aria-hidden className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-background to-transparent" />
        
        <div className="flex w-max gap-6 animate-marquee-slow hover:[animation-play-state:paused] py-4">
          {loop.map((t, idx) => (
            <div key={idx} className="w-[360px] md:w-[400px] shrink-0 rounded-3xl border border-border bg-card p-6 shadow-luxe transition hover:-translate-y-1 hover:shadow-gold hover:border-gold/30">
              <div className="flex items-center gap-1 text-gold">
                {Array.from({ length: t.rating }).map((_, k) => <Star key={k} className="h-4 w-4 fill-current" />)}
              </div>
              <p className="mt-4 font-display text-base font-medium leading-relaxed text-primary">"{t.review}"</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-primary to-primary-glow text-sm font-semibold text-primary-foreground">{t.initials}</div>
                <div>
                  <div className="font-semibold text-primary text-sm">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* -------------------- How It Works -------------------- */
function HowItWorks() {
  const steps = [
    { n: "01", title: "Submit Your Details", desc: "Share basics in 60 seconds — name, mobile and loan requirement.", icon: FileText },
    { n: "02", title: "Expert Assessment", desc: "Our advisor matches your profile against 25+ lender criteria.", icon: Users },
    { n: "03", title: "Bank Processing & Disbursal", desc: "We coordinate documentation, approval and fund transfer.", icon: Banknote },
  ];
  return (
    <Section eyebrow="How It Works" title="From application to disbursal — effortlessly" dark>
      <div className="relative grid gap-6 lg:grid-cols-3">
        <div aria-hidden className="pointer-events-none absolute left-[16%] right-[16%] top-12 hidden h-px bg-gradient-to-r from-transparent via-gold to-transparent lg:block" />
        {steps.map((s) => (
          <div key={s.n} className="relative rounded-3xl glass-dark p-8 transition hover:-translate-y-1">
            <div className="relative mx-auto mb-5 grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-gold to-[oklch(0.7_0.15_70)] text-primary shadow-gold">
              <s.icon className="h-8 w-8" />
              <span className="absolute -top-2 -right-2 grid h-8 w-8 place-items-center rounded-full bg-primary text-xs font-bold text-gold">{s.n}</span>
            </div>
            <h3 className="text-center font-display text-xl font-semibold text-white">{s.title}</h3>
            <p className="mt-2 text-center text-sm text-white/70">{s.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* -------------------- Documents -------------------- */
function Documents() {
  const docs = [
    { icon: IdCard, title: "PAN Card", desc: "Permanent Account Number for identity verification" },
    { icon: IdCard, title: "Aadhaar Card", desc: "Government-issued address & identity proof" },
    { icon: Receipt, title: "Salary Slips", desc: "Latest 3 months payslips" },
    { icon: FileText, title: "Bank Statements", desc: "Last 6 months primary account statement" },
  ];
  return (
    <Section eyebrow="Documents Required" title="Minimal paperwork. Maximum convenience.">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {docs.map((d) => (
          <div key={d.title} className="group rounded-2xl border border-border bg-card p-6 text-center transition hover:-translate-y-1 hover:shadow-luxe">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-primary to-primary-glow text-primary-foreground transition group-hover:rotate-6">
              <d.icon className="h-7 w-7" />
            </div>
            <h3 className="mt-4 font-display text-lg font-semibold text-primary">{d.title}</h3>
            <p className="mt-1 text-xs text-muted-foreground">{d.desc}</p>
          </div>
        ))}
      </div>
      <p className="mt-6 text-center text-sm text-muted-foreground">Document requirements may vary by lender and product. Our advisor will share the exact list.</p>
    </Section>
  );
}

/* -------------------- FAQ -------------------- */
const FAQ = [
  { q: "Will checking eligibility affect my credit score?", a: "No. Our initial eligibility check is a soft inquiry and does not impact your credit score." },
  { q: "How much loan can I get?", a: "Eligibility depends on income, employment type, age, and existing obligations. Use the calculator above for an instant estimate." },
  { q: "What documents are required?", a: "Typically PAN, Aadhaar, latest payslips, and bank statements. Self-employed customers may need ITRs and business proof." },
  { q: "How long does approval take?", a: "With pre-vetted profiles, sanctions can be issued within 24–72 hours depending on the lender and product." },
  { q: "Can I apply with existing loans?", a: "Yes. We assess your overall obligation ratio and match you with lenders comfortable with your profile." },
  { q: "Is collateral required?", a: "Personal loans and business loans are unsecured. Home loans, LAP and certain business products require collateral." },
  { q: "What charges apply?", a: "Lenders typically charge a processing fee. Our advisory service is free for borrowers." },
  { q: "Which banks do you work with?", a: "HDFC, ICICI, Axis, Kotak, Bajaj Finserv, Tata Capital and 20+ leading institutions." },
];
function Faqs() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section eyebrow="Common Questions" title="Everything you need to know about Personal Loans">
      <div className="mx-auto max-w-3xl space-y-3">
        {FAQ.map((f, i) => (
          <div key={i} className="overflow-hidden rounded-2xl border border-border bg-card">
            <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left">
              <span className="font-display text-base font-semibold text-primary sm:text-lg">{f.q}</span>
              <ChevronDown className={`h-5 w-5 shrink-0 text-primary transition-transform ${open === i ? "rotate-180" : ""}`} />
            </button>
            {open === i && <div className="px-6 pb-5 text-sm leading-relaxed text-muted-foreground animate-fade-up">{f.a}</div>}
          </div>
        ))}
      </div>
    </Section>
  );
}

/* -------------------- Comparison -------------------- */
function Comparison() {
  const rows = [
    ["Number of lender options", "1 at a time", "25+ in one application"],
    ["Expert guidance", "Self-research", "Dedicated relationship manager"],
    ["Comparison & negotiation", "Manual", "Done on your behalf"],
    ["Documentation effort", "Repeated for each bank", "Submitted once"],
    ["Single point of contact", "No", "Yes — always"],
    ["Processing follow-ups", "You chase the bank", "We chase the bank"],
  ];
  return (
    <Section eyebrow="Why Apply Through Nidhivriddhi" title="The smarter way to access funding">
      <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-luxe">
        <div className="grid grid-cols-3 bg-gradient-to-r from-primary to-primary-glow px-6 py-5 text-sm font-semibold text-primary-foreground">
          <div>Criteria</div>
          <div className="text-center">Applying Directly</div>
          <div className="text-center text-gold">Via Nidhivriddhi</div>
        </div>
        {rows.map(([c, a, b], i) => (
          <div key={i} className={`grid grid-cols-3 items-center gap-2 px-6 py-4 text-sm ${i % 2 ? "bg-secondary" : "bg-card"}`}>
            <div className="font-medium text-foreground">{c}</div>
            <div className="flex items-center justify-center gap-2 text-muted-foreground"><X className="h-4 w-4 text-rose-500" /> {a}</div>
            <div className="flex items-center justify-center gap-2 font-medium text-primary"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> {b}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* -------------------- Final Trust -------------------- */
function FinalTrust() {
  const loop = [...BANKS, ...BANKS];
  return (
    <section className="bg-secondary py-16">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <div className="text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-glow">25+ Trusted Partners</div>
        <h2 className="mt-3 text-center font-display text-2xl font-semibold text-primary sm:text-3xl">Backed by India's most respected financial institutions</h2>
      </div>
      <div className="relative mt-10 overflow-hidden">
        <div className="flex w-max gap-4 animate-marquee">
          {loop.map((b, i) => <BankPill key={i} name={b} />)}
        </div>
      </div>
      <div className="mx-auto mt-12 grid max-w-7xl gap-4 px-5 sm:grid-cols-2 lg:grid-cols-4 lg:px-10">
        <Counter icon={Wallet} prefix="₹" value={500} suffix="+ Cr" label="Funding Facilitated" />
        <Counter icon={Users} value={10000} suffix="+" label="Customers Assisted" />
        <Counter icon={Star} value={4} suffix=".9/5" label="Average Customer Rating" />
        <Counter icon={Building2} value={25} suffix="+" label="Banking Partners" />
      </div>
    </section>
  );
}

/* -------------------- Final CTA -------------------- */
function FinalCTA() {
  return (
    <section id="apply" className="relative isolate overflow-hidden bg-hero py-24 lg:py-32">
      <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full opacity-30 blur-3xl" style={{ background: "radial-gradient(circle, oklch(0.78 0.13 82) 0%, transparent 70%)" }} />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-2 lg:px-10">
        <div className="text-white">
          <div className="inline-flex items-center gap-2 rounded-full glass-dark px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-gold">
            <Clock className="h-3.5 w-3.5" /> Applications Being Processed Today
          </div>
          <h2 className="mt-5 font-display text-4xl font-semibold leading-tight sm:text-5xl lg:text-[3.5rem]">
            See If You're <span className="text-gradient-gold">Eligible Today</span>
          </h2>
          <p className="mt-5 max-w-md text-lg text-white/75">Get personalized funding options from multiple lenders — within minutes, not days.</p>
          <div className="mt-8 grid max-w-md grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2 text-white/80"><ShieldCheck className="h-4 w-4 text-gold" /> RBI-regulated lenders</div>
            <div className="flex items-center gap-2 text-white/80"><Lock className="h-4 w-4 text-gold" /> 256-bit SSL secured</div>
            <div className="flex items-center gap-2 text-white/80"><CheckCircle2 className="h-4 w-4 text-gold" /> No impact on credit score</div>
            <div className="flex items-center gap-2 text-white/80"><Star className="h-4 w-4 text-gold" /> 4.9/5 customer rating</div>
          </div>
        </div>
        <div className="rounded-3xl glass p-7 shadow-luxe sm:p-9">
          <LeadForm compact={false} />
        </div>
      </div>
    </section>
  );
}

/* -------------------- Footer -------------------- */
function Footer() {
  const products = [
    { icon: Wallet, name: "Personal Loan" },
    { icon: Briefcase, name: "Business Loan" },
    { icon: Home, name: "Home Loan" },
    { icon: Building2, name: "Loan Against Property" },
    { icon: Factory, name: "Working Capital" },
    { icon: Stethoscope, name: "Doctor Loan" },
  ];
  return (
    <footer className="bg-[oklch(0.14_0.04_162)] py-16 text-white/70">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <div className="flex items-center">
              <img src={logoImg} alt="Nidhivriddhi Logo" className="h-11 w-auto object-contain bg-white rounded-xl px-3.5 py-1.5 shadow-md" />
            </div>
            <p className="mt-5 max-w-sm text-sm">A premium loan advisory partner connecting you with India's leading banks and NBFCs.</p>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-gold">Loan Products</div>
            <ul className="mt-4 space-y-2.5 text-sm">
              {products.map((p) => (
                <li key={p.name} className="flex items-center gap-2"><p.icon className="h-4 w-4 text-gold/70" /> {p.name}</li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-gold">Get In Touch</div>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li className="flex items-center gap-2">
                <a href={`tel:${PHONE}`} className="flex items-center gap-2 hover:text-white transition">
                  <Phone className="h-4 w-4 text-gold/70" /> {PHONE}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition">
                  <MessageCircle className="h-4 w-4 text-gold/70" /> WhatsApp Support
                </a>
              </li>
              <li className="flex items-center gap-2"><Clock className="h-4 w-4 text-gold/70" /> Mon–Sat, 10 AM–7 PM</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-xs sm:flex-row sm:items-center">
          <div>© {new Date().getFullYear()} Nidhivriddhi. All rights reserved.</div>
          <div>Loans are subject to lender approval. T&Cs apply.</div>
        </div>
      </div>
    </footer>
  );
}

/* -------------------- Sticky Mobile CTA -------------------- */
function StickyCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-white/95 p-3 backdrop-blur md:hidden">
      <a href="#apply" className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary-glow px-5 py-3.5 text-sm font-semibold text-primary-foreground shadow-luxe">
        Check My Eligibility <ChevronRight className="h-4 w-4" />
      </a>
    </div>
  );
}

/* -------------------- Floating WhatsApp + Call -------------------- */
function FloatingActions() {
  return (
    <div className="fixed bottom-20 right-4 z-40 flex flex-col gap-3 md:bottom-6">
      <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener" aria-label="WhatsApp"
        className="grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-luxe transition hover:scale-110 animate-glow">
        <MessageCircle className="h-6 w-6" />
      </a>
      <a href={`tel:${PHONE}`} aria-label="Call" className="hidden h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-luxe transition hover:scale-110 md:grid">
        <Phone className="h-6 w-6" />
      </a>
    </div>
  );
}

/* -------------------- Exit Intent -------------------- */
function ExitIntent() {
  const [show, setShow] = useState(false);
  const allowBack = useRef(false);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Push dummy state to capture back button
    window.history.pushState(null, "", window.location.href);

    const handlePopState = () => {
      if (allowBack.current) return;
      
      // Show the popup
      setShow(true);
      
      // Push state again to block the navigation
      window.history.pushState(null, "", window.location.href);
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const handleClose = () => {
    setShow(false);
    allowBack.current = true;
    window.history.back(); // Perform the back navigation they requested
  };

  const handleSubmit = async () => {
    if (name.trim().length < 2) return alert("Please enter your full name");
    if (!/^[6-9]\d{9}$/.test(mobile)) return alert("Please enter a valid 10-digit mobile number");

    setSubmitting(true);
    const result = await submitLead({
      name,
      mobile,
      formType: "Exit Intent Form",
    });
    setSubmitting(false);

    if (result.success) {
      setDone(true);
      setTimeout(() => {
        setShow(false);
        allowBack.current = true;
        window.history.back();
      }, 2000);
    } else {
      alert("Failed to submit eligibility check: " + (result.error || "Unknown error"));
    }
  };

  if (!show) return null;
  return (
    <div className="fixed inset-0 z-[80] grid place-items-center bg-black/60 p-4 backdrop-blur-sm animate-fade-up">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-card p-8 shadow-luxe">
        <button onClick={handleClose} className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-secondary text-muted-foreground hover:text-primary" aria-label="Close">
          <X className="h-4 w-4" />
        </button>
        <div className="inline-flex items-center gap-2 rounded-full bg-gold/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-foreground">
          <Sparkles className="h-3.5 w-3.5" /> Before You Leave
        </div>
        <h3 className="mt-4 font-display text-3xl font-semibold text-primary">Check your eligibility today</h3>
        <p className="mt-2 text-sm text-muted-foreground">It takes 60 seconds. We'll match you with the best lender for your profile.</p>

        {done ? (
          <div className="mt-6 rounded-2xl bg-secondary p-5 text-center text-sm text-primary animate-fade-up">Thank you! We'll reach out shortly.</div>
        ) : (
          <div className="mt-5 space-y-3">
            <input disabled={submitting} value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" className="w-full rounded-xl border border-input bg-white px-4 py-3 outline-none focus:border-primary disabled:opacity-50" />
            <input disabled={submitting} value={mobile} onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))} placeholder="Mobile Number" className="w-full rounded-xl border border-input bg-white px-4 py-3 outline-none focus:border-primary disabled:opacity-50" />
            <CtaButton onClick={handleSubmit} disabled={submitting}>
              {submitting ? "Submitting..." : <>Check Eligibility <ArrowRight className="h-4 w-4" /></>}
            </CtaButton>
          </div>
        )}
      </div>
    </div>
  );
}
