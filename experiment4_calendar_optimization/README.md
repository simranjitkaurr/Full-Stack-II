# Experiment 4 — Interactive Calendar Optimization & Testing

## Aim
Develop and optimize a calendar interface that efficiently renders scheduled interactions such as drag-and-drop, while ensuring minimal re-renders with comprehensive testing.

## Features
- Interactive weekly calendar
- Drag-and-drop event rescheduling
- Add new calendar interactions
- `React.memo` for event/calendar components
- `useMemo` for derived event-slot data
- `useCallback` for stable event handlers
- React `Profiler` for measuring update duration
- Vitest + React Testing Library tests
- Responsive and clean UI
- No backend required

## Requirements
- Node.js 18+ recommended
- VS Code

## Run in VS Code

1. Extract this ZIP.
2. Open the project folder in VS Code.
3. Open the VS Code terminal.
4. Run:

```bash
npm install
npm run dev
```

5. Open the local URL printed by Vite, normally:
`http://localhost:5173`

## Run tests

```bash
npm test
```

For a single test run:

```bash
npm run test:run
```

## Production build

```bash
npm run build
npm run preview
```

## Optimization concepts used

### React.memo
`EventCard` and `Calendar` are memoized so they can avoid unnecessary renders when their props have not changed.

### useMemo
The `eventsBySlot` map is calculated only when the events array changes.

### useCallback
Handlers are kept stable between renders where possible, reducing unnecessary child updates.

### React Profiler
The calendar is wrapped with `Profiler`, allowing render duration to be observed in the browser developer console.

### Testing
The tests verify:
1. Scheduled interactions render correctly.
2. Calendar day selection works.
3. Drag-and-drop calls the move handler with the correct event, date, and hour.
4. The main application renders the expected UI.

## Project structure

```text
experiment4-calendar-optimization/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── App.jsx
    ├── App.test.jsx
    ├── main.jsx
    ├── styles.css
    ├── data/
    │   └── events.js
    ├── components/
    │   ├── Calendar.jsx
    │   ├── Calendar.test.jsx
    │   └── EventCard.jsx
    └── test/
        └── setup.js
```
