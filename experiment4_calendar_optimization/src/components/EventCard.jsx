import React, { useCallback, useEffect } from "react";

function EventCardBase({ event, onDragStart, onDragEnd, onRender }) {
  // Keep the actual DOM event handler stable when the parent gives us a stable
  // onDragStart function. This is important for the React.memo demonstration.
  const handleDragStart = useCallback(() => {
    onDragStart(event.id);
  }, [onDragStart, event.id]);

  // Count committed renders, not renders that React may start and discard.
  // This also avoids mutating state/ref during render.
  useEffect(() => {
    // Run after every committed render. The parent App ignores the initial
    // mount, so the monitor measures demo-triggered re-renders only.
    onRender?.(event.id);
  });

  return (
    <div
      className={`event event-${event.type}`}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={onDragEnd}
      title="Drag this event to another calendar slot"
      data-testid={`event-${event.id}`}
    >
      <span className="event-time">{String(event.hour).padStart(2, "0")}:00</span>
      <strong>{event.title}</strong>
    </div>
  );
}

export const MemoEventCard = React.memo(EventCardBase);
export const PlainEventCard = EventCardBase;
export default MemoEventCard;
