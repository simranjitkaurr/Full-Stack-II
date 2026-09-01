import React, { Profiler, useCallback, useEffect, useMemo, useRef, useState } from "react";
import Calendar from "./components/Calendar";
import { initialEvents } from "./data/events";

// Only events visible in the 8:00 AM–2:00 PM demo window are tracked.
const renderLabels = initialEvents.map((event) => event.title);

function Toggle({ checked, onChange, label, description }) {
  return (
    <label className="toggle-card">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className="switch" aria-hidden="true"><span /></span>
      <span className="toggle-copy">
        <strong>{label}</strong>
        <small>{description}</small>
      </span>
    </label>
  );
}

function App() {
  const [events, setEvents] = useState(initialEvents);
  const [selectedDate, setSelectedDate] = useState("2026-08-17");
  const [memoCards, setMemoCards] = useState(true);
  const [callbackHandlers, setCallbackHandlers] = useState(true);
  const [memoAgenda, setMemoAgenda] = useState(true);
  const [liveClock, setLiveClock] = useState(true);
  const [clock, setClock] = useState(new Date());
  const [renderSnapshot, setRenderSnapshot] = useState({});
  const renderCounts = useRef(Object.fromEntries(renderLabels.map((title) => [title, 0])));
  const trackCardRenders = useRef(false);

  useEffect(() => {
    if (!liveClock) return undefined;
    const timer = window.setInterval(() => setClock(new Date()), 450);
    return () => window.clearInterval(timer);
  }, [liveClock]);

  useEffect(() => {
    // Ignore the initial paint. The monitor is meant to show re-renders caused by demo actions.
    trackCardRenders.current = true;
  }, []);

  useEffect(() => {
    // Keep the monitor synced with the render counters.
    const timer = window.setInterval(() => setRenderSnapshot({ ...renderCounts.current }), 250);
    return () => window.clearInterval(timer);
  }, []);

  // Hooks must never be called conditionally. Keep useCallback unconditional,
  // then deliberately create a new wrapper when the demo switch is OFF.
  const stableMoveEvent = useCallback((eventId, targetDate, targetHour) => {
    setEvents((current) =>
      current.map((event) =>
        event.id === eventId
          ? { ...event, date: targetDate, hour: targetHour }
          : event
      )
    );
  }, []);

  const moveEvent = callbackHandlers
    ? stableMoveEvent
    : (eventId, targetDate, targetHour) =>
        stableMoveEvent(eventId, targetDate, targetHour);

  const performanceInfo = useMemo(() => ({ totalEvents: events.length }), [events]);

  const onRender = useCallback((id, phase, actualDuration) => {
    if (phase === "update") {
      console.debug(`${id} ${phase}: ${actualDuration.toFixed(2)}ms`);
    }
  }, []);

  const eventsRef = useRef(events);
  useEffect(() => {
    eventsRef.current = events;
  }, [events]);

  // Keep this callback stable. If it changed whenever `events` changed, it would
  // itself defeat React.memo by becoming a new prop for every EventCard.
  const onCardRender = useCallback((eventId) => {
    if (!trackCardRenders.current) return;
    const event = eventsRef.current.find((item) => item.id === eventId);
    if (event) renderCounts.current[event.title] = (renderCounts.current[event.title] || 0) + 1;
  }, []);

  const resetCounters = () => {
    renderCounts.current = Object.fromEntries(renderLabels.map((title) => [title, 0]));
    setRenderSnapshot({ ...renderCounts.current });
  };

  const totalCardRenders = Object.values(renderSnapshot).reduce((sum, count) => sum + count, 0);
  const totalCards = renderLabels.length;
  const currentClock = clock.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });

  return (
    <main className="app-shell">
      <header className="hero">
        <p className="eyebrow">UNIT 1 · EXPERIMENT 4 · LIVE DEMO</p>
        <h1>Interactive Calendar</h1>
        <p className="subtitle">Drag events between days, then flip the switches below to see, in real time, what React.memo, useCallback, and useMemo actually do to re-renders.</p>
      </header>

      <section className="controls-card" aria-label="Optimization controls">
        <div className="control-grid">
          <Toggle checked={memoCards} onChange={(e) => setMemoCards(e.target.checked)} label="React.memo on cards" description="Skip a card's re-render when its own props haven't changed." />
          <Toggle checked={callbackHandlers} onChange={(e) => setCallbackHandlers(e.target.checked)} label="useCallback for handlers" description="Keep drag handlers referentially stable so memo isn't fooled." />
          <Toggle checked={memoAgenda} onChange={(e) => setMemoAgenda(e.target.checked)} label="useMemo for agenda filter" description="Cache the filtered list; recompute only when events or day change." />
        </div>
        <div className="control-bottom">
          <Toggle checked={liveClock} onChange={(e) => setLiveClock(e.target.checked)} label="Live clock" description={`Ticks every 450ms to simulate unrelated state elsewhere in the app.${liveClock ? ` Current: ${currentClock}` : ""}`} />
          <button className="reset-btn" onClick={resetCounters}>Reset counters</button>
        </div>
      </section>

      <section className="content-grid">
        <Profiler id="Calendar" onRender={onRender}>
          <Calendar
            events={events}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            onMoveEvent={moveEvent}
            memoCards={memoCards}
            callbackHandlers={callbackHandlers}
            memoAgenda={memoAgenda}
            onCardRender={onCardRender}
          />
        </Profiler>

        <aside className="monitor-card" aria-label="Render monitor">
          <div className="monitor-head">
            <div>
              <h2>RENDER MONITOR</h2>
              <div className="monitor-stats"><strong>{totalCardRenders}</strong><span>/</span><strong>{totalCards}</strong></div>
              <div className="monitor-labels"><span>total renders logged</span><span>of {totalCards} cards</span></div>
            </div>
          </div>
          <div className="render-list">
            {renderLabels.map((title) => {
              const count = renderSnapshot[title] || 0;
              return (
                <div className="render-row" key={title}>
                  <span>{title}</span>
                  <div className="bar"><i style={{ width: `${Math.min(count * 12, 100)}%` }} /></div>
                  <b>{count}</b>
                </div>
              );
            })}
          </div>
          <p className="monitor-note">React.memo is ON — only the card whose data actually changed should light up.</p>
        </aside>
      </section>
    </main>
  );
}

export default App;
