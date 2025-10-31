import { http, HttpResponse } from 'msw';

const API_BASE = 'https://api.escuelajs.co/api/v1';

const mockUsers = [
  {
    id: 1,
    email: 'johnny.doe@example.com',
    password: "changeme",
    name: 'Johnny',
    role: 'customer',
    avatar: "https://i.imgur.com/LDOO4Qs.jpg"

  },
  {
    id: 2,
    email: 'rob.doe@example.com',
    password: "changeme",
    name: 'Rob',
    role: 'customer',
    avatar: "https://i.imgur.com/LDOO4Qs.jpg"

  },
  {
    id: 3,
    email: 'mario.doe@example.com',
    password: "changeme",
    name: 'Mario',
    role: 'customer',
    avatar: "https://i.imgur.com/LDOO4Qs.jpg"

  },
];

const mockProducts = [
  {
    id: 1,
    title: 'iPhone 15 Pro',
    slug: 'iPhone 15 Pro',
    price: 2000,
    description: 'Latest iPhone with advanced features',
    category: {
      id:1,
      name:'smartphones',
      image:'www.wikimedia.com',
      slug:'others'
    },
    images: ['https://dummyjson.com/image/300']
  },
  {
    id: 2,
    title: 'Samsung Galaxy',
    slug: 'Samsung Galaxy',
    price: 1000,
    description: 'Latest Samsung with advanced features',
    category: {
      id:1,
      name:'smartphones',
      image:'www.wikimedia.com',
      slug:'others'
    },
    images: ['https://dummyjson.com/image/300']
  },
  {
    id: 3,
    title: 'Oppo Reno',
    slug: 'Oppo Reno',
    price: 900,
    description: 'Latest Oppo with advanced features',
    category: {
      id:1,
      name:'smartphones',
      image:'www.wikimedia.com',
      slug:'others'
    },
    images: ['https://dummyjson.com/image/300']
  },
];

export const handlers = [
  // GET /users
  http.get(`${API_BASE}/users`, async () => {
    await delay(1000);
    return HttpResponse.json({
      users: mockUsers,
      total: mockUsers.length,
      skip: 0,
      limit: mockUsers.length,
    });
  }),

  // GET /users/:id
  // http.get(`${API_BASE}/users/:id`, ({ params }) => {
  //   const user = mockUsers.find((u) => u.id === Number(params.id));
  //   if (!user) {
  //     return HttpResponse.json({ message: 'User not found' }, { status: 404 });
  //   }
  //   return HttpResponse.json(user);
  // }),

  // GET /products/search
  // http.get(`${API_BASE}/products/search`, ({ request }) => {
  //   const url = new URL(request.url);
  //   const query = url.searchParams.get('q') || '';
  //   const filtered = mockProducts.filter(
  //     (p) =>
  //       p.title.toLowerCase().includes(query.toLowerCase()) ||
  //       p.description.toLowerCase().includes(query.toLowerCase()) ||
  //       p.category.toLowerCase().includes(query.toLowerCase())
  //   );

  //   return HttpResponse.json({
  //     products: filtered,
  //     total: filtered.length,
  //     skip: 0,
  //     limit: filtered.length,
  //   });
  // }),

  // GET /products
  http.get(`${API_BASE}/products`, ({ request }) => {
    const url = new URL(request.url);
    const limit = Number(url.searchParams.get('limit')) || 10;
    const skip = Number(url.searchParams.get('skip')) || 0;

    const paginated = mockProducts.slice(skip, skip + limit);

    return HttpResponse.json({
      products: paginated,
      total: mockProducts.length,
      skip,
      limit,
    });
  }),

  // Simulate error
  http.get(`${API_BASE}/error`, () => {
    return HttpResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }),
];

// helper to simulate delay
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));