"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  // const [username, setUsername] = useState("emilys");
  const [email, setEmail] = useState("john@mail.com");
  const [password, setPassword] = useState("changeme");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  // const [steti, setSteti] = useState("");
  const searchParams = useSearchParams();

  // Simple cookie helper functions
  const setCookie = (name: string, value: string, minutes: number = 30) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + (minutes * 60 * 1000));
    document.cookie = `${name}=${value}; path=/; expires=${expires.toUTCString()}`;
  };

  const getCookie = (name: string): string | null => {
    return document.cookie
      .split('; ')
      .find(row => row.startsWith(`${name}=`))
      ?.split('=')[1] || null;
  };

  // Simple role assignment
  const getUserRole = (email: string): 'admin' | 'user' => {
    return email === 'john@mail.com' ? 'admin' : 'user';
  };

  // Check if already logged in
  useEffect(() => {
    const token = getCookie('auth-token');
    const savedEmail = getCookie('email');
    if (token && savedEmail) {
      const userRole = getUserRole(savedEmail);
      const redirect = userRole === "admin" ? "/admin" : "/user";
      router.push(redirect);
    }
  }, [router]);

  // Handle login submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    // setSteti("clicked");

    try {
      // Direct API call to DummyJSON
      const response = await fetch('https://api.escuelajs.co/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          // username,
          password,
          expiresInMins: 30,
        }),
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const data = await response.json();
      // console.log(data)

      // console.log('Login successful:', data.access_token);

      // Store authentication data in cookies
      setCookie('auth-token', data.access_token, 30);
      setCookie('refresh-token', data.refresh_token, 30);
      // console.log('this is auth token'+   getCookie('auth-token'));
      // console.log('this is refresh token'+   getCookie('refresh-token'));
      // setCookie('username', username, 30);
      setCookie('email', email, 30);
      // console.log(getCookie('email'));
      setCookie('user-role', getUserRole(email), 30);

      // Get and cache user data
      const userResponse = await fetch('https://api.escuelajs.co/api/v1/auth/profile', {
        headers: {
          'Authorization': `Bearer ${data.access_token}`,
        },
      });

      if (userResponse.ok) {
        const userData = await userResponse.json();
        setCookie('user-data', JSON.stringify(userData), 30);
      }

      // Redirect based on role
      const userRole = getUserRole(email);
      const redirect = userRole === "admin" ? "/admin" : "/user";
      console.log('Redirecting to:', redirect);
      router.push(redirect);

    } catch (error) {
      setError("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Login</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form
        onSubmit={handleLogin}
        style={{ maxWidth: "300px", margin: "0 auto" }}
      >
        <div style={{ marginBottom: "10px" }}>
          <label>Email:</label>
          <br />
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: "5px" }}
            required
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Password:</label>
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: "5px" }}
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          onClick={handleLogin}
          style={{
            padding: "10px 20px",
            backgroundColor: isLoading ? "#ccc" : "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: isLoading ? "not-allowed" : "pointer"
          }}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>

      <div style={{ marginTop: "20px", fontSize: "12px" }}>
        <p><strong>Platzi Test Credentials:</strong></p>
        <p>Email: <code>john@mail.com</code></p>
        <p>Password: <code>changeme</code></p>
        <p style={{ marginTop: "10px", fontSize: "11px", color: "#666" }}>
          Note: This will login as 'John' with admin privileges
        </p>
      </div>
    </div>
  );
}