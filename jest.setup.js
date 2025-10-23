import "@testing-library/jest-dom";
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    prefetch: jest.fn(),
  }),
  useSearchParams: () => ({
    get: jest.fn(),
  }),
    usePathname: () => '/products',
  useSearchParams: () => ({
    get: jest.fn(),
  }),
}));