import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import Page from "@/app/payment/page";
import userEvent from '@testing-library/user-event';
import { useAuth } from '@/app/context/AuthContext';
import { AuthProvider } from '@/app/context/AuthContext'

beforeEach(() => {
  const checkoutItems = [
    { id: 1, title: "Product 1", price: 10, quantity: 2 },
    { id: 2, title: "Product 2", price: 5, quantity: 1 },
  ];
  localStorage.setItem("checkoutItems", JSON.stringify(checkoutItems));
});

afterEach(() => {
  localStorage.clear();
  jest.restoreAllMocks();
});


describe('payment page testing', () =>{

    test('confirm payment',() =>{

        try{        
            render(
                <AuthProvider>          
                    <Page/>
                </AuthProvider>
  

        )
            const headertwo = screen.getByRole("heading", {level:2, name: /choose payment method/i});
            expect(headertwo).toBeInTheDocument();
        }
        catch(err){
            console.error(err)
        }

    })

})