import { render, screen, fireEvent } from "@testing-library/react";
import Banner from "@/app/component/banner";

// describe("Banner", () => {
//   it("navigates to /Promotion when clicked", () => {
//     render(<Banner />);

//     const link = screen.getByTestId("banner-link");

//     // Verify that link points to /Promotion
//     expect(link).toHaveAttribute("href", "/Promotion");

//     // Simulate user clicking it
//     fireEvent.click(link);

//     // Since we're mocking, we just verify the correct href — no actual navigation happens
//     expect(link.getAttribute("href")).toBe("/Promotion");
//   });
// });