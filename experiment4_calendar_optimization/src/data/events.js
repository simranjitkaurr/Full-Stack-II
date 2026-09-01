export const initialEvents = [
  { id: "event-1", title: "Design review", date: "2026-08-17", hour: 10, duration: 1, type: "meeting" },
  { id: "event-2", title: "Ship v2.3", date: "2026-08-17", hour: 16, duration: 1, type: "deadline" },
  { id: "event-3", title: "1:1 with Sam", date: "2026-08-18", hour: 9, duration: 1, type: "meeting" },
  { id: "event-4", title: "Write proposal", date: "2026-08-19", hour: 13, duration: 1, type: "focus" },
  { id: "event-5", title: "Sprint planning", date: "2026-08-20", hour: 11, duration: 1, type: "focus" },
  { id: "event-6", title: "Client demo", date: "2026-08-21", hour: 15, duration: 1, type: "meeting" },
  { id: "event-7", title: "Grocery run", date: "2026-08-22", hour: 10, duration: 1, type: "personal" },
  { id: "event-8", title: "Portfolio review", date: "2026-08-23", hour: 18, duration: 1, type: "focus" }
];

export const weekDays = [
  { date: "2026-08-17", label: "Mon", number: 17 },
  { date: "2026-08-18", label: "Tue", number: 18 },
  { date: "2026-08-19", label: "Wed", number: 19 },
  { date: "2026-08-20", label: "Thu", number: 20 },
  { date: "2026-08-21", label: "Fri", number: 21 },
  { date: "2026-08-22", label: "Sat", number: 22 },
  { date: "2026-08-23", label: "Sun", number: 23 }
];

// Show the working day from 8:00 AM through 2:00 PM.
export const hours = Array.from({ length: 7 }, (_, index) => index + 8);
