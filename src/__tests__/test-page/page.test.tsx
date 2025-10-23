import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import Page from "../../app/login/page";

describe("Page", () => {
  test("render a heading", () => {
    render(<Page />);

    const heading1 = screen.getByRole("heading", { level: 1 });
    expect(heading1).toBeInTheDocument();
  });
}
);