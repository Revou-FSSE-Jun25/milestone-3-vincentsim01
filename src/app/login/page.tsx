
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("john@mail.com");
  const [password, setPassword] = useState("changeme");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const setCookie = (name: string, value: string, minutes: number = 30) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + (minutes * 60 * 1000));
    document.cookie = `${name}=${value}; path=/; expires=${expires.toUTCString()}`;
    console.log(`🍪 Cookie set: ${name}`);
  };

  const getCookie = (name: string): string | null => {
    return document.cookie
      .split('; ')
      .find(row => row.startsWith(`${name}=`))
      ?.split('=')[1] || null;
  };

  const getUserRole = (email: string): 'admin' | 'user' => {
    return email === 'john@mail.com' ? 'admin' : 'user';
  };

  useEffect(() => {
    const token = getCookie('auth-token');
    const savedEmail = getCookie('email');
    if (token && savedEmail) {
      const userRole = getUserRole(savedEmail);
      const redirect = userRole === "admin" ? "/admin" : "/user";
      console.log('Already logged in, redirecting to:', redirect);
      router.push(redirect);
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      console.log('🔑 Attempting login...');
      
      const response = await fetch('https://api.escuelajs.co/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          expiresInMins: 30,
        }),
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const data = await response.json();
      console.log('✅ Login API successful');

      // Set cookies
      setCookie('auth-token', data.access_token, 30);
      setCookie('refresh-token', data.refresh_token, 30);
      setCookie('email', email, 30);
      setCookie('user-role', getUserRole(email), 30);

      // Get user profile
      const userResponse = await fetch('https://api.escuelajs.co/api/v1/auth/profile', {
        headers: {
          'Authorization': `Bearer ${data.access_token}`,
        },
      });

      if (userResponse.ok) {
        const userData = await userResponse.json();
        setCookie('user-data', JSON.stringify(userData), 30);
        console.log('✅ User data cached');
      }

      const userRole = getUserRole(email);
      const redirect = userRole === "admin" ? "/admin" : "/user";
      setTimeout(() => {console.log('🚀 Redirecting to:', redirect)},300)

      
      // Wait a bit to ensure cookies are written
      await new Promise(resolve => setTimeout(resolve, 800));
      
      router.push(redirect);

    } catch (error) {
      console.error('❌ Login failed:', error);
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