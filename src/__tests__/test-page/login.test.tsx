import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import Page from "../../app/login/page";

describe("Login Page", () => {
  test("render a heading", () => {
    render(<Page />);

    const heading1 = screen.getByRole("heading", { level: 1 });
    expect(heading1).toBeInTheDocument();


  });
  // test("email label exists", () =>{
  //   render(<Page />);

  //   const emailLabel = screen.getByText(/email/i);
  //   expect(emailLabel).toBeInTheDocument();
  // });

  test('renders Platzi Test Credentials text', () => {
    render(<Page />);
    const text = screen.getByText(/platzi test credentials:/i);
    expect(text).toBeInTheDocument();
});
}
);