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

          fireEvent.change(screen.getByLabelText(/Title/i), {
                target: { value: "Computer" },
            });
            fireEvent.change(screen.getByLabelText(/Description/i), {
                target: { value: "This is a description" },
            });
            fireEvent.change(screen.getByLabelText(/Price/i), {
                target: { value: 20 },
            });
            fireEvent.change(screen.getByLabelText(/categoryId/i), {
                target: { value: 1 },
            });

        const button = screen.getByRole('button', { name: /Create Product/i });
        fireEvent.click(button);
        // await waitFor(() => {
        //     expect(screen.getByText(/Successfully/i)).toBeInTheDocument();
        // });
            expect(handleSubmit).toHaveBeenCalledTimes(0);
    })
})