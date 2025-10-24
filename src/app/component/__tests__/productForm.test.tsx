import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor} from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import ProductForm from '../productForm';


describe("product form testing", () =>{
    test("product button clicked", async () => {
        const User = userEvent.setup();
        render(<ProductForm/>)
        await User.click(screen.getByRole('button',{ name: /Product/i}))
    })
})


describe('SubmitButton', () =>{
    test("form submitted", async () => {
        const handleSubmit = jest.fn();
        render(<ProductForm/>)

                const user = userEvent.setup();

                await user.type(screen.getByLabelText(/Title/i), 'Test Product');
                await user.type(screen.getByLabelText(/Description/i), 'Product description');
                await user.type(screen.getByLabelText(/Price/i), '100');
                await user.type(screen.getByLabelText(/categoryId/i), '1');

                await user.click(screen.getByRole('button', { name: /(Create|Update) Product/i }));
                const banner = await screen.findByRole('status');
                expect(banner).toHaveTextContent(/product (created|updated) successfully/i);

        //   fireEvent.change(screen.getByLabelText(/Title/i), {
        //         target: { value: "Computer" },
        //     });
        //     fireEvent.change(screen.getByLabelText(/Description/i), {
        //         target: { value: "This is a description" },
        //     });
        //     fireEvent.change(screen.getByLabelText(/Price/i), {
        //         target: { value: 20 },
        //     });
        //     fireEvent.change(screen.getByLabelText(/categoryId/i), {
        //         target: { value: 1 },
        //     });

        // const button = screen.getByRole('button', { name: /Create Product/i });
        // fireEvent.click(button);
        // await waitFor(() => {
        //     expect( screen.getByText(/successfully/i)).toBeInTheDocument();
        // });
            // expect(handleSubmit).toHaveBeenCalledTimes(0);
    })
})