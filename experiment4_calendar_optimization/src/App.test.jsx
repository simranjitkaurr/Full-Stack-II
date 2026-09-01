import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("renders the experiment title, controls, calendar and render monitor", () => {
    render(<App />);

    expect(screen.getByText("Interactive Calendar")).toBeInTheDocument();
    expect(screen.getByLabelText("React.memo on cards")).toBeInTheDocument();
    expect(screen.getByLabelText("useCallback for handlers")).toBeInTheDocument();
    expect(screen.getByLabelText("useMemo for agenda filter")).toBeInTheDocument();
    expect(screen.getByLabelText("Live clock")).toBeInTheDocument();
    expect(screen.getByLabelText("Interactive calendar")).toBeInTheDocument();
    expect(screen.getByLabelText("Render monitor")).toBeInTheDocument();
    expect(screen.getByText("0")).toBeInTheDocument();
    expect(screen.getByText("/" )).toBeInTheDocument();
    expect(screen.getByText("8", { exact: true })).toBeInTheDocument();
  });
});
