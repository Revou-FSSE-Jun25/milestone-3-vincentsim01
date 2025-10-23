import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { mockProduct } from '@/app/mocks/mockProduct';
import ProductList from '../productList';
import { useAuth } from '@/app/context/AuthContext';

const mockUseAuth = jest.fn();
jest.mock('@/app/context/AuthContext', () => ({
  useAuth: () => mockUseAuth(),
}));

describe("successful render", () => {
  beforeEach(() => {
    jest.restoreAllMocks(); // reset between tests
  });
    test("success", async () => {
        // render(<ProductList />);
        // const Heading3 = screen.getByRole('heading', { level: 3 });
        // expect(Heading3).toBeInTheDocument();
            // global.fetch = jest.fn(() =>
            //   Promise.resolve({
            //     json: () =>
            //       Promise.resolve([mockProduct]),
            //   })
            // ) as jest.Mock;
    

            render(<ProductList />);

            
            // await waitFor(() => {

              // expect(screen.getByText("Loading...")).toBeInTheDocument();
        //               const ClassicDiv = screen.getByRole('div', { name: /shirt/i });
        // expect(ClassicDiv).toBeInTheDocument();

            // });

      });
});