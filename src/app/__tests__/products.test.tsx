import "@testing-library/jest-dom";
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from "@/app/lib/api";
import ProductPage from "../products/page";
import { useAuth } from '@/app/context/AuthContext';
import { AuthProvider} from '@/app/context/AuthContext';



// --- 1. Mock Dependencies ---

// Mock the useRouter hook (Next.js dependency)
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

// Mock the useAuth hook to control the userRole for testing
const mockUseAuth = jest.fn();
jest.mock('@/app/context/AuthContext', () => ({
  useAuth: () => mockUseAuth(),
}));

// Mock the window.location object to prevent errors during navigation attempts
const mockWindowLocation = {
  href: '',
  assign: jest.fn(),
};

beforeAll(() => {
  jest.clearAllMocks();
});
afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
});


describe('ProductsPage - Admin Access', () => {
  // Test Case 1: Admin User
  test('displays the "Create Product" button when userRole is "admin"', () => {
    // Setup the mock to return the 'admin' role
    mockUseAuth.mockReturnValue({
      userRole: 'admin',
      isAuthenticated: true,
    });
        render(<ProductPage />);

    // Assert: Find the button by its accessible name (the text content)
    const createButton = screen.getByRole('button', { name: /create product/i });

    // Verify it is in the document
    expect(createButton).toBeInTheDocument();
  });

    test('hides the "Create Product" button when userRole is "customer"', () => {
      mockUseAuth.mockReturnValue({
        userRole: 'customer',
        isAuthenticated: true,
      });
      render(<ProductPage />);
      const createButton = screen.queryByRole('button', { name: /create product/i });
      expect(createButton).not.toBeInTheDocument();
    });
});



describe("Products Page API", () => {
  test("getProducts returns a list of products", async () => {
    render( <ProductPage />);
    const Heading1 = screen.getByRole("heading",{level:1});
    expect(Heading1).toBeInTheDocument();
  });
});