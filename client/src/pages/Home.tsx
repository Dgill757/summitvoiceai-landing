/**
 * Signal & Steel page direction: a dark industrial revenue-operations experience.
 * The visual system uses a cyan opportunity signal, precise data hierarchy, and grounded roofing imagery.
 */
import { useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  Database,
  Gauge,
  Headphones,
  LineChart,
  MessageSquareText,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  TriangleAlert,
  Zap,
} from "lucide-react";

const CALENDAR_URL = import.meta.env.VITE_CALENDAR_URL || "https://calendly.com/summitvoiceai/revenue-audit";
const MONTHLY_FEE = 1497;
const IMPLEMENTATION_FEE = 3000;
const FIRST_YEAR_INVESTMENT = MONTHLY_FEE * 12 + IMPLEMENTATION_FEE;

const currency = (value: number, maximumFractionDigits = 0) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits,
  }).format(Number.isFinite(value) ? value : 0);

const number = (value: number) =>
  new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(
    Number.isFinite(value) ? value : 0,
  );

function trackEvent(event: string, detail: Record<string, unknown> = {}) {
  window.dispatchEvent(new CustomEvent("summitvoiceai:analytics", { detail: { event, ...detail } }));
}

function scrollToBooking() {
  trackEvent("booking_cta_clicked");
  document.getElementById("book-audit")?.scrollIntoView({ behavior: "smooth", block: "center" });
}

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <a className="brand-lockup" href="#top" aria-label="SummitVoiceAI home">
      <img
        className="brand-mark"
        src="/images/logo-mark.png"
        alt=""
      />
      {!compact && (
        <span className="brand-wordmark">
          <span>SUMMIT</span>
          <em>VOICE</em>
          <span>AI</span>
        </span>
      )}
    </a>
  );
}

function PrimaryCta({
  children = "Book My Free Revenue Leak Audit",
  className = "",
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <button type="button" className={`cta-button ${className}`} onClick={scrollToBooking}>
      <span>{children}</span>
      <ArrowUpRight size={18} strokeWidth={2.6} aria-hidden="true" />
    </button>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="section-label"><span />{children}</p>;
}

function Metric({
  label,
  value,
  hint,
  accent = false,
}: {
  label: string;
  value: string;
  hint?: string;
  accent?: boolean;
}) {
  return (
    <div className={`metric ${accent ? "metric-accent" : ""}`}>
      <span>{label}</span>
      <strong>{value}</strong>
      {hint && <small>{hint}</small>}
    </div>
  );
}

function FadeUp({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.23, 1, 0.32, 1] }}>
      {children}
    </motion.div>
  );
}

export default function Home() {
  const [missedCalls, setMissedCalls] = useState(4);
  const [jobValue, setJobValue] = useState(9500);
  const [closeOutOfTen, setCloseOutOfTen] = useState(4);
  const [databaseSize, setDatabaseSize] = useState(2000);
  const [company, setCompany] = useState("");
  const [showMath, setShowMath] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  const calc = useMemo(() => {
    const closeRate = closeOutOfTen / 10;
    const daily = missedCalls * jobValue * closeRate;
    const weekly = daily * 5;
    const annual = weekly * 52;
    const monthly = annual / 12;
    const tenPercent = annual * 0.1;
    const oneJobAnnual = jobValue * 12;
    const oneJobRatio = oneJobAnnual / FIRST_YEAR_INVESTMENT;
    const jobsToFee = FIRST_YEAR_INVESTMENT / Math.max(jobValue, 1);
    const monthlyFeePercent = (MONTHLY_FEE / Math.max(jobValue, 1)) * 100;
    const everyTwoMonths = jobValue * 6;
    const everyTwoMonthsRatio = everyTwoMonths / FIRST_YEAR_INVESTMENT;
    const lowContacts = databaseSize * 0.03;
    const highContacts = databaseSize * 0.16;
    const lowRevenue = lowContacts * closeRate * jobValue;
    const highRevenue = highContacts * closeRate * jobValue;
    return {
      closeRate,
      daily,
      weekly,
      monthly,
      annual,
      tenPercent,
      oneJobAnnual,
      oneJobRatio,
      jobsToFee,
      monthlyFeePercent,
      everyTwoMonths,
      everyTwoMonthsRatio,
      lowContacts,
      highContacts,
      lowRevenue,
      highRevenue,
    };
  }, [missedCalls, jobValue, closeOutOfTen, databaseSize]);

  const handleNumeric = (
    value: string,
    setter: (nextValue: number) => void,
    max: number,
    eventName: string,
  ) => {
    const sanitized = Number(value.replace(/[^0-9]/g, ""));
    setter(Math.min(Math.max(sanitized || 0, 0), max));
    trackEvent(eventName);
  };

  const openCalendar = () => {
    trackEvent("booking_started", {
      missedCalls,
      jobValue,
      closeRate: calc.closeRate,
      databaseSize,
      annualOpportunity: calc.annual,
    });
    if (CALENDAR_URL) {
      window.open(CALENDAR_URL, "_blank", "noopener,noreferrer");
      return;
    }
    setBookingSubmitted(true);
  };

  return (
    <main id="top" className="site-shell">
      <div className="signal-scan" aria-hidden="true" />
      <header className="site-header">
        <div className="header-inner">
          <Logo />
          <div className="header-action">
            <span>Already thinking about it?</span>
            <button type="button" onClick={scrollToBooking} className="header-link">
              Book your audit <ArrowUpRight size={14} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <section className="hero-section">
        <div className="hero-image" aria-hidden="true" />
        <div className="hero-glow" aria-hidden="true" />
        <div className="container hero-grid">
          <FadeUp className="hero-copy reveal-up" delay={0}>
            <SectionLabel>For roofing companies already spending money on leads</SectionLabel>
            <h1>
              Your next roofing job may already be <em>sitting in your CRM.</em>
            </h1>
            <p className="hero-lead">
              SummitVoiceAI installs a done-for-you AI Revenue Recovery System that helps roofing companies answer calls 24/7, respond to new leads immediately, follow up with unsold estimates, reactivate old leads, book appointments automatically — and systematically generate reviews. Before you spend another dollar generating opportunities, let's make sure you're monetizing the ones you've already paid for.
            </p>
            <div className="hero-actions">
              <PrimaryCta />
              <p className="microcopy">✓ No obligation&nbsp;&nbsp;✓ No CRM replacement&nbsp;&nbsp;✓ No lead package required</p>
            </div>
          </FadeUp>
          <FadeUp delay={0.18}>
          <div className="hero-board reveal-up delay-2" aria-label="Revenue recovery pipeline illustration">
            <div className="board-topline">
              <span className="live-dot" /> Revenue recovery is live
              <span className="board-time">24/7 coverage</span>
            </div>
            <div className="pipeline-row pipeline-primary">
              <div className="pipeline-icon"><PhoneCall size={18} /></div>
              <div><span>INCOMING CALL</span><strong>8:37 PM</strong></div>
              <ChevronRight className="pipeline-arrow" size={16} />
              <div className="pipeline-state"><span className="state-dot" /> AI ANSWERED</div>
              <ChevronRight className="pipeline-arrow" size={16} />
              <div className="pipeline-state success"><CalendarDays size={15} /> APPOINTMENT</div>
            </div>
            <div className="pipeline-row">
              <div className="pipeline-icon warning"><TriangleAlert size={18} /></div>
              <div><span>MISSED CALL</span><strong>Recovery starts</strong></div>
              <ChevronRight className="pipeline-arrow" size={16} />
              <div className="pipeline-state"><MessageSquareText size={15} /> TEXT SENT</div>
              <ChevronRight className="pipeline-arrow" size={16} />
              <div className="pipeline-state success"><Check size={15} /> INSPECTION</div>
            </div>
            <div className="pipeline-row">
              <div className="pipeline-icon"><Database size={18} /></div>
              <div><span>OLD ESTIMATE</span><strong>17 days inactive</strong></div>
              <ChevronRight className="pipeline-arrow" size={16} />
              <div className="pipeline-state"><Zap size={15} /> REACTIVATED</div>
              <ChevronRight className="pipeline-arrow" size={16} />
              <div className="pipeline-state success"><CircleDollarSign size={15} /> OPPORTUNITY</div>
            </div>
            <div className="board-footer"><span>Signal path</span><div className="signal-line"><i /></div><b>RECOVER → BOOK → MEASURE</b></div>
          </div>
          </FadeUp>
        </div>
        <div className="hero-footnote container">
          <span>01 / THE PROBLEM</span>
          <p>Before you buy another lead, make sure you're monetizing the ones you've already paid for.</p>
        </div>
      </section>

      <section className="leak-section section-pad">
        <div className="container two-column-intro">
          <div>
            <SectionLabel>The leakage problem</SectionLabel>
            <h2>You may not have a lead problem. You may have a <em>revenue leakage problem.</em></h2>
          </div>
          <div className="intro-side">
            <p>Roofers spend thousands generating calls, leads, estimates, and referrals. Then opportunities leak through missed calls, slow response, no follow-up, cold estimates, forgotten CRM leads, and no review requests. Buying more leads simply pours more water into a leaking bucket.</p>
          </div>
        </div>
        <div className="container leak-stage">
          <div className="leak-chart">
            <div className="funnel-label label-a">Paid traffic + referrals</div>
            <div className="funnel-label label-b">Calls, forms &amp; estimates enter</div>
            <div className="funnel-shape">
              <div className="lead-stream"><i /><i /><i /><i /><i /></div>
              <span className="leak-point leak-one">MISSED CALL <b>↓</b></span>
              <span className="leak-point leak-two">COLD ESTIMATE <b>↓</b></span>
              <span className="leak-point leak-three">NO FOLLOW-UP <b>↓</b></span>
              <div className="funnel-core">OPPORTUNITIES<br /><em>IN MOTION</em></div>
              <div className="lost-revenue">LOST REVENUE<br /><small>when nothing catches the leak</small></div>
            </div>
          </div>
          <FadeUp delay={0.15}>
          <aside className="leak-aside">
            <span className="aside-number">02</span>
            <h3>Lead generation is only half the system.</h3>
            <p>The other half is what happens in the minutes, days, and weeks after someone reaches out.</p>
            <PrimaryCta className="cta-compact">Find my revenue leaks</PrimaryCta>
          </aside>
          </FadeUp>
        </div>
      </section>

      <section id="calculator" className="calculator-section section-pad">
        <div className="container">
          <div className="calculator-heading">
            <div>
              <SectionLabel>Interactive diagnostic / 03</SectionLabel>
              <h2>The Roofing Revenue Leak <em>Calculator™</em></h2>
              <p>Use your own operating numbers. We will show the model, then reduce it to the conservative scenarios that actually make the decision clear.</p>
            </div>
            <div className="calculator-status"><span className="live-dot" /> Updates instantly as you change the inputs</div>
          </div>

          <div className="calculator-console">
            <div className="calculator-inputs">
              <div className="console-kicker"><Gauge size={17} /> Your operating inputs</div>
              <label className="input-block">
                <span><b>01</b> Missed calls on an average day</span>
                <div className="range-control">
                  <input
                    type="range"
                    min="0"
                    max="50"
                    value={missedCalls}
                    onChange={(event) => { setMissedCalls(Number(event.target.value)); trackEvent("missed_calls_changed"); }}
                    aria-label="Missed calls on an average day"
                  />
                  <output>{missedCalls}<small>/ day</small></output>
                </div>
              </label>
              <label className="input-block">
                <span><b>02</b> Average sold roofing job</span>
                <div className="currency-input">
                  <i>$</i>
                  <input
                    inputMode="numeric"
                    value={number(jobValue)}
                    onChange={(event) => handleNumeric(event.target.value, setJobValue, 1000000, "average_ticket_changed")}
                    aria-label="Average sold roofing job value"
                  />
                </div>
                <div className="preset-row">
                  {[7500, 9500, 12000, 15000, 20000].map((value) => <button type="button" key={value} className={jobValue === value ? "selected" : ""} onClick={() => { setJobValue(value); trackEvent("average_ticket_changed"); }}>{currency(value)}</button>)}
                </div>
              </label>
              <fieldset className="input-block close-selector">
                <legend><b>03</b> Appointments you typically close out of 10</legend>
                <div className="close-rate-options">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => <button type="button" key={value} className={closeOutOfTen === value ? "selected" : ""} onClick={() => { setCloseOutOfTen(value); trackEvent("close_rate_changed"); }}>{value}</button>)}
                </div>
                <small className="input-help">You selected <strong>{closeOutOfTen} / 10 = {closeOutOfTen * 10}%</strong></small>
              </fieldset>
              <label className="input-block">
                <span><b>04</b> Dormant leads / contacts in your database</span>
                <div className="currency-input neutral-input">
                  <Database size={18} />
                  <input
                    inputMode="numeric"
                    value={number(databaseSize)}
                    onChange={(event) => handleNumeric(event.target.value, setDatabaseSize, 100000, "database_size_entered")}
                    aria-label="Dormant leads or contacts in your database"
                  />
                </div>
                <small className="input-help">Include old leads, unsold estimates, no-shows, past inquiries, and other dormant opportunities where appropriate.</small>
              </label>
            </div>

            <div className="calculator-results" onMouseEnter={() => trackEvent("calculator_viewed")}>
              <div className="snapshot-header">
                <div><span className="eyebrow">Live Revenue Leak Snapshot™</span><h3>{company ? `${company}'s signal report` : "Your revenue signal report"}</h3></div>
                <span className="snapshot-chip">Illustrative only</span>
              </div>
              <div className="primary-result">
                <span>Potential opportunity represented each business day</span>
                <strong>{currency(calc.daily)}</strong>
                <p>{missedCalls} missed calls × {currency(jobValue)} × {closeOutOfTen * 10}% close rate</p>
              </div>
              <div className="result-grid">
                <Metric label="Weekly model" value={currency(calc.weekly)} />
                <Metric label="Monthly model" value={currency(calc.monthly)} />
                <Metric label="Annual model" value={currency(calc.annual)} accent />
              </div>
              <div className="signal-insight">
                <span className="insight-icon"><PhoneCall size={18} /></span>
                <p><b>{missedCalls} calls.</b> That is all we are talking about. People who called while your team was on a roof, with another homeowner, in traffic, or at home.</p>
              </div>
              <button type="button" onClick={() => setShowMath(!showMath)} className="math-toggle" aria-expanded={showMath}>
                How we calculated this <ChevronDown size={17} className={showMath ? "rotate" : ""} />
              </button>
              {showMath && (
                <div className="math-panel">
                  <p>{missedCalls} missed calls/day × {currency(jobValue)} average job × {closeOutOfTen * 10}% close rate = <b>{currency(calc.daily)}</b> illustrative daily opportunity.</p>
                  <p>{currency(calc.daily)} × 5 business days × 52 weeks = <b>{currency(calc.annual)}</b> illustrative annual opportunity.</p>
                </div>
              )}

              {/* ---- ROI SEQUENCE -- DO NOT REMOVE OR REORDER ---- */}
              <div style={{
                marginTop: '28px', paddingTop: '22px',
                borderTop: '1px solid rgba(175,211,241,0.14)',
              }}>

                <div style={{
                  fontFamily: '"Barlow Condensed",sans-serif',
                  fontSize: 'clamp(18px,2.5vw,24px)', fontWeight: 700,
                  textTransform: 'uppercase', color: '#fff',
                  lineHeight: 0.95, marginBottom: '16px',
                }}>
                  We do not need to recover all of that.<br />
                  <span style={{ color: '#00d4ff' }}>
                    We do not even need to come close.
                  </span>
                </div>

                {/* A -- 10% Scenario */}
                <div style={{
                  marginBottom: '10px', padding: '14px',
                  background: 'rgba(0,212,255,0.08)',
                  border: '1px solid rgba(0,212,255,0.22)',
                }}>
                  <span style={{
                    fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase',
                    color: '#7ee8fa', fontWeight: 700, display: 'block', marginBottom: '5px',
                  }}>A / Even 10% recovery scenario</span>
                  <strong style={{
                    fontFamily: '"Barlow Condensed",sans-serif',
                    fontSize: 'clamp(32px,4vw,44px)', color: '#00d4ff',
                    display: 'block', lineHeight: 0.9, marginBottom: '6px',
                  }}>
                    {currency(calc.tenPercent)}
                  </strong>
                  <small style={{ color: '#89a8bc', fontSize: '10px', lineHeight: 1.45 }}>
                    Illustrative annual gross revenue if 10% of the modeled
                    opportunity were ultimately recovered and sold. Not a guarantee.
                    Not every missed call is a qualified lead.
                  </small>
                </div>

                {/* B -- One Job Per Month */}
                <div style={{
                  padding: '14px', marginBottom: '10px',
                  background: 'rgba(0,212,255,0.04)',
                  border: '1px solid rgba(175,211,241,0.18)',
                }}>
                  <span style={{
                    fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase',
                    color: '#89a8bc', fontWeight: 700, display: 'block', marginBottom: '10px',
                  }}>
                    B / Forget the big number -- what if Summit helped you
                    recover just 1 extra sold job per month?
                  </span>
                  <div style={{
                    display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px',
                  }} className="roi-grid">
                    <div>
                      <span style={{
                        fontSize: '9px', color: '#7a97aa', display: 'block',
                        marginBottom: '3px', textTransform: 'uppercase',
                        letterSpacing: '0.07em',
                      }}>1 job / month</span>
                      <strong style={{
                        fontFamily: '"Barlow Condensed",sans-serif',
                        fontSize: 'clamp(20px,3vw,28px)', color: '#eaf8ff',
                      }}>
                        {currency(jobValue)}
                      </strong>
                    </div>
                    <div>
                      <span style={{
                        fontSize: '9px', color: '#7a97aa', display: 'block',
                        marginBottom: '3px', textTransform: 'uppercase',
                        letterSpacing: '0.07em',
                      }}>Annualized revenue</span>
                      <strong style={{
                        fontFamily: '"Barlow Condensed",sans-serif',
                        fontSize: 'clamp(20px,3vw,28px)', color: '#eaf8ff',
                      }}>
                        {currency(calc.oneJobAnnual)}
                      </strong>
                    </div>
                    <div>
                      <span style={{
                        fontSize: '9px', color: '#7a97aa', display: 'block',
                        marginBottom: '3px', textTransform: 'uppercase',
                        letterSpacing: '0.07em',
                      }}>Revenue-to-fee</span>
                      <strong style={{
                        fontFamily: '"Barlow Condensed",sans-serif',
                        fontSize: 'clamp(20px,3vw,28px)', color: '#68e6ff',
                      }}>
                        {calc.oneJobRatio.toFixed(1)}×
                      </strong>
                      <small style={{ fontSize: '9px', color: '#7a97aa', display: 'block' }}>
                        illustrative -- not ROI
                      </small>
                    </div>
                  </div>
                </div>

                {/* Payback View */}
                <div style={{
                  padding: '12px 14px', marginBottom: '10px',
                  background: 'rgba(5,16,28,0.8)',
                  border: '1px solid rgba(175,211,241,0.1)',
                }}>
                  <p style={{ margin: 0, fontSize: '12px', color: '#a9bfcc', lineHeight: 1.6 }}>
                    Using your numbers, approximately{' '}
                    <strong style={{ color: '#eaf8ff' }}>
                      {calc.jobsToFee.toFixed(1)} average-value sold jobs
                    </strong>
                    {' '}would equal your entire first-year Summit investment
                    on a gross-revenue basis. That is not{' '}
                    {Math.ceil(calc.jobsToFee)} per month.
                    That is {Math.ceil(calc.jobsToFee)} across the whole year.
                    Everything after that is additional gross revenue relative
                    to Summit's fees -- before considering your job costs.
                  </p>
                </div>

                {/* C -- One Job Every Two Months */}
                <div style={{
                  padding: '12px 14px', marginBottom: '10px',
                  background: 'rgba(255,168,100,0.04)',
                  border: '1px solid rgba(255,168,100,0.15)',
                }}>
                  <span style={{
                    fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase',
                    color: '#f0b37d', fontWeight: 700, display: 'block', marginBottom: '6px',
                  }}>
                    C / What if it only helped with 1 extra job every 2 months?
                  </span>
                  <div style={{
                    display: 'flex', alignItems: 'baseline', gap: '12px',
                    flexWrap: 'wrap', marginBottom: '6px',
                  }}>
                    <strong style={{
                      fontFamily: '"Barlow Condensed",sans-serif',
                      fontSize: 'clamp(24px,3.5vw,36px)', color: '#ffd1aa',
                    }}>
                      {currency(calc.everyTwoMonths)}
                    </strong>
                    <span style={{ fontSize: '10px', color: '#eba672' }}>6 jobs / year</span>
                    <span style={{ fontSize: '10px', color: '#9db1c0' }}>
                      {calc.everyTwoMonthsRatio.toFixed(1)}× revenue-to-fee
                      vs. first-year investment
                    </span>
                  </div>
                  <small style={{ fontSize: '10px', color: '#9db1c0', lineHeight: 1.5 }}>
                    Illustrative only. The system does not need to turn your company
                    upside down. It needs to help your existing sales machine
                    become slightly less wasteful.
                  </small>
                </div>

                {/* Database Teaser */}
                <div style={{
                  padding: '12px 14px', marginBottom: '10px',
                  background: 'rgba(0,212,255,0.03)',
                  border: '1px solid rgba(0,212,255,0.12)',
                }}>
                  <span style={{
                    fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase',
                    color: '#7ee8fa', fontWeight: 700, display: 'block', marginBottom: '6px',
                  }}>
                    And we have not even looked inside your CRM yet.
                  </span>
                  <p style={{ margin: '0 0 8px', fontSize: '11px', color: '#8ea7b8', lineHeight: 1.6 }}>
                    You told us you have{' '}
                    <strong style={{ color: '#dff8ff' }}>
                      {number(databaseSize)} old leads
                    </strong>
                    {' '}in your database. At a hypothetical 3% reactivation rate,
                    that is{' '}
                    <strong style={{ color: '#dff8ff' }}>
                      {number(calc.lowContacts)} reactivated conversations
                    </strong>.
                    At 16%, that is{' '}
                    <strong style={{ color: '#dff8ff' }}>
                      {number(calc.highContacts)}
                    </strong>.
                    Illustrative range:{' '}
                    <strong style={{ color: '#a5efff' }}>
                      {currency(calc.lowRevenue)} - {currency(calc.highRevenue)}
                    </strong>.
                  </p>
                  <strong style={{ color: '#dff8ff', fontSize: '12px', display: 'block' }}>
                    If nobody works the database, you have already decided the outcome.
                    Zero get recovered -- because there is no system.
                  </strong>
                </div>

                {/* The Real Question + CTA */}
                <div style={{
                  padding: '18px', marginBottom: '0',
                  background: 'linear-gradient(135deg,rgba(8,24,41,0.9),rgba(10,31,53,0.8))',
                  border: '1px solid rgba(175,211,241,0.22)',
                }}>
                  <div style={{
                    fontFamily: '"Barlow Condensed",sans-serif',
                    fontSize: 'clamp(16px,2.2vw,20px)', fontWeight: 700,
                    textTransform: 'uppercase', color: '#fff',
                    lineHeight: 1.05, marginBottom: '8px',
                  }}>
                    So here is the real question:
                  </div>
                  <div style={{
                    fontFamily: '"Barlow Condensed",sans-serif',
                    fontSize: 'clamp(14px,2vw,17px)', textTransform: 'uppercase',
                    color: '#00d4ff', lineHeight: 1.15, marginBottom: '13px',
                  }}>
                    Do you need more leads --<br />
                    or do you need to stop wasting<br />
                    the ones you already paid for?
                  </div>
                  <p style={{ margin: '0 0 15px', fontSize: '11px', color: '#9bb3c4', lineHeight: 1.6 }}>
                    You do not need to believe every number above. Cut it in half.
                    Cut it by 75%. Cut it by 90%. If there is still enough opportunity
                    left to matter, it is worth finding out where the leaks actually are.
                    That is exactly why we do not ask you to buy based on a calculator.
                    We ask you to let us look at the actual business.
                  </p>
                  <button type="button" className="cta-button"
                    style={{ width: '100%' }} onClick={scrollToBooking}>
                    <span>Book My Free Revenue Leak Audit</span>
                    <ArrowUpRight size={18} strokeWidth={2.6} aria-hidden="true" />
                  </button>
                  <p style={{ margin: '9px 0 0', fontSize: '10px', color: '#7a97aa', textAlign: 'center' }}>
                    Even if we never work together, you will know what
                    deserves your attention first.
                  </p>
                </div>

                {/* Legal Disclaimer */}
                <div style={{
                  marginTop: '14px', padding: '12px',
                  background: 'rgba(5,16,28,0.6)',
                  border: '1px solid rgba(175,211,241,0.08)',
                  display: 'flex', gap: '9px', alignItems: 'flex-start',
                }}>
                  <span style={{ color: '#71a9bf', fontSize: '13px', flexShrink: 0 }}>⚑</span>
                  <p style={{ margin: 0, fontSize: '10px', color: '#7f99aa', lineHeight: 1.55 }}>
                    These figures are hypothetical estimates based solely on
                    information entered by the user. They are not projections or
                    guarantees of revenue, appointments, leads, profit or sales.
                    Not every missed call is a qualified opportunity. Actual outcomes
                    depend on lead quality, sales process, market conditions, service
                    area, pricing, database age, customer intent, operational capacity
                    and other factors.
                  </p>
                </div>

              </div>
              {/* ---- END ROI SEQUENCE ---- */}
            </div>
          </div>

          <div className="calculator-disclaimer"><ShieldCheck size={18} /><p>These figures are hypothetical estimates based solely on information entered by the user. They are not projections or guarantees of revenue, appointments, leads, profit, or sales. Not every missed call is a qualified opportunity. Actual outcomes depend on lead quality, sales process, market conditions, service area, pricing, database age, customer intent, operational capacity, and other factors.</p></div>
        </div>
      </section>

      <section className="scenario-section section-pad">
        <div className="container scenario-heading"><SectionLabel>Make the number human</SectionLabel><h2>Voicemail is not free.<br /><em>You just do not get an invoice for what it costs.</em></h2></div>
        <div className="container scenario-stack">
          <FadeUp delay={0 * 0.1}>
          <article className="scenario-card scenario-ten" onMouseEnter={() => trackEvent("ten_percent_scenario_viewed")}>
            <div className="scenario-index">A / THE REALISTIC VIEW</div>
            <div><h3>We do not need to recover all of that. We do not even need to come close.</h3><p>We are not suggesting SummitVoiceAI will recover every missed opportunity. The point is that it does not have to.</p></div>
            <div className="scenario-number"><span>10% recovery scenario</span><strong>{currency(calc.tenPercent)}</strong><small>illustrative annual gross revenue if 10% of the modeled opportunity were ultimately recovered and sold</small></div>
          </article>
          </FadeUp>
          <FadeUp delay={1 * 0.1}>
          <article className="scenario-card scenario-one" onMouseEnter={() => trackEvent("one_job_month_scenario_viewed")}>
            <div className="scenario-index">B / THE SIMPLE VIEW</div>
            <div><h3>Forget the big number for a second. What if the system helped recover just one additional sold job each month?</h3><p>That is not a prediction. It is a deliberately simple way to frame the economic question.</p></div>
            <div className="one-job-metrics"><Metric label="One additional job / month" value={currency(jobValue)} /><Metric label="Annualized illustrative gross revenue" value={currency(calc.oneJobAnnual)} /><Metric label="Revenue-to-fee comparison" value={`${calc.oneJobRatio.toFixed(1)}×`} hint="Not ROI" accent /></div>
          </article>
          </FadeUp>
          <FadeUp delay={2 * 0.1}>
          <article className="scenario-card scenario-quiet">
            <div className="scenario-index">C / THE CONSERVATIVE VIEW</div>
            <div><h3>What if it only helped contribute to one extra sold job every two months?</h3><p>Six average-value jobs across an entire year—not six per month—would be an illustrative {calc.everyTwoMonthsRatio.toFixed(1)}× revenue-to-fee comparison.</p></div>
            <div className="quiet-number"><strong>{currency(calc.everyTwoMonths)}</strong><span>six jobs / year</span><small>vs. {currency(FIRST_YEAR_INVESTMENT)} first-year Summit investment</small></div>
          </article>
          </FadeUp>
        </div>
      </section>

      <section className="database-section section-pad">
        <div className="database-image" aria-hidden="true" />
        <div className="container database-grid">
          <div className="database-copy">
            <SectionLabel>04 / The database is not dead</SectionLabel>
            <h2>And we have not even looked <em>inside your CRM yet.</em></h2>
            <p>You told us you have <strong>{number(databaseSize)} old leads and contacts</strong> sitting in your system. They are not all opportunities, but they are not all worthless either.</p>
            <p className="data-quote">“If nobody works the database, you’ve already decided the outcome. Zero get recovered by your system — because there is no system.”</p>
          </div>
          <FadeUp delay={0.2}>
          <div className="database-panel" onMouseEnter={() => trackEvent("database_scenario_viewed")}>
            <div className="database-panel-top"><Database size={19} /><span>Illustrative reactivation scenarios</span></div>
            <div className="database-scenario"><div><span>LOW SCENARIO</span><strong>3%</strong><small>{number(calc.lowContacts)} reactivated conversations / opportunities</small></div><b>{currency(calc.lowRevenue)}</b></div>
            <div className="database-scenario high"><div><span>HIGH SCENARIO</span><strong>16%</strong><small>{number(calc.highContacts)} reactivated conversations / opportunities</small></div><b>{currency(calc.highRevenue)}</b></div>
            <p>These are scenarios—not predictions. Database age, lead source, messaging, market conditions, and sales execution all matter.</p>
          </div>
          </FadeUp>
        </div>
      </section>

      <section className="loop-section section-pad">
        <div className="container loop-header"><div><SectionLabel>05 / The mechanism</SectionLabel><h2>The Revenue Recovery <em>Loop™</em></h2></div><p>Infrastructure that keeps more opportunities in motion—without asking your busy team to remember every follow-up by hand.</p></div>
        <div className="container loop-wrap">
          <div className="loop-path" aria-hidden="true"><i /></div>
          {[
            ["01", "CAPTURE", "Every call, form, website conversation and opportunity enters the system.", PhoneCall],
            ["02", "RESPOND", "New prospects receive immediate communication before they call your competitor.", MessageSquareText],
            ["03", "FOLLOW UP", "Qualified prospects who don't respond stay in intelligent follow-up.", Clock3],
            ["04", "REACTIVATE", "Old leads, estimates, no-shows and past customers re-enter a conversation.", Zap],
            ["05", "BOOK", "Interested homeowners are routed toward a real appointment or sales conversation.", CalendarDays],
            ["06", "REVIEW", "Completed customers enter systematic review-request workflows.", Sparkles],
            ["07", "OPTIMIZE", "Performance is measured so the next bottleneck can be identified and fixed.", LineChart],
          ].map(([index, title, description, Icon], loopIdx) => {
            const LoopIcon = Icon as typeof PhoneCall;
            return (
              <FadeUp key={title as string} delay={loopIdx * 0.07}>
                <article className="loop-node"><span>{index as string}</span><div className="loop-icon"><LoopIcon size={21} /></div><h3>{title as string}</h3><p>{description as string}</p></article>
              </FadeUp>
            );
          })}
        </div>
      </section>

      <section className="systems-section section-pad">
        <div className="container systems-intro"><div><SectionLabel>06 / What we install</SectionLabel><h2>Not more tools.<br /><em>One operating system for your opportunity flow.</em></h2></div><p>Four connected systems designed to address the moments when roofing revenue tends to slip away.</p></div>
        <div className="container systems-grid">
          {[
            ["SYSTEM 01", "Stop new leakage", ["Revenue Leak Audit", "24/7 AI Receptionist", "Missed-Call Recovery", "Speed-to-Lead"]],
            ["SYSTEM 02", "Recover existing opportunity", ["Database Reactivation", "Estimate Rescue System™", "No-Show Recovery", "Dormant Lead Campaigns"]],
            ["SYSTEM 03", "Build persistent follow-up", ["SMS nurture", "Email nurture", "AI-assisted calling", "Appointment reminders", "CRM workflows"]],
            ["SYSTEM 04", "Create the flywheel", ["Review Growth Engine", "CRM/calendar infrastructure", "Performance monitoring", "Optimization roadmap"]],
          ].map(([index, title, points], sysIdx) => (
            <FadeUp key={index as string} delay={sysIdx * 0.08}>
              <details className="system-card"><summary><span>{index as string}</span><h3>{title as string}</h3><ChevronDown size={19} /></summary><ul>{(points as string[]).map((point) => <li key={point}><Check size={15} /> {point}</li>)}</ul></details>
            </FadeUp>
          ))}
        </div>
      </section>

      <section className="proof-section section-pad">
        <div className="container proof-layout">
          <div className="proof-visual"><img src="/images/roof-detail.png" alt="Roofing professional inspecting shingles" loading="lazy" /><div className="proof-signal"><span>Specific past campaign</span><strong>4,000</strong><small>existing leads</small></div></div>
          <FadeUp className="proof-copy" delay={0.12}><SectionLabel>07 / Roofing-specific proof</SectionLabel><h2>This is not a theory we invented for a sales page.</h2><p>In a specific past roofing campaign, re-engaging an existing lead database generated approximately <strong>294 appointments</strong> and approximately <strong>$200,000 in attributable reported results/revenue</strong>.</p><div className="proof-flow"><span>4,000 existing leads</span><ArrowDownRight size={22} /><span>~294 appointments</span><ArrowDownRight size={22} /><span>~$200k reported results</span></div><p className="fine-print">Results shown are from a specific past client campaign. Individual results vary based on lead quality, database size, market conditions, sales process, and numerous other factors.</p><div style={{
                marginTop: '27px', padding: '24px',
                background: 'rgba(0,212,255,0.06)',
                border: '1px solid rgba(0,212,255,0.3)',
              }}>
                <div style={{
                  fontSize: '9px', letterSpacing: '0.13em',
                  textTransform: 'uppercase', color: '#7ee8fa',
                  fontWeight: 700, marginBottom: '14px',
                }}>
                  🏆 Documented Client Result — Teo Roofing
                </div>
                <div style={{
                  fontFamily: '"Barlow Condensed",sans-serif',
                  fontSize: 'clamp(22px,4vw,32px)', fontWeight: 700,
                  color: '#00d4ff', lineHeight: 0.9, marginBottom: '12px',
                  textTransform: 'uppercase',
                }}>
                  582 appointments.<br />
                  <span style={{ color: '#fff' }}>$4,190,400+</span> recovered.
                </div>
                <p style={{ fontSize: '12px', color: '#9bbdce', margin: 0, lineHeight: 1.6 }}>
                  Teo Roofing ran the Summit Revenue Recovery System for 12 months.
                  Ava answered every call 24/7. At a 55% close rate on jobs
                  averaging $13,100 — that's over $4.1M in revenue that would
                  have gone to voicemail. Now replicated across 42+ companies.
                </p>
                <div style={{
                  marginTop: '14px', display: 'flex', gap: '12px',
                  flexWrap: 'wrap',
                }}>
                  {['582 Appointments', '$4.1M+ Recovered', '12 Months', '1 AI Receptionist'].map((x, i) => (
                    <div key={i} style={{
                      padding: '5px 12px',
                      background: 'rgba(0,212,255,0.1)',
                      border: '1px solid rgba(0,212,255,0.25)',
                      fontSize: '10px', fontWeight: 700, color: '#7ee8fa',
                      letterSpacing: '0.08em',
                    }}>
                      {x}
                    </div>
                  ))}
                </div>
              </div></FadeUp>
        </div>
      </section>

      <section className="timeline-section section-pad">
        <div className="container timeline-head"><div><SectionLabel>08 / What happens next</SectionLabel><h2>Built in 30 days.<br /><em>Measured from day one.</em></h2></div><p>The implementation plan reduces time-to-value without pretending every part of your operation changes overnight.</p></div>
        <div className="container timeline-track">
          {[
            ["Days 1–3", "Find the money", "Revenue Leak Audit and prioritization blueprint."],
            ["Days 4–10", "Stop new leakage", "Receptionist, missed-call recovery, speed-to-lead."],
            ["Days 8–14", "Attack the database", "Initial Reactivation Sprint and campaign setup."],
            ["Days 15–21", "Install persistence", "Nurture, estimate rescue, and reminders."],
            ["Days 22–30", "Create the flywheel", "Review system, reporting, and optimization roadmap."],
          ].map(([day, title, copy], index) => <article className="timeline-step" key={day as string}><span>{day as string}</span><i>{String(index + 1).padStart(2, "0")}</i><h3>{title as string}</h3><p>{copy as string}</p></article>)}
        </div>
      </section>

      <section className="pricing-section section-pad">
        <div className="container pricing-head"><SectionLabel>09 / The deployment decision</SectionLabel><h2>This does not need to find 100 extra jobs to matter.</h2><p>Compare the investment to the value of opportunities you already paid to create—not to another software subscription.</p><div className="pricing-deployment-line"><span>INFRASTRUCTURE DEPLOYMENT</span><i /><span>ONGOING RECOVERY OVERSIGHT</span></div></div>
        <div className="container pricing-grid">
          <article className="pricing-card"><span>SummitVoice AI Capture™</span><h3>Keep the front door covered.</h3><strong>{currency(697)}<small>/ month</small></strong><p>{currency(1500)} implementation</p><ul><li>AI reception coverage</li><li>Missed-call recovery</li><li>Speed-to-lead workflow</li></ul><PrimaryCta className="cta-card">Book an audit</PrimaryCta></article>
          <article className="pricing-card featured"><div className="popular-tag">Most popular</div><span>Summit Revenue Recovery System™</span><h3>The complete opportunity-recovery system.</h3><strong>{currency(MONTHLY_FEE)}<small>/ month</small></strong><p>{currency(IMPLEMENTATION_FEE)} implementation</p><ul><li>Everything in AI Capture</li><li>Database reactivation</li><li>Estimate rescue + nurture</li><li>Review engine + optimization</li></ul><PrimaryCta className="cta-card">Book my revenue leak audit</PrimaryCta></article>
          <article className="pricing-card"><span>Summit AI Growth Engine™</span><h3>For advanced or multi-location operators.</h3><strong>{currency(2497)}<small>/ month</small></strong><p>{currency(5000)} implementation</p><ul><li>Advanced routing logic</li><li>High-volume workflows</li><li>Multi-location visibility</li></ul><PrimaryCta className="cta-card">Book an audit</PrimaryCta></article>
        </div>
      </section>

      <section className="guarantee-section">
        <div className="container guarantee-wrap"><ShieldCheck size={40} /><div><SectionLabel>Implementation guarantee</SectionLabel><h2>We guarantee the implementation—not your sales team.</h2><p>If you complete onboarding, provide required access, and meet agreed prerequisites, and Summit has not deployed the agreed Revenue Recovery infrastructure within 30 days, Summit continues implementation at no management fee until the agreed system is live. If after the first 60 days Summit cannot point to measurable recovered conversations, appointments, opportunities or documented improvements in response and follow-up performance, Summit will personally review the account and build an additional recovery campaign at Summit's cost.</p><small>Terms and prerequisites apply. This is a deployment guarantee, not a guarantee of leads, appointments, sales or revenue.</small></div></div>
      </section>

      <section className="faq-section section-pad">
        <div className="container faq-grid"><div><SectionLabel>10 / Questions, answered</SectionLabel><h2>Reasonable questions from serious operators.</h2><p>Direct answers, because you should know what this is before you decide whether an audit makes sense.</p></div><div className="faq-list">
          {[
            ["Will Ava sound robotic to my roofing customers?", "No. Ava uses the same voice AI trusted by Fortune 500 companies. Most callers never realize they're talking to AI — they experience a fast, professional, helpful conversation. You can hear Ava live on this page right now."],
            ["What happens when a customer calls after hours or during a storm?", "Ava answers in under 1 second, 24/7/365 — including Sunday nights, holidays, and peak storm season when your phones won't stop ringing. Every call answered. Every lead captured. Every appointment booked automatically."],
            ["How does Ava sync with ServiceTitan or my existing CRM?", "Ava integrates with ServiceTitan, Jobber, HubSpot, GoHighLevel, and 5,000+ other tools via Zapier and Make. Every call note, lead, and booked appointment syncs automatically. Zero manual data entry."],
            ["How long does setup take for my roofing company?", "Most clients are live within 48–72 hours. We handle everything — voice training, CRM integration, call routing, and scheduling rules. You don't touch a line of code."],
            ["What's the ROI compared to hiring a receptionist?", "A full-time receptionist costs $45,000–$65,000/year and still misses after-hours calls. Ava costs as little as $16/day, answers 100% of calls, and pays for itself the moment it books the first job your receptionist would have missed. Teo Roofing recovered $4.1M+ in year one."],
            ["I'm not a roofing company — can Ava still work for my business?", "Absolutely. We serve home service businesses, healthcare clinics, real estate teams, pool companies, landscapers, and more. If you have inbound calls and leads you're losing, Ava solves that — regardless of your industry."],
          ].map(([question, answer]) => <details key={question as string}><summary>{question as string}<ChevronDown size={18} /></summary><p>{answer as string}</p></details>)}
        </div></div>
      </section>

      <section id="book-audit" className="booking-section section-pad">
        <div className="booking-image" aria-hidden="true" />
        <div className="container booking-grid">
          <div className="booking-copy"><SectionLabel>11 / The audit</SectionLabel><h2>Before you buy another lead, <em>find out what's happening to the ones you already have.</em></h2><p>We will review call handling, lead response, estimates, CRM, and follow-up to identify the highest-priority revenue leaks we can find.</p><div className="booking-reassurance"><Check size={17} /> Even if we never work together, you will know what deserves attention first.</div></div>
          <FadeUp className="booking-form-wrap" delay={0.15}>
            <div className="booking-card-head"><span>Audit intake / revenue recovery</span><b>~ 20 minutes</b></div>
            {bookingSubmitted ? <div className="booking-success"><Check size={34} /><h3>Your audit handoff is ready.</h3><p>Connect your calendar URL in <code>VITE_CALENDAR_URL</code> to send visitors directly into your booking flow. The calculation context is ready to pass into that handoff.</p></div> : <form onSubmit={(event) => { event.preventDefault(); openCalendar(); }}>
              <label>First name<input required name="firstName" placeholder="Your first name" autoComplete="given-name" /></label>
              <label>Roofing company<input value={company} onChange={(event) => setCompany(event.target.value)} required name="company" placeholder="Company name" autoComplete="organization" /></label>
              <label>Work email<input required name="email" type="email" placeholder="you@company.com" autoComplete="email" /></label>
              <button type="submit" className="cta-button form-cta"><span>{CALENDAR_URL ? "Choose my audit time" : "Continue to booking setup"}</span><ArrowUpRight size={18} /></button>
              <small>Booking context saved: {missedCalls} missed calls/day · {currency(jobValue)} job value · {closeOutOfTen * 10}% close rate · {number(databaseSize)} contacts</small>
            </form>}
          </FadeUp>
        </div>
      </section>

      <section className="email-report-section"><div className="container email-report"><div><SectionLabel>Not ready to book?</SectionLabel><h2>Email me my <em>Revenue Leak Report.</em></h2><p>Get a concise summary of the scenarios you just explored. Results stay visible either way.</p></div>{emailSubmitted ? <div className="email-success"><Check size={21} /> Your report handoff is ready for a future CRM or webhook connection.</div> : <form onSubmit={(event) => { event.preventDefault(); setEmailSubmitted(true); trackEvent("email_report_clicked"); }}><input required placeholder="Work email" type="email" aria-label="Work email" /><button type="submit">Email my report <ArrowUpRight size={17} /></button></form>}</div></section>

      <footer className="site-footer"><div className="container footer-inner"><Logo /><p>Revenue recovery infrastructure for roofing companies.</p><span>© {new Date().getFullYear()} SummitVoiceAI</span></div></footer>

      <div className="mobile-sticky"><span>Find your revenue leaks</span><button type="button" onClick={scrollToBooking}>Book audit <ArrowUpRight size={16} /></button></div>
    </main>
  );
}
