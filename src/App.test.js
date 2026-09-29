import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the portfolio home page", () => {
  window.location.hash = "#/home";
  render(<App />);
  expect(screen.getByText(/システムを設計し/i)).toBeInTheDocument();
});
