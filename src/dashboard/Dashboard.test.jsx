import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Dashboard from "./Dashboard";

test("renders Dashboard without crashing", () => {
  render(<Dashboard />);
  
  // Check if key components appear
  expect(screen.getByText(/Exchange Coins/i)).toBeInTheDocument();
  expect(screen.getByText(/Portfolio/i)).toBeInTheDocument();
});
