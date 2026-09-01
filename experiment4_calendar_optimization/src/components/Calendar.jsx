import React, { useCallback, useMemo, useState } from "react";
import { hours, weekDays } from "../data/events";
import { MemoEventCard, PlainEventCard } from "./EventCard";

const Calendar = React.memo(function Calendar({
  events,
  selectedDate,
  onSelectDate,
  onMoveEvent,
  memoCards = true,
  callbackHandlers = true,
  memoAgenda = true,
  onCardRender
}) {
  const [draggedId, setDraggedId] = useState(null);
  const [dropTarget, setDropTarget] = useState("");

  const eventsBySlot = useMemo(() => {
    const map = new Map();
    for (const event of events) {
      const key = `${event.date}-${event.hour}`;
      const existing = map.get(key) || [];
      map.set(key, [...existing, event]);
    }
    return map;
  }, [events]);

  const memoizedAgenda = useMemo(
    () => events.filter((event) => event.date === selectedDate),
    [events, selectedDate]
  );
  const agendaEvents = memoAgenda
    ? memoizedAgenda
    : events.filter((event) => event.date === selectedDate);

  const stableDragStart = useCallback((eventId) => setDraggedId(eventId), []);
  const stableDragEnd = useCallback(() => {
    setDraggedId(null);
    setDropTarget("");
  }, []);
  const stableDragOver = useCallback((e, key) => {
    e.preventDefault();
    setDropTarget(key);
  }, []);
  const stableDrop = useCallback((e, date, hour) => {
    e.preventDefault();
    if (draggedId) onMoveEvent(draggedId, date, hour);
    setDraggedId(null);
    setDropTarget("");
  }, [draggedId, onMoveEvent]);
  const stableGetEvents = useCallback(
    (date, hour) => eventsBySlot.get(`${date}-${hour}`) || [],
    [eventsBySlot]
  );

  // Turning useCallback off intentionally creates fresh function references on each render.
  const handleDragStart = callbackHandlers ? stableDragStart : (eventId) => setDraggedId(eventId);
  const handleDragEnd = callbackHandlers ? stableDragEnd : () => { setDraggedId(null); setDropTarget(""); };
  const handleDragOver = callbackHandlers ? stableDragOver : (e, key) => { e.preventDefault(); setDropTarget(key); };
  const handleDrop = callbackHandlers ? stableDrop : (e, date, hour) => {
    e.preventDefault();
    if (draggedId) onMoveEvent(draggedId, date, hour);
    setDraggedId(null);
    setDropTarget("");
  };
  const getEvents = callbackHandlers ? stableGetEvents : (date, hour) => eventsBySlot.get(`${date}-${hour}`) || [];

  const Card = memoCards ? MemoEventCard : PlainEventCard;

  return (
    <section className="calendar-card" aria-label="Interactive calendar">
      <div className="calendar-toolbar">
        <div className="week-title">WEEK VIEW</div>
        <div className="legend" aria-label="Event types">
          <span className="legend-item meeting">Meeting</span>
          <span className="legend-item deadline">Deadline</span>
          <span className="legend-item focus">Focus block</span>
          <span className="legend-item personal">Personal</span>
        </div>
      </div>

      <div className="calendar-head">
        {weekDays.map((day) => (
          <button
            className={`day-head ${selectedDate === day.date ? "selected" : ""}`}
            key={day.date}
            onClick={() => onSelectDate(day.date)}
            aria-label={`Select ${day.label} ${day.number}`}
          >
            <span>{day.label}</span>
          </button>
        ))}
      </div>

      <div className="calendar-body">
        {hours.map((hour) => (
          <React.Fragment key={hour}>
            {weekDays.map((day) => {
              const key = `${day.date}-${hour}`;
              const slotEvents = getEvents(day.date, hour);
              return (
                <div
                  key={key}
                  className={`slot ${dropTarget === key ? "drop-active" : ""}`}
                  onDragOver={(e) => handleDragOver(e, key)}
                  onDrop={(e) => handleDrop(e, day.date, hour)}
                  data-testid={`slot-${key}`}
                >
                  <span className="slot-time">{String(hour).padStart(2, "0")}:00</span>
                  {slotEvents.map((event) => (
                    <Card
                      key={event.id}
                      event={event}
                      onDragStart={handleDragStart}
                      onDragEnd={handleDragEnd}
                      onRender={onCardRender}
                    />
                  ))}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>

      <div className="agenda-note">
        <span>Agenda filter</span>
        <span>{agendaEvents.length} event{agendaEvents.length === 1 ? "" : "s"} on selected day · {memoAgenda ? "useMemo cached" : "recomputed"}</span>
      </div>
    </section>
  );
});

export default Calendar;
