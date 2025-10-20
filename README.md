🛍️ Revoshop — E-commerce Web App (Next.js + TypeScript)

Revoshop is a modern Next.js + TypeScript e-commerce web application built to demonstrate CRUD operations, role-based access control, and dynamic rendering using Context API and Middleware.
It connects to the Platzi Fake Store API
 to simulate real-world product management and shopping workflows.

🚀 Features
🧭 Core Functionalities

🛒 Product Listing – Displays products with pagination (12 per page)

🔍 Search Products – Dynamic filtering by name

📦 Product Details Page – Dynamic route /products/[id]

🛍️ Add to Cart – Cart management via Context API and LocalStorage

🧰 CRUD Operations (Admin Only) – Create, Edit, and Delete products

👤 Customer View – View and add items to cart

🧠 Role-Based Access Control (Context API + Middleware)
🔐 Authentication Flow

Context API manages user authentication and role (admin or customer) across all components.

Middleware intercepts requests to protected routes like /admin and redirects unauthorized users to /login.

🧩 Example — Auth Context
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

  if (path.startsWith("/admin")) {
    if (!role || role !== "admin") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/checkout/:path*"],
};

🧩 Folder Structure
revoshop/
├── app/
│   ├── layout.tsx                # Global layout
│   ├── page.tsx                  # Homepage
│   ├── products/
│   │   ├── page.tsx              # Product listing
│   │   ├── [id]/page.tsx         # Product details (ISR + CSR)
│   │   ├── create/page.tsx       # Create product form (Admin)
│   │   └── [id]/edit/page.tsx    # Update product (Admin)
│   ├── admin/page.tsx            # Admin dashboard
│   ├── cart/page.tsx             # Cart management
│   ├── login/page.tsx            # Login (set user role)
│   ├── checkout/page.tsx         # Checkout page
│   └── globals.css               # Tailwind global styles
│
├── components/
│   ├── AddToCartButton.tsx
│   ├── Navbar.tsx
│   ├── ProductCard.tsx
│   └── ProductForm.tsx
│
├── context/
│   ├── AuthContext.tsx           # User authentication & roles
│   └── CartContext.tsx           # Cart management
│
├── lib/
│   └── api.ts                    # Axios API handlers (GET, POST, PUT, DELETE)
│
├── __tests__/                    # Jest unit tests
│   ├── cart.test.ts
│   └── product.test.ts
│
├── public/                       # Static assets
│   └── placeholder.png
│
├── middleware.ts                 # Route protection logic
├── next.config.mjs               # ISR & image configuration
├── package.json
└── tsconfig.json

⚙️ Dynamic Rendering & ISR

Revoshop uses Incremental Static Regeneration (ISR) to revalidate product pages automatically.

// app/products/[id]/page.tsx
export const revalidate = 60; // Revalidate every 60 seconds


This ensures the product page updates dynamically when data changes — without needing a full rebuild.

🧩 Admin vs Customer View (Ternary Operator)
const { userRole } = useAuth();

return (
  <>
    {userRole === "admin" ? (
      <button onClick={() => router.push(`/products/${id}/edit`)}>Edit Product</button>
    ) : (
      <AddToCartButton product={product} />
    )}
  </>
);


One route — two roles — dynamic rendering based on role.

🧪 Unit Testing (Jest + React Testing Library)

Revoshop integrates Jest for functional testing.

Example Test
// __tests__/cart.test.ts
import { renderHook, act } from "@testing-library/react";
import { CartProvider, useCart } from "@/context/CartContext";

describe("Cart Context", () => {
  it("adds product to cart", () => {
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider });

    act(() => {
      result.current.addToCart({ id: 1, title: "Test", price: 10, totalItems: 1 });
    });

    expect(result.current.cart.length).toBe(1);
  });
});

🧰 Tech Stack
Technology	Purpose
Next.js 14	App Router, SSR, CSR, ISR
TypeScript	Type-safe React code
React Context API	Global state & authentication
Axios	API integration
React Hook Form	Form validation
Tailwind CSS	Styling
Jest + RTL	Unit testing
Platzi Fake API	Product data source
🔐 User Roles
Role	Permissions
👨‍💼 Admin	Create, edit, delete, and view products
👤 Customer	View products, add to cart, checkout
📄 Future Enhancements

 JWT authentication

 Cloudinary image uploads

 Stripe/PayPal integration

 Mobile responsive UI

 Enhanced admin analytics dashboard

🌐 Deployment
Platform	Recommended For
Vercel	🥇 Best for Next.js apps — auto-optimizations
Render.com	Free-tier hosting with server support
Railway.app	Backend-friendly full-stack hosting

Deployment command:

npm run build && npm start

🧠 Learning Outcomes

This project demonstrates:

Authentication & role-based access using Context API + Middleware

Integration of CSR, SSR, SSG, and ISR

API-driven CRUD operations

Reusable React components and TypeScript interfaces

Jest unit testing for context and API logic

Secure route handling and conditional rendering