import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import Calendar from "./Calendar";
import { initialEvents } from "../data/events";

describe("Calendar", () => {
  it("renders the scheduled interactions visible in the 8 AM–2 PM window", () => {
    render(
      <Calendar
        events={initialEvents}
        selectedDate="2026-08-17"
        onSelectDate={vi.fn()}
        onMoveEvent={vi.fn()}
      />
    );

    expect(screen.getByText("Design review")).toBeInTheDocument();
    expect(screen.getByText("1:1 with Sam")).toBeInTheDocument();
    expect(screen.getByText("Write proposal")).toBeInTheDocument();
    expect(screen.getByText("Sprint planning")).toBeInTheDocument();
    expect(screen.getByText("Grocery run")).toBeInTheDocument();
  });

  it("shows the calendar through 2 PM", () => {
    render(
      <Calendar
        events={initialEvents}
        selectedDate="2026-08-17"
        onSelectDate={vi.fn()}
        onMoveEvent={vi.fn()}
      />
    );

    expect(screen.getAllByText("14:00")).toHaveLength(7);
  });

  it("selects a calendar day", () => {
    const onSelectDate = vi.fn();

    render(
      <Calendar
        events={initialEvents}
        selectedDate="2026-08-17"
        onSelectDate={onSelectDate}
        onMoveEvent={vi.fn()}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Select Wed 19" }));
    expect(onSelectDate).toHaveBeenCalledWith("2026-08-19");
  });

  it("moves an interaction after drag and drop", () => {
    const onMoveEvent = vi.fn();

    render(
      <Calendar
        events={initialEvents}
        selectedDate="2026-08-17"
        onSelectDate={vi.fn()}
        onMoveEvent={onMoveEvent}
      />
    );

    fireEvent.dragStart(screen.getByTestId("event-event-1"));
    fireEvent.dragOver(screen.getByTestId("slot-2026-08-18-13"));
    fireEvent.drop(screen.getByTestId("slot-2026-08-18-13"));

    expect(onMoveEvent).toHaveBeenCalledWith("event-1", "2026-08-18", 13);
  });
});
