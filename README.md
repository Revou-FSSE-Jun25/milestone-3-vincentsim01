[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/oWpYBV3N)


# 🛍️ Revoshop — E-commerce Web App (Next.js + TypeScript)

**Revoshop** is a simple yet functional e-commerce web application built with **Next.js** and **TypeScript**, following the **CRUD (Create, Read, Update, Delete)** principle.  
It utilizes the [Platzi Fake Store API](https://fakeapi.platzi.com/) to handle product data and demonstrates modern React and Next.js concepts such as client-side rendering (CSR), server-side rendering (SSR), and static site generation (SSG).

---

## 🚀 Features

### 🧭 Core Functionalities
- **Product Listing** – Fetches and displays products (limited to 10 per page).  
- **Product Search** – Allows users to search for specific products.  
- **Product Details Page** – Dynamic route using `[id]`, accessible via `localhost:3000/products/[id]`.  
- **Add to Cart** – Stores selected items in **Session Storage**.  
- **CRUD Operations** – 
  - **Admin View:** Create, Update, Delete, and Add to Cart.  
  - **Customer View:** View products and Add to Cart only.  

### ⚙️ Technical Highlights
- Built with **Next.js** and **TypeScript**  
- Uses **React Hooks**:
  - `useState`, `useEffect`
  - `useParams`
  - `useRouter`, `Link`
  - `react-hook-form` for form handling
- Integrates **CSR**, **SSR**, and **SSG**
- API integration with [Fake Store API (Platzi)](https://fakeapi.platzi.com/)

---

## 🧩 Architecture Overview

### Pages & Routing
- **`/products`** – Displays product list (CSR/SSR/SSG).  
- **`/products/[id]`** – Dynamic route showing details of a specific product.  
- **`/admin`** – Admin panel to manage products.  
- **`/create`** – Form page for adding new products (POST).  
- **`/update/[id]`** – Form page for updating existing products (PUT).  
- **`/cart`** – Session-based cart management page.

### Data Handling
- All product data is fetched from: https://fakeapi.platzi.com/

- Supports `GET`, `POST`, `PUT`, and `DELETE` methods.

---

## 👩‍💻 Tech Stack

| Technology | Purpose |
|-------------|----------|
| **Next.js** | Framework for SSR, CSR, and SSG |
| **TypeScript** | Type-safe JavaScript development |
| **React Hook Form** | Simplified form management |
| **Session Storage** | Persistent cart storage |
| **Platzi Fake API** | Mock data source |
| **ChatGPT & Claude** | AI-assisted code and content development |

---

## 🔐 User Roles

### 👨‍💼 Administrator
- Create new products  
- Edit existing products  
- Delete products  
- Add to cart

### 👤 Customer
- View products  
- Search products  
- Add to cart

---

## 📄 Current Limitations / To-Do
- [ ] Image upload feature  
- [ ] Mobile responsiveness  
- [ ] Login / Logout system  
- [ ] Checkout & payment integration  

---

## 🌐 Live Preview

You can view the project deployment and status on Netlify here:  
🔗 [Revoshop on Netlify](https://app.netlify.com/projects/revoshop/overview)

---

## 🧠 Learning Outcomes

This project demonstrates:
- The use of **Next.js rendering modes** (CSR, SSR, SSG)
- Understanding of **React hooks** and **state management**
- CRUD operations using a RESTful API
- Building reusable components with **TypeScript**
- Handling routes and dynamic pages in Next.js
- Use of **AI tools** (ChatGPT, Claude) to enhance development efficiency

---

## 📦 Installation & Setup

```bash
# Clone the repository
git clone https://github.com/your-username/revoshop.git

# Navigate to project folder
cd revoshop

# Install dependencies
npm install

# Run development server
npm run dev

# Open your browser at
http://localhost:3000



This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
