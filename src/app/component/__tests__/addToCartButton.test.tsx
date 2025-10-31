/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AddToCartButton from "../addToCartButton";
import { useCart } from "@/app/context/CartContext";

// Mock the useCart hook
jest.mock("@/app/context/CartContext");

describe("AddToCartButton", () => {
  const mockAddToCart = jest.fn();

  beforeEach(() => {
    // Clear mocks before each test
    jest.clearAllMocks();

    // Mock implementation of useCart()
    (useCart as jest.Mock).mockReturnValue({
      addToCart: mockAddToCart,
    });

    // Mock localStorage
    Storage.prototype.getItem = jest.fn(() => "[]");
    Storage.prototype.setItem = jest.fn();
  });

  it("calls addToCart with item1 (quantity 1) when clicked", () => {
    const product = { id: 1, title: "item1", price: 10, images: [] };

    render(<AddToCartButton product={product} />);

    // Click button
    const button = screen.getByRole("button", { name: "Add to Cart" });
    fireEvent.click(button);

    // ✅ Assert addToCart called correctly
    expect(mockAddToCart).toHaveBeenCalledTimes(1);
    expect(mockAddToCart).toHaveBeenCalledWith({
      id: 1,
      title: "item1",
      price: 10,
      images: [],
    });

    // ✅ Assert localStorage updated
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart",
      JSON.stringify([product])
    );
  });
});