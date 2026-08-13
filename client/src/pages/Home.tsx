/**
 * Signal & Steel page direction: a dark industrial revenue-operations experience.
 * The visual system uses a cyan opportunity signal, precise data hierarchy, and grounded roofing imagery.
 */
import { useMemo, useState } from "react";
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

const CALENDAR_URL = import.meta.env.VITE_CALENDAR_URL || "";
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
        src="/manus-storage/summitvoiceai-logo-mark_efe1147e.png"
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
          <div className="hero-copy reveal-up">
            <SectionLabel>For roofing companies investing in lead flow</SectionLabel>
            <h1>
              Your next roofing job may already be <em>sitting in your CRM.</em>
            </h1>
            <p className="hero-lead">
              SummitVoiceAI installs the revenue-recovery infrastructure that helps established roofing companies answer, follow up, reactivate, and book the opportunities they already paid to create.
            </p>
            <div className="hero-actions">
              <PrimaryCta />
              <p className="microcopy"><Check size={15} /> No obligation. No CRM replacement. No lead package required.</p>
            </div>
          </div>
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
        </div>
        <div className="hero-footnote container">
          <span>01 / THE PROBLEM</span>
          <p>Before you buy another lead, make sure you are not wasting the ones you already have.</p>
        </div>
      </section>

      <section className="leak-section section-pad">
        <div className="container two-column-intro">
          <div>
            <SectionLabel>The leakage problem</SectionLabel>
            <h2>You may not have a lead problem. You may have a <em>revenue leakage problem.</em></h2>
          </div>
          <div className="intro-side">
            <p>Every lead source can become a leak when the response depends on someone being free, remembering, or having enough time.</p>
            <p>Buying more leads simply pours more water into a system that may already be leaking.</p>
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
          <aside className="leak-aside">
            <span className="aside-number">02</span>
            <h3>Lead generation is only half the system.</h3>
            <p>The other half is what happens in the minutes, days, and weeks after someone reaches out.</p>
            <PrimaryCta className="cta-compact">Find my revenue leaks</PrimaryCta>
          </aside>
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
            </div>
          </div>

          <div className="calculator-disclaimer"><ShieldCheck size={18} /><p>These figures are hypothetical estimates based solely on information entered by the user. They are not projections or guarantees of revenue, appointments, leads, profit, or sales. Not every missed call is a qualified opportunity. Actual outcomes depend on lead quality, sales process, market conditions, service area, pricing, database age, customer intent, operational capacity, and other factors.</p></div>
        </div>
      </section>

      <section className="scenario-section section-pad">
        <div className="container scenario-heading"><SectionLabel>Make the number human</SectionLabel><h2>Voicemail is not free.<br /><em>You just do not get an invoice for what it costs.</em></h2></div>
        <div className="container scenario-stack">
          <article className="scenario-card scenario-ten" onMouseEnter={() => trackEvent("ten_percent_scenario_viewed")}>
            <div className="scenario-index">A / THE REALISTIC VIEW</div>
            <div><h3>We do not need to recover all of that. We do not even need to come close.</h3><p>We are not suggesting SummitVoiceAI will recover every missed opportunity. The point is that it does not have to.</p></div>
            <div className="scenario-number"><span>10% recovery scenario</span><strong>{currency(calc.tenPercent)}</strong><small>illustrative annual gross revenue if 10% of the modeled opportunity were ultimately recovered and sold</small></div>
          </article>
          <article className="scenario-card scenario-one" onMouseEnter={() => trackEvent("one_job_month_scenario_viewed")}>
            <div className="scenario-index">B / THE SIMPLE VIEW</div>
            <div><h3>Forget the big number for a second. What if the system helped recover just one additional sold job each month?</h3><p>That is not a prediction. It is a deliberately simple way to frame the economic question.</p></div>
            <div className="one-job-metrics"><Metric label="One additional job / month" value={currency(jobValue)} /><Metric label="Annualized illustrative gross revenue" value={currency(calc.oneJobAnnual)} /><Metric label="Revenue-to-fee comparison" value={`${calc.oneJobRatio.toFixed(1)}×`} hint="Not ROI" accent /></div>
          </article>
          <article className="scenario-card scenario-quiet">
            <div className="scenario-index">C / THE CONSERVATIVE VIEW</div>
            <div><h3>What if it only helped contribute to one extra sold job every two months?</h3><p>Six average-value jobs across an entire year—not six per month—would be an illustrative {calc.everyTwoMonthsRatio.toFixed(1)}× revenue-to-fee comparison.</p></div>
            <div className="quiet-number"><strong>{currency(calc.everyTwoMonths)}</strong><span>six jobs / year</span><small>vs. {currency(FIRST_YEAR_INVESTMENT)} first-year Summit investment</small></div>
          </article>
        </div>
      </section>

      <section className="database-section section-pad">
        <div className="database-image" aria-hidden="true" />
        <div className="container database-grid">
          <div className="database-copy">
            <SectionLabel>04 / The database is not dead</SectionLabel>
            <h2>And we have not even looked <em>inside your CRM yet.</em></h2>
            <p>You told us you have <strong>{number(databaseSize)} old leads and contacts</strong> sitting in your system. They are not all opportunities, but they are not all worthless either.</p>
            <p className="data-quote">“If nobody works the database, you have already decided the outcome. Zero get recovered by your system.”</p>
          </div>
          <div className="database-panel" onMouseEnter={() => trackEvent("database_scenario_viewed")}>
            <div className="database-panel-top"><Database size={19} /><span>Illustrative reactivation scenarios</span></div>
            <div className="database-scenario"><div><span>LOW SCENARIO</span><strong>3%</strong><small>{number(calc.lowContacts)} reactivated conversations / opportunities</small></div><b>{currency(calc.lowRevenue)}</b></div>
            <div className="database-scenario high"><div><span>HIGH SCENARIO</span><strong>16%</strong><small>{number(calc.highContacts)} reactivated conversations / opportunities</small></div><b>{currency(calc.highRevenue)}</b></div>
            <p>These are scenarios—not predictions. Database age, lead source, messaging, market conditions, and sales execution all matter.</p>
          </div>
        </div>
      </section>

      <section className="loop-section section-pad">
        <div className="container loop-header"><div><SectionLabel>05 / The mechanism</SectionLabel><h2>The Revenue Recovery <em>Loop™</em></h2></div><p>Infrastructure that keeps more opportunities in motion—without asking your busy team to remember every follow-up by hand.</p></div>
        <div className="container loop-wrap">
          <div className="loop-path" aria-hidden="true"><i /></div>
          {[
            ["01", "CAPTURE", "Every call, form, and opportunity enters the system.", PhoneCall],
            ["02", "RESPOND", "New prospects receive an immediate signal back.", MessageSquareText],
            ["03", "FOLLOW UP", "Qualified prospects get persistent, intelligent follow-up.", Clock3],
            ["04", "REACTIVATE", "Old leads, estimates, and no-shows re-enter a conversation.", Zap],
            ["05", "BOOK", "Interested homeowners move toward a real appointment.", CalendarDays],
            ["06", "REVIEW", "Completed customers enter review-request workflows.", Sparkles],
            ["07", "OPTIMIZE", "Performance reveals the next bottleneck to fix.", LineChart],
          ].map(([index, title, description, Icon]) => {
            const LoopIcon = Icon as typeof PhoneCall;
            return <article className="loop-node" key={title as string}><span>{index as string}</span><div className="loop-icon"><LoopIcon size={21} /></div><h3>{title as string}</h3><p>{description as string}</p></article>;
          })}
        </div>
      </section>

      <section className="systems-section section-pad">
        <div className="container systems-intro"><div><SectionLabel>06 / What we install</SectionLabel><h2>Not more tools.<br /><em>One operating system for your opportunity flow.</em></h2></div><p>Four connected systems designed to address the moments when roofing revenue tends to slip away.</p></div>
        <div className="container systems-grid">
          {[
            ["SYSTEM 01", "Stop new leakage", ["Revenue Leak Audit", "24/7 AI Receptionist", "Missed-Call Recovery", "Speed-to-Lead"]],
            ["SYSTEM 02", "Recover existing opportunity", ["Database Reactivation", "Estimate Rescue", "No-Show Recovery", "Dormant Lead Campaigns"]],
            ["SYSTEM 03", "Build persistent follow-up", ["SMS nurture", "Email nurture", "AI-assisted calling", "Appointment reminders"]],
            ["SYSTEM 04", "Create the flywheel", ["Review Engine", "CRM / calendar infrastructure", "Performance monitoring", "Optimization roadmap"]],
          ].map(([index, title, points]) => <details className="system-card" key={index as string}><summary><span>{index as string}</span><h3>{title as string}</h3><ChevronDown size={19} /></summary><ul>{(points as string[]).map((point) => <li key={point}><Check size={15} /> {point}</li>)}</ul></details>)}
        </div>
      </section>

      <section className="proof-section section-pad">
        <div className="container proof-layout">
          <div className="proof-visual"><img src="/manus-storage/summitvoiceai-roof-detail_1f7b2e1f.png" alt="Roofing professional inspecting shingles" loading="lazy" /><div className="proof-signal"><span>Specific past campaign</span><strong>4,000</strong><small>existing leads</small></div></div>
          <div className="proof-copy"><SectionLabel>07 / Roofing-specific proof</SectionLabel><h2>This is not a theory we invented for a sales page.</h2><p>In a specific past roofing campaign, re-engaging an existing lead database generated approximately <strong>294 appointments</strong> and approximately <strong>$200,000 in attributable reported results/revenue</strong>.</p><div className="proof-flow"><span>4,000 existing leads</span><ArrowDownRight size={22} /><span>~294 appointments</span><ArrowDownRight size={22} /><span>~$200k reported results</span></div><p className="fine-print">Results shown are from a specific past client campaign. Individual results vary based on lead quality, database size, market conditions, sales process, and numerous other factors.</p><div className="asset-placeholder"><span>Approved proof goes here</span><p>Reserved component for a verified case-study screenshot, client logo, video, or testimonial.</p></div></div>
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
          <article className="pricing-card"><span>AI Capture</span><h3>Keep the front door covered.</h3><strong>{currency(697)}<small>/ month</small></strong><p>{currency(1500)} implementation</p><ul><li>AI reception coverage</li><li>Missed-call recovery</li><li>Speed-to-lead workflow</li></ul><PrimaryCta className="cta-card">Book an audit</PrimaryCta></article>
          <article className="pricing-card featured"><div className="popular-tag">Most popular</div><span>Summit Revenue Recovery System™</span><h3>The complete opportunity-recovery system.</h3><strong>{currency(MONTHLY_FEE)}<small>/ month</small></strong><p>{currency(IMPLEMENTATION_FEE)} implementation</p><ul><li>Everything in AI Capture</li><li>Database reactivation</li><li>Estimate rescue + nurture</li><li>Review engine + optimization</li></ul><PrimaryCta className="cta-card">Book my revenue leak audit</PrimaryCta></article>
          <article className="pricing-card"><span>AI Growth Engine</span><h3>For advanced or multi-location operators.</h3><strong>{currency(2497)}<small>/ month</small></strong><p>{currency(5000)} implementation</p><ul><li>Advanced routing logic</li><li>High-volume workflows</li><li>Multi-location visibility</li></ul><PrimaryCta className="cta-card">Book an audit</PrimaryCta></article>
        </div>
      </section>

      <section className="guarantee-section">
        <div className="container guarantee-wrap"><ShieldCheck size={40} /><div><SectionLabel>Implementation guarantee</SectionLabel><h2>We guarantee the implementation—not your sales team.</h2><p>If you complete onboarding, provide the agreed access, and meet required prerequisites, Summit continues implementation at no management fee until the agreed Revenue Recovery infrastructure is live.</p><small>Terms and prerequisites apply. This is a deployment guarantee, not a guarantee of leads, appointments, sales, or revenue.</small></div></div>
      </section>

      <section className="faq-section section-pad">
        <div className="container faq-grid"><div><SectionLabel>10 / Questions, answered</SectionLabel><h2>Reasonable questions from serious operators.</h2><p>Direct answers, because you should know what this is before you decide whether an audit makes sense.</p></div><div className="faq-list">
          {[
            ["Do we need to replace our CRM?", "No. The goal is to make the opportunities inside your current system get worked more consistently."],
            ["Will AI replace my office staff?", "No. The goal is to automate repetitive communication and free people for higher-value conversations and escalation."],
            ["We already use an answering service. Why would this be different?", "Answering the phone is only the first moment. Revenue Recovery is designed to extend into response, follow-up, reactivation, booking, and review workflows."],
            ["Do you guarantee jobs?", "No. We do not promise jobs, sales, or revenue. The calculator uses illustrative scenarios and the audit assesses the actual business."],
            ["Who is this not for?", "It is generally not designed for brand-new contractors without meaningful lead flow, sales activity, or a database of opportunities to work."],
          ].map(([question, answer]) => <details key={question as string}><summary>{question as string}<ChevronDown size={18} /></summary><p>{answer as string}</p></details>)}
        </div></div>
      </section>

      <section id="book-audit" className="booking-section section-pad">
        <div className="booking-image" aria-hidden="true" />
        <div className="container booking-grid">
          <div className="booking-copy"><SectionLabel>11 / The audit</SectionLabel><h2>Before you buy another lead, <em>find out what is happening to the ones you already have.</em></h2><p>We will review call handling, lead response, estimates, CRM, and follow-up to identify the highest-priority revenue leaks we can find.</p><div className="booking-reassurance"><Check size={17} /> Even if we never work together, you will know what deserves attention first.</div></div>
          <div className="booking-form-wrap">
            <div className="booking-card-head"><span>Audit intake / revenue recovery</span><b>~ 20 minutes</b></div>
            {bookingSubmitted ? <div className="booking-success"><Check size={34} /><h3>Your audit handoff is ready.</h3><p>Connect your calendar URL in <code>VITE_CALENDAR_URL</code> to send visitors directly into your booking flow. The calculation context is ready to pass into that handoff.</p></div> : <form onSubmit={(event) => { event.preventDefault(); openCalendar(); }}>
              <label>First name<input required name="firstName" placeholder="Your first name" autoComplete="given-name" /></label>
              <label>Roofing company<input value={company} onChange={(event) => setCompany(event.target.value)} required name="company" placeholder="Company name" autoComplete="organization" /></label>
              <label>Work email<input required name="email" type="email" placeholder="you@company.com" autoComplete="email" /></label>
              <button type="submit" className="cta-button form-cta"><span>{CALENDAR_URL ? "Choose my audit time" : "Continue to booking setup"}</span><ArrowUpRight size={18} /></button>
              <small>Booking context saved: {missedCalls} missed calls/day · {currency(jobValue)} job value · {closeOutOfTen * 10}% close rate · {number(databaseSize)} contacts</small>
            </form>}
          </div>
        </div>
      </section>

      <section className="email-report-section"><div className="container email-report"><div><SectionLabel>Not ready to book?</SectionLabel><h2>Email me my <em>Revenue Leak Report.</em></h2><p>Get a concise summary of the scenarios you just explored. Results stay visible either way.</p></div>{emailSubmitted ? <div className="email-success"><Check size={21} /> Your report handoff is ready for a future CRM or webhook connection.</div> : <form onSubmit={(event) => { event.preventDefault(); setEmailSubmitted(true); trackEvent("email_report_clicked"); }}><input required placeholder="Work email" type="email" aria-label="Work email" /><button type="submit">Email my report <ArrowUpRight size={17} /></button></form>}</div></section>

      <footer className="site-footer"><div className="container footer-inner"><Logo /><p>Revenue recovery infrastructure for roofing companies.</p><span>© {new Date().getFullYear()} SummitVoiceAI</span></div></footer>

      <div className="mobile-sticky"><span>Find your revenue leaks</span><button type="button" onClick={scrollToBooking}>Book audit <ArrowUpRight size={16} /></button></div>
    </main>
  );
}
