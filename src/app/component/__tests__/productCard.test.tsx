import { render, screen, fireEvent } from "@testing-library/react";
import ProductCard from '../productCard';
import { useAuth } from '@/app/context/AuthContext';
import { AuthProvider} from '@/app/context/AuthContext';
import { Product } from '@/app/types/product';
import { mockProduct } from '@/app/mocks/mockProduct';


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

const mockWindowLocation = {
  href: '',
  assign: jest.fn(),
};

beforeAll(() => {

  jest.clearAllMocks();
});
describe("ProductCard Component - not null", () => {
    test("get link to product", async () => {
        mockUseAuth.mockReturnValue({
        userRole: null,
        isAuthenticated: true,
        });

        render(
            // <AuthProvider>
                <ProductCard product={mockProduct}/>
            // </AuthProvider>)'
        )
        
        const AddtoCartText = screen.getByText('Add To Cart');
        expect(AddtoCartText).toHaveAttribute("href", "/login");

    });
});