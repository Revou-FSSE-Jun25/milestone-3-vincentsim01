import "@testing-library/jest-dom";
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from "@/app/lib/api";
import ProductPage from "../products/page";
import { useAuth } from '@/app/context/AuthContext';
import { AuthProvider} from '@/app/context/AuthContext';
// import { AuthContext } from '@/app/context/AuthContext';

// describe("Products Page API", () => {
//   test("getProducts returns a list of products", async () => {
//     render(
        // <AuthProvider>
            // <ProductPage />
        // </AuthProvider>
//     );
//     const Heading1 = screen.getByRole("heading",{level:1});
//     expect(Heading1).toBeInTheDocument();
//   });

// test("Search Button Exist", async () => {
//     render(
//         <AuthProvider>
//             <ProductPage />
//         </AuthProvider>
//     );
//     const SearchButton = screen.getByRole("button", { name: /search/i });
//     expect(SearchButton).toBeInTheDocument();
//   });
// });


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

// const originalWindowLocation = window.location;

// Set up/restore the window.location mock
beforeAll(() => {
    // Object.defineProperty(window, 'location', {
    //   configurable: true,
    //   value: mockWindowLocation,
    //   writable: true,
    // });
  jest.clearAllMocks();
});
afterEach(() => {
    // Object.defineProperty(window, 'location', {
    //   configurable: true,
    //   value: originalWindowLocation,
    //   writable: true,
    // });
    jest.clearAllMocks(); // Clear mocks after each test
});

// Mock the ProductList component to simplify rendering (optional but good practice)
// jest.mock('../products/page', () => {
    // eslint-disable-next-line react/display-name
//     return (props:any) => (
//         <div data-testid="product-list">
//             ProductList Component {props.showActions ? '(with actions)' : '(no actions)'}
//         </div>
//     );
// });

// jest.mock('@/context/AuthContext', () => ({
//   useAuth: () => ({ isAuthenticated: true, userRole: 'user', user: null, isLoading:false, logout: jest.fn(), refreshUser: jest.fn() }),
// }));


describe('ProductsPage - Admin Access', () => {

  // Test Case 1: Admin User
  test('displays the "Create Product" button when userRole is "admin"', () => {
    // Setup the mock to return the 'admin' role
    mockUseAuth.mockReturnValue({
      userRole: 'admin',
      isAuthenticated: true,
    });


        render(
        // <AuthProvider>
            <ProductPage />
        // </AuthProvider>
    );

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


        render(
        // <AuthProvider>
            <ProductPage />
        // </AuthProvider>
    );


    const createButton = screen.queryByRole('button', { name: /create product/i });


    expect(createButton).not.toBeInTheDocument();
  });
});

//   Test Case 2: Non-Admin User (e.g., 'user')


  // Test Case 3: Unauthenticated User
//   test('hides the "Create Product" button when userRole is null', () => {

//     mockUseAuth.mockReturnValue({
//       userRole: null,
//       isAuthenticated: false,
//     });

        // render(
        // <AuthProvider>
            // <ProductPage />
        // </AuthProvider>
    // );


//     const createButton = screen.queryByRole('button', { name: /create product/i });

    
//     expect(createButton).not.toBeInTheDocument();
//   });
// });