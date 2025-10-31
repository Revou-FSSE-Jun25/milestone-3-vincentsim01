/**
 * @jest-environment node
 */

import axios from "axios";
import { getProduct, getProducts } from "@/app/lib/api"; // adjust this import to match your actual file path
import { Product } from "@/app/types/product";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("getProduct", () => {
  const dummyProduct = {
    id: 1,
    title: "Test Product",
    price: 100,
    description: "Sample description",
    images: ["https://example.com/image.jpg"],
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch product successfully", async () => {
    // Mock axios.get to resolve with data
    mockedAxios.get.mockResolvedValueOnce({ data: dummyProduct });

    const result = await getProduct(1);

    expect(mockedAxios.get).toHaveBeenCalledWith(
      "https://api.escuelajs.co/api/v1/products/1"
    );
    expect(result).toEqual(dummyProduct);
  });

  it("should throw an error when API call fails", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("Network error"));

    await expect(getProduct(1)).rejects.toThrow("Failed to fetch product");
    expect(mockedAxios.get).toHaveBeenCalledWith(
      "https://api.escuelajs.co/api/v1/products/1"
    );
  });
});


describe("getProducts with mock value", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("returns a mocked array of products", async () => {
    const mockProducts: Product[] = [
      {
        id: 1,
        title: "Product 1",
        slug: "product 1",
        price: 100,
        description: "Mocked product 1",
        categoryId: 1,
        images: ["https://example.com/product1.jpg"],
      },
      {
        id: 2,
        title: "Product 2",
        slug: "product 2",
        price: 200,
        description: "Mocked product 2",
        categoryId: 2,
        // { id: 2, name: "Category 2", image: "https://example.com/cat2.jpg" },
        images: ["https://example.com/product2.jpg"],
      },
    ];

    // Mock axios.get to resolve with mockProducts array
    mockedAxios.get.mockResolvedValueOnce({ data: mockProducts });

    const result = await getProducts(0);

    expect(result).toEqual(mockProducts);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      "https://api.escuelajs.co/api/v1/products?offset=0&limit=12"
    );
  });

  it("throws an error when API fails", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("API failed"));

    await expect(getProducts(0)).rejects.toThrow("failed to fetch products");
  });
});


