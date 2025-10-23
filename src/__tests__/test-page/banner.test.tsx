import { render, screen, fireEvent } from "@testing-library/react";
import Banner from "@/app/component/banner";

describe("Banner", () => {
  it("navigates to /Promotion when clicked", () => {
    render(<Banner />);

    const linkElement = screen.getByRole('link');

    // Verify that link points to /Promotion
    expect(linkElement).toHaveAttribute("href", "/Promotion");

    // Simulate user clicking it
    fireEvent.click(linkElement);

    // Since we're mocking, we just verify the correct href — no actual navigation happens
    expect(linkElement.getAttribute("href")).toBe("/Promotion");
  });
});