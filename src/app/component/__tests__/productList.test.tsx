import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { mockProduct } from '@/app/__mocks__/mockProduct';
import ProductList from '../productList';
import { useAuth } from '@/app/context/AuthContext';
import {mockProductList} from '@/app/__mocks__/mockProductList';
import { getProducts } from "@/app/lib/api";

const mockUseAuth = jest.fn();
jest.mock('@/app/context/AuthContext', () => ({
  useAuth: () => mockUseAuth(),
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

jest.mock("@/app/lib/api", () => ({
  getProducts: jest.fn(),
}));

// describe("Failed render", () => {
//   beforeEach(() => {
//     jest.restoreAllMocks(); // reset between tests
//   });


//     test("Failure", async () => {
//         (getProducts as jest.Mock).mockResolvedValueOnce([]);
//             render(<ProductList />);
//                 await waitFor(() => {
//                   expect(screen.getByText("No products")).toBeInTheDocument();
//                 });
//       });
// });


describe("Successful Fetch", () => {
  beforeEach(() => {
    jest.restoreAllMocks(); // reset between tests
  });


    test("Success", async () => {
        (getProducts as jest.Mock).mockResolvedValueOnce(mockProductList);
        const products = await getProducts(1);

            expect(products).toEqual(mockProductList);
            expect(products.length).toBe(3);
            expect(products[0].title).toBe('Wireless Bluetooth Headphones');
      });
});