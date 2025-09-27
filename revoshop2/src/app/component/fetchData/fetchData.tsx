"use client"; // if using App Router

import { useEffect, useState } from "react";

type Product = {
  id: number;
  title: string;
  price: number;
  images: string[];
};

export default function ProductsClient() {
  const [products, setProducts] = useState<Product[]>([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("https://dummyjson.com/users");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setUsers(data.users);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    // fetch("https://api.escuelajs.co/api/v1/products")
    //   .then((res) => res.json())
    //   .then((data: Product[]) => setProducts(data));

    fetchUsers();
  }, []);

    if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex justify-center items-center">
        <div className="text-lg text-white">Loading users...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md mx-auto">
          <strong>Error:</strong> {error}
        </div>
      </div>
    );
  }

  return (
 <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-white">
          Users List
        </h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-lg text-white truncate">
                    {user.firstName} {user.lastName}
                  </h3>
                  <p className="text-gray-300">@{user.username}</p>
                  <p className="text-sm text-gray-400 break-all">
                    {user.email}
                  </p>
                  <p className="text-sm text-gray-400">{user.phone}</p>
                  {user.company && (
                    <p className="text-sm text-gray-500 mt-1">
                      {user.company.name}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
