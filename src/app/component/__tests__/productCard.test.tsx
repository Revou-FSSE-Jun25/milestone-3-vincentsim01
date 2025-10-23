import { render, screen, fireEvent } from "@testing-library/react";
import ProductCard from '../productCard';
import { useAuth } from '@/app/context/AuthContext';
import { AuthProvider} from '@/app/context/AuthContext';
import { Product } from '@/app/types/product';
import { mockProduct } from '@/app/mocks/mockProduct';
import { useCart } from "@/app/context/CartContext";
import {CartProvider} from "@/app/context/CartContext";
import {mockProductCard} from "@/app/mocks/mockProductCard";


jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn(),
    prefetch: jest.fn(),
  }),
}));


const mockUseAuth = jest.fn();
jest.mock('@/app/context/AuthContext', () => ({
  useAuth: () => mockUseAuth(),
}));

// jest.mock('@/app/context/AuthContext', () => ({
//   useAuth: () => mockUseAuth(),
// }));

const mockUseCart = jest.fn();
jest.mock('@/app/context/CartContext', () => ({
  useCart: () => mockUseCart(),
}));

const mockWindowLocation = {
  href: '',
  assign: jest.fn(),
};

beforeAll(() => {

  jest.clearAllMocks();
});
describe("ProductCard Component - not null", () => {
    test("get link to Add to login", async () => {
        mockUseAuth.mockReturnValue({
        userRole: null,
        isAuthenticated: true,
        });

        render(
            // <AuthProvider>
                // <CartProvider>
                    <ProductCard product={mockProduct}/>
                // </CartProvider>

            // </AuthProvider>)'
        )
        
        const AddtoCartText = screen.getByText('Add To Cart');
        expect(AddtoCartText).toHaveAttribute("href", "/login");

    });

        test("get link to Add to Cart if customer", async () => {
        mockUseAuth.mockReturnValue({
        userRole: 'customer',
        isAuthenticated: true,
        });

        //   const { addToCart } = useCart();


           const mockAddToCart = jest.fn();
            mockUseCart.mockReturnValue({
                addToCart: mockAddToCart,
                cartItems: [],
            });

        render(
    
             
                <ProductCard product={mockProduct}/>


        
        )
        
        const AddtoCartRole = screen.getByRole('button', { name: /add to cart/i });
        expect(AddtoCartRole).toBeInTheDocument();

    });
});


describe("ProductCard Edit Delete", () => {});
    test("show edit delete for admin", async () => {
        mockUseAuth.mockReturnValue({
        userRole: 'admin',
        isAuthenticated: true,
        });


        render(
            <ProductCard product={mockProduct} showActions={true}/>
        )
        const EditButton = screen.getByRole('link', { name: /edit/i });
        expect(EditButton).toBeInTheDocument(); 
        const DeleteButton = screen.getByRole('button', { name: /delete/i });
        expect(DeleteButton).toBeInTheDocument();   
    });