

🛍️ Revoshop — E-Commerce Web Application (Next.js + TypeScript + Jest)

Revoshop is a modern Next.js + TypeScript e-commerce web application built to demonstrate full-stack functionality, including CRUD operations, authentication, role-based access control, middleware protection, and automated testing using Jest and React Testing Library.

The app connects to the Platzi Fake Store API to simulate real-world product management, shopping, and user authentication workflows.

🚀 Key Features
🧭 Core Functionalities

🛒 Product Listing – Displays products with pagination (12 items per page).

🔍 Search Products – Filter dynamically by product name.

📦 Product Details – Dynamic routing under /products/[id].

🛍️ Add to Cart – Manage shopping cart using Context API and local storage.

🧰 CRUD Operations (Admin) – Create, update, and delete products via admin dashboard.

👤 Customer View – Browse, view details, and add products to cart.

🧠 Authentication & Role-Based Access

Authentication and role management are implemented through the Context API and Next.js Middleware.

🔐 Login Flow

Users authenticate via Platzi Fake Store API.

The app assigns roles (admin or user) and stores credentials in cookies.

Middleware protects admin routes and redirects unauthorized users to /login.




🧩 Auth Context
"use client";
import { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";

type AuthContextType = {
  userRole: string | null;
  setUserRole: (role: string | null) => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const role = Cookies.get("user-role");
    if (role) setUserRole(role);
  }, []);

  const isAuthenticated = !!userRole;

  return (
    <AuthContext.Provider value={{ userRole, setUserRole, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};



🛡️ Middleware for Route Protection
// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const role = req.cookies.get("user-role")?.value;
  const path = req.nextUrl.pathname;

  if (path.startsWith("/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/checkout/:path*"],
};



💳 Cart Management (Context API)

Shopping cart functionality is handled globally via React Context and local storage.

const [cart, setCart] = useState<Product[]>([]);

const addToCart = (product: Product) => {
  setCart(prev => {
    const existing = prev.find(item => item.id === product.id);
    return existing
      ? prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        )
      : [...prev, { ...product, quantity: 1 }];
  });
};



⚙️ Dynamic Rendering & ISR

Revoshop uses Incremental Static Regeneration (ISR) to keep product pages fresh without full rebuilds.

export const revalidate = 60; // Revalidate every 60 seconds


This allows automatic background regeneration when products are updated.

🧩 Admin vs Customer Rendering
const { userRole } = useAuth();

return userRole === "admin" ? (
  <button onClick={() => router.push(`/products/${id}/edit`)}>Edit Product</button>
) : (
  <AddToCartButton product={product} />
);


Single route — two views — context-driven rendering.

🧪 Testing (Next.js + Jest + React Testing Library)

Revoshop includes comprehensive testing for contexts, components, and forms.

✅ Test Coverage
Component	Test Type	Description
CartContext	Unit Test	Adds/removes products, calculates totals.
AuthContext	Unit Test	Validates authentication and role persistence.
ProductForm	Integration	Tests input handling, form submission, and validation.
ProductList	Unit Test	Renders product cards or “No products available”.
Login Page	Mock Test	Simulates API login success/failure and redirect behavior.
Banner Component	Render Test	Verifies dynamic banner visibility and text display.
Example — CartContext Test
import { renderHook, act } from "@testing-library/react";
import { CartProvider, useCart } from "@/context/CartContext";

describe("Cart Context", () => {
  it("adds a product to the cart", () => {
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider });

    act(() => {
      result.current.addToCart({ id: 1, title: "Sample", price: 50, totalItems: 1 });
    });

    expect(result.current.cart.length).toBe(1);
  });
});

Example — Login Page Mock Test
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginPage from "@/app/login/page";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

test("redirects to user dashboard on successful login", async () => {
  const push = jest.fn();
  (useRouter as jest.Mock).mockReturnValue({ push });

  render(<LoginPage />);
  fireEvent.click(screen.getByRole("button", { name: /login/i }));

  await waitFor(() => expect(push).toHaveBeenCalledWith("/user"));
});

🧰 Tech Stack
Technology	Purpose
Next.js 14	App Router, ISR, SSR, and Middleware
TypeScript	Strongly-typed React code
React Context API	Global state management
Axios / Fetch API	API communication
React Hook Form	Form validation
Tailwind CSS	Modern UI styling
Jest + React Testing Library	Unit and integration testing
MSW (Mock Service Worker)	Mocking API responses
🧩 Folder Structure
revoshop/
├── app/
│   ├── login/page.tsx
│   ├── products/[id]/page.tsx
│   ├── admin/page.tsx
│   └── checkout/page.tsx
├── components/
│   ├── AddToCartButton.tsx
│   ├── ProductCard.tsx
│   ├── Banner.tsx
│   └── ProductForm.tsx
├── context/
│   ├── AuthContext.tsx
│   └── CartContext.tsx
├── __tests__/
│   ├── cart.test.ts
│   ├── auth.test.ts
│   ├── productForm.test.ts
│   ├── productList.test.ts
│   ├── login.test.ts
│   └── banner.test.ts
├── middleware.ts
└── next.config.mjs

🔮 Future Enhancements

✅ JWT Authentication

☁️ Cloudinary Product Image Uploads

💳 Stripe / PayPal Integration

📱 Responsive Mobile UI

📊 Admin Analytics Dashboard

🌐 Deployment
Platform	Notes
Vercel	⚡️ Optimized for Next.js
Render.com	Free-tier full-stack hosting
Railway.app	Ideal for backend integration

Build & Deploy:

npm run build && npm start

🧠 Learning Outcomes

Revoshop demonstrates how to:

Implement authentication & authorization with Context + Middleware

Combine SSR, CSR, and ISR rendering strategies

Perform CRUD operations via REST API

Write unit and mock tests for React components

Build scalable, type-safe Next.js applications