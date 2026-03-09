import { useState } from "react";

const elements = [
  {
    id: "view",
    name: "The View",
    questions: [
      "When I finish a significant piece of work, I already know what I want to focus on next.",
      "Most of what I work on in a given month is defined by me, not handed to me.",
      "I could clearly explain why the problems I'm currently working on are the most important ones to be solving right now."
    ]
  },
  {
    id: "control_panel",
    name: "The Control Panel",
    questions: [
      "I have a specific, clear picture of where I'm heading professionally in the next two to three years — and I'm already acting on it.",
      "A meaningful part of my current work involves challenges that sit above what's formally expected of my role.",
      "I make deliberate decisions about my next level rather than waiting to see what opportunities appear."
    ]
  },
  {
    id: "motor",
    name: "The Motor",
    questions: [
      "My work regularly comes up in conversations at levels well above my immediate manager.",
      "When I solve a problem, I think about what it means for the wider business — not just my area.",
      "The impact of what I do is genuinely visible to people well beyond my immediate team."
    ]
  },
  {
    id: "cables",
    name: "The Cables",
    questions: [
      "When I need to move something forward outside my direct control, I rely on relationships and trust — not position or authority.",
      "I could name three or four people at senior levels who would proactively speak up for my work in a room I'm not in.",
      "I deliberately build relationships across the business — not just with the people I work with day to day."
    ]
  },
  {
    id: "floor",
    name: "The Floor",
    questions: [
      "When I spot a problem in my organisation, I typically take ownership of fixing it — not just flagging it.",
      "There are things running well in my area right now that I set in motion but no longer need to be directly involved in.",
      "I start more things off my own initiative than I'm asked to start."
    ]
  },
  {
    id: "doors",
    name: "The Doors",
    questions: [
      "I regularly and deliberately invest time in making sure the right people understand what I'm working on and why it matters.",
      "If my senior leadership were asked about my contribution today, they'd describe it accurately and compellingly.",
      "I treat communicating my impact as a core part of my job — not an overhead that gets in the way of real work."
    ]
  }
];

const patternMap = {
  view: { name: "The Mercenary", tagline: "Brilliant at delivery. Waiting for the next assignment." },
  control_panel: { name: "The Floor-Bound", tagline: "Operating well at this level. Not yet reaching above it." },
  motor: { name: "The Silo", tagline: "Solving the problem in front of them. Missing the wider system." },
  cables: { name: "The Org Chart", tagline: "Waiting for authority to act. Hasn't mastered influence." },
  floor: { name: "The Commentator", tagline: "Sees what's wrong. Raises it. Doesn't own the fix." },
  doors: { name: "The Head Down", tagline: "Exceptional output. Invisible to the people who matter." }
};

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: #132030;
    color: #e8e2d5;
    font-family: 'DM Sans', sans-serif;
  }

  .scan-wrap {
    min-height: 100vh;
    background: #132030;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .scan-header {
    width: 100%;
    padding: 28px 40px;
    border-bottom: 1px solid rgba(212,175,55,0.25);
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .scan-logo {
    font-family: 'Cormorant Garamond', serif;
    font-size: 15px;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #d4af37;
  }

  .scan-logo-sep {
    color: rgba(212,175,55,0.4);
    font-size: 12px;
  }

  .scan-product {
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 300;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: rgba(232,226,213,0.5);
  }

  /* INTRO */
  .intro-container {
    max-width: 640px;
    width: 100%;
    padding: 80px 40px;
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .intro-eyebrow {
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #d4af37;
    margin-bottom: 24px;
  }

  .intro-headline {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(38px, 5vw, 56px);
    font-weight: 400;
    line-height: 1.1;
    color: #e8e2d5;
    margin-bottom: 32px;
    letter-spacing: -0.01em;
  }

  .intro-headline em {
    font-style: italic;
    color: #d4af37;
  }

  .intro-body {
    font-size: 16px;
    font-weight: 300;
    line-height: 1.75;
    color: rgba(232,226,213,0.75);
    margin-bottom: 48px;
  }

  .intro-meta {
    display: flex;
    gap: 32px;
    margin-bottom: 48px;
    padding: 24px 0;
    border-top: 1px solid rgba(232,226,213,0.12);
    border-bottom: 1px solid rgba(232,226,213,0.12);
  }

  .meta-item {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .meta-value {
    font-family: 'Cormorant Garamond', serif;
    font-size: 28px;
    font-weight: 500;
    color: #d4af37;
  }

  .meta-label {
    font-size: 11px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(232,226,213,0.55);
  }

  .btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    background: #d4af37;
    color: #e8e2d5;
    border: none;
    padding: 16px 32px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.2s;
    align-self: flex-start;
  }

  .btn-primary:hover {
    background: #e8c94a;
    transform: translateY(-1px);
  }

  .btn-primary svg {
    transition: transform 0.2s;
  }

  .btn-primary:hover svg {
    transform: translateX(4px);
  }

  /* QUESTIONS */
  .q-container {
    max-width: 720px;
    width: 100%;
    padding: 60px 40px;
  }

  .progress-bar-wrap {
    margin-bottom: 60px;
  }

  .progress-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
  }

  .progress-label {
    font-size: 11px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: rgba(232,226,213,0.6);
  }

  .progress-count {
    font-size: 13px;
    color: #d4af37;
  }

  .progress-track {
    height: 2px;
    background: rgba(232,226,213,0.12);
    position: relative;
  }

  .progress-fill {
    height: 100%;
    background: #d4af37;
    transition: width 0.4s ease;
  }

  .element-block {
    margin-bottom: 64px;
    padding-bottom: 64px;
    border-bottom: 1px solid rgba(232,226,213,0.1);
  }

  .element-block:last-child {
    border-bottom: none;
  }

  .element-label {
    font-size: 10px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #d4af37;
    margin-bottom: 8px;
  }

  .element-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 26px;
    font-weight: 500;
    color: #e8e2d5;
    margin-bottom: 36px;
  }

  .question-item {
    margin-bottom: 36px;
  }

  .question-item:last-child {
    margin-bottom: 0;
  }

  .question-text {
    font-size: 15px;
    font-weight: 400;
    line-height: 1.65;
    color: rgba(232,226,213,0.9);
    margin-bottom: 16px;
  }

  .scale-row {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  .scale-btn {
    width: 40px;
    height: 40px;
    border: 1px solid rgba(232,226,213,0.25);
    background: transparent;
    color: rgba(232,226,213,0.65);
    font-size: 13px;
    cursor: pointer;
    transition: all 0.15s;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'DM Sans', sans-serif;
  }

  .scale-btn:hover {
    border-color: rgba(212,175,55,0.6);
    color: #d4af37;
  }

  .scale-btn.selected {
    background: #d4af37;
    border-color: #d4af37;
    color: #e8e2d5;
    font-weight: 500;
  }

  .scale-ends {
    display: flex;
    justify-content: space-between;
    margin-top: 8px;
    padding: 0 2px;
  }

  .scale-end-label {
    font-size: 10px;
    letter-spacing: 0.1em;
    color: rgba(232,226,213,0.5);
    text-transform: uppercase;
  }

  .submit-section {
    padding-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }

  .error-msg {
    font-size: 13px;
    color: #c0392b;
  }

  .btn-disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  /* GENERATING */
  .generating-container {
    max-width: 480px;
    width: 100%;
    padding: 120px 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 24px;
  }

  .gen-icon {
    width: 56px;
    height: 56px;
    border: 1px solid rgba(212,175,55,0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 8px;
    animation: pulse 2s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; border-color: rgba(212,175,55,0.4); }
    50% { opacity: 0.6; border-color: rgba(212,175,55,0.7); }
  }

  .gen-headline {
    font-family: 'Cormorant Garamond', serif;
    font-size: 28px;
    font-weight: 400;
    color: #e8e2d5;
  }

  .gen-body {
    font-size: 14px;
    font-weight: 300;
    color: rgba(232,226,213,0.6);
    line-height: 1.6;
  }

  /* RESULTS */
  .results-container {
    max-width: 680px;
    width: 100%;
    padding: 60px 40px;
  }

  .result-eyebrow {
    font-size: 11px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #d4af37;
    margin-bottom: 12px;
  }

  .result-divider {
    height: 1px;
    background: rgba(212,175,55,0.3);
    margin-bottom: 40px;
  }

  .result-text {
    font-size: 16px;
    font-weight: 300;
    line-height: 1.85;
    color: rgba(232,226,213,0.9);
    white-space: pre-wrap;
    margin-bottom: 56px;
  }

  .result-surface {
    padding: 28px;
    border: 1px solid rgba(232,226,213,0.12);
    background: rgba(232,226,213,0.02);
    margin-bottom: 56px;
  }

  .surface-label {
    font-size: 11px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(232,226,213,0.5);
    margin-bottom: 12px;
  }

  .surface-text {
    font-size: 14px;
    font-weight: 300;
    line-height: 1.75;
    color: rgba(232,226,213,0.75);
    margin-bottom: 20px;
  }

  .coaching-question {
    font-family: 'Cormorant Garamond', serif;
    font-size: 20px;
    font-weight: 400;
    font-style: italic;
    color: rgba(232,226,213,0.85);
    line-height: 1.6;
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid rgba(232,226,213,0.1);
  }

  .result-cta {
    padding: 32px;
    border: 1px solid rgba(212,175,55,0.3);
    background: rgba(212,175,55,0.04);
    margin-bottom: 16px;
  }

  .cta-label {
    font-size: 11px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #d4af37;
    margin-bottom: 12px;
  }

  .cta-text {
    font-size: 15px;
    font-weight: 300;
    color: rgba(232,226,213,0.75);
    line-height: 1.6;
    margin-bottom: 24px;
  }

  .cta-links {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
  }

  .cta-link-primary {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: #d4af37;
    color: #e8e2d5;
    text-decoration: none;
    padding: 12px 24px;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    cursor: pointer;
    border: none;
    font-family: 'DM Sans', sans-serif;
    transition: background 0.2s;
  }

  .cta-link-primary:hover { background: #e8c94a; }

  .cta-link-secondary {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: transparent;
    color: rgba(232,226,213,0.7);
    text-decoration: none;
    padding: 12px 24px;
    font-size: 13px;
    font-weight: 400;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    cursor: pointer;
    border: 1px solid rgba(232,226,213,0.2);
    font-family: 'DM Sans', sans-serif;
    transition: all 0.2s;
  }

  .cta-link-secondary:hover {
    border-color: rgba(212,175,55,0.5);
    color: #d4af37;
  }

  .result-newsletter {
    padding: 28px;
    border: 1px solid rgba(232,226,213,0.1);
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .newsletter-label {
    font-size: 11px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(232,226,213,0.5);
  }

  .newsletter-text {
    font-size: 14px;
    font-weight: 300;
    line-height: 1.65;
    color: rgba(232,226,213,0.75);
  }

  .newsletter-text strong {
    color: #e8e2d5;
    font-weight: 500;
  }

  .newsletter-link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: #d4af37;
    text-decoration: none;
    font-size: 13px;
    font-weight: 400;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    transition: gap 0.2s;
    align-self: flex-start;
  }

  .newsletter-link:hover { gap: 12px; }
`;

function IntroScreen({ onStart }) {
  return (
    <div className="scan-wrap">
      <style>{styles}</style>
      <header className="scan-header">
        <span className="scan-logo">The Glass Elevator</span>
        <span className="scan-logo-sep">·</span>
        <span className="scan-product">The Scan</span>
      </header>
      <div className="intro-container">
        <p className="intro-eyebrow">Free Diagnostic</p>
        <h1 className="intro-headline">
          Find out what's <em>actually</em> holding you back.
        </h1>
        <p className="intro-body">
          Most senior leaders are working hard. The question isn't effort. It's whether the effort is going to the right places. The Scan identifies where your career is losing traction — and gives you a direct read on what to do about it.
        </p>
        <div className="intro-meta">
          <div className="meta-item">
            <span className="meta-value">18</span>
            <span className="meta-label">Questions</span>
          </div>
          <div className="meta-item">
            <span className="meta-value">3–5</span>
            <span className="meta-label">Minutes</span>
          </div>
          <div className="meta-item">
            <span className="meta-value">0</span>
            <span className="meta-label">Email required</span>
          </div>
        </div>
        <button className="btn-primary" onClick={onStart}>
          Begin The Scan
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

function QuestionsScreen({ elements, answers, onAnswer, onSubmit, allAnswered, error }) {
  const totalQ = 18;
  const answered = Object.keys(answers).length;
  const pct = (answered / totalQ) * 100;

  return (
    <div className="scan-wrap">
      <style>{styles}</style>
      <header className="scan-header">
        <span className="scan-logo">The Glass Elevator</span>
        <span className="scan-logo-sep">·</span>
        <span className="scan-product">The Scan</span>
      </header>
      <div className="q-container">
        <div className="progress-bar-wrap">
          <div className="progress-info">
            <span className="progress-label">Your progress</span>
            <span className="progress-count">{answered} / {totalQ}</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${pct}%` }} />
          </div>
        </div>

        {elements.map((el, eIdx) => (
          <div key={el.id} className="element-block">
            <p className="element-label">Element {eIdx + 1} of 6</p>
            <h2 className="element-name">{el.name}</h2>
            {el.questions.map((q, qIdx) => {
              const key = `${el.id}_${qIdx}`;
              const val = answers[key];
              return (
                <div key={qIdx} className="question-item">
                  <p className="question-text">{q}</p>
                  <div className="scale-row">
                    {[1, 2, 3, 4, 5].map(n => (
                      <button
                        key={n}
                        className={`scale-btn${val === n ? " selected" : ""}`}
                        onClick={() => onAnswer(el.id, qIdx, n)}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                  <div className="scale-ends">
                    <span className="scale-end-label">Rarely</span>
                    <span className="scale-end-label">Consistently</span>
                  </div>
                </div>
              );
            })}
          </div>
        ))}

        <div className="submit-section">
          {error && <p className="error-msg">{error}</p>}
          <button
            className={`btn-primary${!allAnswered ? " btn-disabled" : ""}`}
            onClick={allAnswered ? onSubmit : undefined}
          >
            {allAnswered ? "Get my results" : `${totalQ - answered} questions remaining`}
            {allAnswered && (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function GeneratingScreen() {
  return (
    <div className="scan-wrap">
      <style>{styles}</style>
      <header className="scan-header">
        <span className="scan-logo">The Glass Elevator</span>
        <span className="scan-logo-sep">·</span>
        <span className="scan-product">The Scan</span>
      </header>
      <div className="generating-container">
        <div className="gen-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="1.5">
            <rect x="3" y="3" width="18" height="18" rx="1"/>
            <line x1="3" y1="9" x2="21" y2="9"/>
            <line x1="9" y1="9" x2="9" y2="21"/>
          </svg>
        </div>
        <h2 className="gen-headline">Reading what's there.</h2>
        <p className="gen-body">Your answers are being analysed. This takes a moment — the output you're about to see is built specifically around what you said.</p>
      </div>
    </div>
  );
}

function ResultsScreen({ result }) {
  return (
    <div className="scan-wrap">
      <style>{styles}</style>
      <header className="scan-header">
        <span className="scan-logo">The Glass Elevator</span>
        <span className="scan-logo-sep">·</span>
        <span className="scan-product">The Scan — Your Results</span>
      </header>
      <div className="results-container">
        <p className="result-eyebrow">The honest read</p>
        <div className="result-divider" />
        <p className="result-text">{result.text}</p>

        <div className="result-surface">
          <p className="surface-label">Areas worth exploring</p>
          <p className="surface-text">
            If any of this feels familiar, it probably is. Most people who complete The Scan recognise what comes up immediately — because it's been there a while. The question worth sitting with isn't whether this is true. It's what becomes possible when it shifts.
          </p>
          {result.coachingQuestion && (
            <p className="coaching-question">"{result.coachingQuestion}"</p>
          )}
        </div>

        <div className="result-cta">
          <p className="cta-label">Go deeper</p>
          <p className="cta-text">
            This is what ten minutes surfaces. The Lens is a proper diagnostic with two coaching sessions — it gets to the root of what's holding you back, confirms you're in the right organisation to make the climb worthwhile, and gives you a clear picture of exactly what changes first. If what you've just read resonates, it's worth an hour.
          </p>
          <div className="cta-links">
            <a className="cta-link-primary" href="https://calendly.com/paul-glasselevatorworks/30min" target="_blank" rel="noopener noreferrer">
              Book a call
            </a>
            <a className="cta-link-secondary" href="https://glasselevatorworks.com" target="_blank" rel="noopener noreferrer">
              Learn more →
            </a>
          </div>
        </div>

        <div className="result-newsletter">
          <p className="newsletter-label">Not ready to talk yet?</p>
          <p className="newsletter-text">
            <strong>Between Floors</strong> is a weekly read for senior leaders who want to think differently about where they're heading. No frameworks, no listicles — just the things worth thinking about.
          </p>
          <a className="newsletter-link" href="https://briefing.glasselevatorworks.com" target="_blank" rel="noopener noreferrer">
            Read Between Floors →
          </a>
        </div>

      </div>
    </div>
  );
}

export default function TheScan() {
  const [phase, setPhase] = useState("intro");
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleAnswer = (elementId, qIndex, value) => {
    setAnswers(prev => ({ ...prev, [`${elementId}_${qIndex}`]: value }));
  };

  const allAnswered = elements.every(el =>
    el.questions.every((_, i) => answers[`${el.id}_${i}`] !== undefined)
  );

  const invertedQIndex = 2;

  const getScore = (id) => {
    const el = elements.find(e => e.id === id);
    const vals = el.questions.map((_, i) => {
      const raw = answers[`${id}_${i}`];
      if (!raw) return null;
      return i === invertedQIndex ? (6 - raw) : raw;
    }).filter(Boolean);
    return vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : 0;
  };

  const generateResult = async () => {
    setPhase("generating");
    setError(null);

    const scores = elements.map(el => ({
      element: el.name,
      id: el.id,
      score: getScore(el.id),
      answers: el.questions.map((q, i) => ({ question: q, score: answers[`${el.id}_${i}`] }))
    }));

    const sorted = [...scores].sort((a, b) => a.score - b.score);
    const primary = sorted[0];
    const secondary = sorted.slice(1, 3).filter(s => s.score < 3.5);

    const prompt = `You are reading the diagnostic results for a senior leader — a Director, Senior Director, or VP — who has just completed The Scan, a leadership diagnostic from The Glass Elevator.

Their scores across six elements (1–5, where 5 = "Exactly like me"):

${scores.map(s => `${s.element}: ${s.score.toFixed(1)}
${s.answers.map(a => `  - "${a.question}" → ${a.score}/5`).join('\n')}`).join('\n\n')}

The six elements map to six ways leaders get stuck who are capable but stuck:
- The View → The Mercenary: executes brilliantly, but lets others define what to work on. Takes pride in delivery. Waits for the next assignment rather than creating their own agenda.
- The Control Panel → The Floor-Bound: capable and competent at their current level. Hasn't made a real decision about where they're going or started operating above their current floor.
- The Motor → The Silo: solves their piece of the puzzle well. Doesn't think about enterprise-level impact or what their work means beyond their immediate team.
- The Cables → The Org Chart: relies on formal authority to get things done. Hasn't built the influence or deliberate relationships that let leaders move things without being in charge.
- The Floor → The Commentator: can see exactly what's wrong. Raises it clearly. But ownership of fixing it stays with someone else.
- The Doors → The Head Down: produces high-quality work but treats communication and visibility as overhead. The right people don't know what they're doing or why it matters.

Primary: ${primary.element} → ${patternMap[primary.id].name} (score: ${primary.score.toFixed(1)}/5)
${secondary.length ? `Secondary signals worth noting: ${secondary.map(s => `${s.element} (${patternMap[s.id].name})`).join(', ')}` : ''}

Write the personalised output they will see on screen immediately after completing The Scan.

Rules:
- Plain English. No jargon. No coaching-speak. No corporate language.
- Sound like a senior executive coach who has seen this before and is giving a peer a straight read — direct but not unkind.
- STRUCTURE: Lead with the one shift — what becomes possible when this changes. Open with a picture of what that looks like: how they operate differently, what others start to see, what opens up. Make it specific and aspirational. Then explain why: describe honestly what's showing up right now, what it looks like from the outside, and what it's costing them. The reader should feel pulled toward something, not judged for where they are.
- Tone: direct but not harsh. You're not delivering a verdict. You're showing someone a gap they can close — and what's on the other side of closing it. The discomfort comes from recognition, not from feeling told off.
- If there are other things showing up alongside this, bring them in naturally as context — not a separate diagnosis.
- 220–280 words. No bullet points. Flowing paragraphs. No headers.
- Do NOT mention scores or numbers.
- Do NOT use the words "journey," "unlock," "potential," "impactful," or "leverage" as a verb.
- Do NOT sound like a performance review. Do NOT use language like "you are not" or frame the person as lacking.
- The reader should feel: pulled forward by what's possible, and honest enough with themselves to know what needs to change.

After the main output text, add a line break then write exactly: COACHING_QUESTION_START
Then write a single coaching question — one sentence — that speaks directly to the shift you opened with. This is the one question worth sitting with after reading this. It should be genuinely open, provocative, and specific to what's showing up for this person. Not rhetorical. A real question a coach would leave someone with. Plain English, no jargon.
Then write: COACHING_QUESTION_END`;

    try {
      const response = await fetch("/api/generate-result", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
      });

      const data = await response.json();
      const raw = data.text;

      if (raw) {
        const [mainText, questionRaw] = raw.split("COACHING_QUESTION_START");
        const coachingQuestion = questionRaw
          ? questionRaw.replace("COACHING_QUESTION_END", "").trim()
          : null;
        setResult({ text: mainText.trim(), scores: sorted, coachingQuestion });
        setPhase("results");
      } else {
        throw new Error("No output");
      }
    } catch (err) {
      setError("Something went wrong generating your results. Please try again.");
      setPhase("questions");
    }
  };

  if (phase === "intro") return <IntroScreen onStart={() => setPhase("questions")} />;
  if (phase === "generating") return <GeneratingScreen />;
  if (phase === "results") return <ResultsScreen result={result} />;

  return (
    <QuestionsScreen
      elements={elements}
      answers={answers}
      onAnswer={handleAnswer}
      onSubmit={generateResult}
      allAnswered={allAnswered}
      error={error}
    />
  );
}

