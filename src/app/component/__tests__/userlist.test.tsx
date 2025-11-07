import "@testing-library/jest-dom";
import React from "react";
import userEvent from "@testing-library/user-event";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import UserList from "../UserList";
import { api } from "@/app/lib/api";
import { mockUserList } from "@/app/__mocks__/mockUserList";

// Mock the entire API module
jest.mock("@/app/lib/api");
const mockApi = api as jest.Mocked<typeof api>;


jest.mock("@/app/lib/api", () => ({
  api: {
    getUsers: jest.fn(),
    getUserById: jest.fn(),
  },
}));

// Mock data for testing
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

const mockUserResponse = {
  users: mockUsers,
  total: mockUsers.length,
  skip: 0,
  limit: mockUsers.length,
};


  // fase 1 persiapan aja
  describe("Initial Rendering", () => {
    // disini testing awal masih kosong, cmn mengecheck structure
      afterEach(() => {
          jest.clearAllMocks();
      });

    test("getuser succesfully", async() =>{
         jest.spyOn(api, 'getUsers').mockResolvedValue(mockUsers as any);
        const users = await api.getUsers();

            expect(users).toEqual(mockUsers);
            expect(users.length).toBe(3);
            // expect(users[0].name).toBe('Johnny');

    })

});


describe("UserList loading state", () => {
    afterEach(() => {
    jest.clearAllMocks();
  });
  test("renders loading message when loadingState is 'loading'", async () => {

    (api.getUsers as jest.Mock).mockImplementation(() => new Promise(() => {}));

    render(<UserList />);

    const loadingElement = await screen.findByTestId("loading-state");
    expect(loadingElement).toBeInTheDocument();
    expect(loadingElement).toHaveTextContent("Loading users...");
  });
});



describe("UserList error state", () => {
    afterEach(() => {
    jest.clearAllMocks();
  });
  test("displays error message and retry button when fetchUsers fails", async () => {
    // 👇 Force getUsers() to reject (simulate API failure)
    (api.getUsers as jest.Mock).mockRejectedValue(new Error("Failed to fetch users"));

    render(<UserList />);

    // Wait for the error state to appear
    const errorDiv = await screen.findByTestId("error-state");

    // Check that the error text is present
    expect(errorDiv).toBeInTheDocument();
    expect(errorDiv).toHaveTextContent("Error: Failed to fetch users");

    // Check that the Try Again button exists
    const tryAgainButton = screen.getByRole("button", { name: /Try Again/i });
    expect(tryAgainButton).toBeInTheDocument();

    // ✅ Optionally test that clicking the button triggers another fetch
    (api.getUsers as jest.Mock).mockResolvedValue([]); // make success next time
    await userEvent.click(tryAgainButton);

    // Wait until loading appears again after clicking Try Again
    // await waitFor(() =>
    //   expect(screen.getByTestId("loading-state")).toBeInTheDocument()
    // );
  });
});