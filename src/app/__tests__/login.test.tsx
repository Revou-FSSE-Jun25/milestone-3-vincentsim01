/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginPage from "../login/page"; // adjust this path if needed
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("LoginPage mock login test", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    jest.clearAllMocks();
    document.cookie = ""; // reset cookies
  });

  it("logs in successfully with correct credentials", async () => {
    // 🧠 Mock fetch() for login + profile API
    const mockFetch = jest.spyOn(global, "fetch").mockImplementation((url) => {
      if (url.toString().includes("/login")) {
        return Promise.resolve({
          ok: true,
          json: async () => ({
            access_token: "mock_access_token",
            refresh_token: "mock_refresh_token",
          }),
        } as Response);
      }

      if (url.toString().includes("/profile")) {
        return Promise.resolve({
          ok: true,
          json: async () => ({
            id: 1,
            name: "John",
            email: "john@mail.com",
          }),
        } as Response);
      }

      return Promise.reject(new Error("Unknown URL"));
    });

    // 🧩 Render the login page
    render(<LoginPage />);

    // The form is pre-filled (email + password), but you can change it if you want
    const button = screen.getByRole("button", { name: /login/i });

    // 🧪 Simulate clicking the login button
    fireEvent.click(button);

    // ✅ Wait until router.push is called
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(2); // login + profile
      expect(mockPush).toHaveBeenCalledWith("/admin");
    });

    // ✅ Check cookies were set
    expect(document.cookie).toContain("auth-token=mock_access_token");
    expect(document.cookie).toContain("email=john@mail.com");

    mockFetch.mockRestore();
  });

  it("shows error on invalid credentials", async () => {
    const mockFetch = jest.spyOn(global, "fetch").mockResolvedValue({
      ok: false,
      json: async () => ({ error: "Invalid credentials" }),
    } as Response);

    render(<LoginPage />);

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/login failed/i)).toBeInTheDocument();
    });

    mockFetch.mockRestore();
  });
});