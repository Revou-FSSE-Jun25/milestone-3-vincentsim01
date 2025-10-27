import { http, HttpResponse, delay } from "msw";

// DummyJSON API base URL
const API_BASE = "https://api.escuelajs.co/api/v1";

// Mock users data
const mockUsers = [
  {
    id: 1,
    email: "John@mail.com",
    password: "changeme",
    name: "john",
    role: "admin",
    avatar: "https://dummyjson.com/icon/johndoe/128",
  },
  {
    id: 2,
    email: "Jane@mail.com",
    password: "pleasechange",
    name: "jane",
    role: "customer",
    avatar: "https://dummyjson.com/icon/johndoe/128",
  },
  {
    id: 3,
    email: "Mario@mail.com",
    password: "mario",
    name: "mario",
    role: "customer",
    avatar: "https://dummyjson.com/icon/johndoe/128",
  },
];

// Mock products data
const mockProducts = [
  {
    id: 1,
    title: "Product 1",
    slug: "Product-One",
    price: 111,
    description: "Product One are designed to keeping in...",
    category: {
      id: 1,
      name: "Others",
      image: "https://placehold.co/600x400",
      slug: "others"
    },
    images: [
      "https://placehold.co/600x400",
      "https://placehold.co/600x400",
      "https://placehold.co/600x400"
    ]
  },
  {
    id: 2,
    title: "Product 2",
    slug: "Product-Two",
    price: 222,
    description: "Product Two are designed to keeping in...",
    category: {
      id: 2,
      name: "Others",
      image: "https://placehold.co/600x400",
      slug: "others"
    },
    images: [
      "https://placehold.co/600x400",
      "https://placehold.co/600x400",
      "https://placehold.co/600x400"
    ]
  },
  {
    id: 3,
    title: "Product 3",
    slug: "Product-Three",
    price: 111,
    description: "Product Three are designed to keeping in...",
    category: {
      id: 3,
      name: "Others",
      image: "https://placehold.co/600x400",
      slug: "others"
    },
    images: [
      "https://placehold.co/600x400",
      "https://placehold.co/600x400",
      "https://placehold.co/600x400"
    ]
  },
];

// MSW handlers for API endpoints
export const handlers = [
  // GET /users - Get all users
  http.get(`${API_BASE}/users`, (req, res, ctx) => {
    // Simulate network delay
    return res(
      ctx.delay(1000),
      ctx.status(200),
      ctx.json({
        users: mockUsers,
        total: mockUsers.length,
        skip: 0,
        limit: mockUsers.length,
      }),
    );
  }),

  // GET /users/:id - Get user by ID
  http.get(`${API_BASE}/users/:id`, (req, res, ctx) => {
    const { id } = req.params;
    const user = mockUsers.find((u) => u.id === parseInt(id as string));

    if (!user) {
      return res(
        ctx.status(404), 
        ctx.json({ message: "User not found" }));
    }

    return res(
        ctx.delay(500), 
        ctx.status(200), 
        ctx.json(user));
    // kalau nanti backend punya banyak status code, nanti harus diikutin semua status code yang ada
  }),

  // GET /products/search - Search products
  http.get(`${API_BASE}/products/search`, (req, res, ctx) => {
    const query = req.url.searchParams.get("q") || "";

    const filteredProducts = mockProducts.filter(
      (product) =>
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()),
    );

    return res(
      ctx.delay(800),
      ctx.status(200),
      ctx.json({
        products: filteredProducts,
        total: filteredProducts.length,
        skip: 0,
        limit: filteredProducts.length,
      }),
    );
  }),

  // GET /products - Get all products
  http.get(`${API_BASE}/products`, (req, res, ctx) => {
    const limit = parseInt(req.url.searchParams.get("limit") || "10");
    const skip = parseInt(req.url.searchParams.get("skip") || "0");

    const paginatedProducts = mockProducts.slice(skip, skip + limit);

    return res(
      ctx.delay(600),
      ctx.status(200),
      ctx.json({
        products: paginatedProducts,
        total: mockProducts.length,
        skip,
        limit,
      }),
    );
  }),

  // Simulate API error for testing error states
  http.get(`${API_BASE}/error`, (req, res, ctx) => {
    return res(
      ctx.delay(300),
      ctx.status(500),
      ctx.json({ message: "Internal Server Error" }),
    );
  }),
];

// Error handlers for testing error scenarios
export const errorHandlers = [
  // Handler that always returns an error
  http.get(`${API_BASE}/users`, (req, res, ctx) => {
    return res(
      ctx.delay(500),
      ctx.status(500),
      ctx.json({ message: "Failed to fetch users" }),
    );
  }),
];

// Slow handlers for testing loading states
// kenapa slow harus ditesting juga
// karena slow itu sangat possible terjadi
// hasilnya ada kemungkinan aplikasinya RTO, request time out

export const slowHandlers = [
  // Handler with very slow response for testing loading states
  http.get(`${API_BASE}/users`, (req, res, ctx) => {
    return res(
      ctx.delay(5000), // 5 second delay
      ctx.status(200),
      ctx.json({
        users: mockUsers,
        total: mockUsers.length,
        skip: 0,
        limit: mockUsers.length,
      }),
    );
  }),
];

// jest hanya bisa digunakan untuk testing js
// untuk testing react harus pakai react testing library
// untuk testing mock api harus meng