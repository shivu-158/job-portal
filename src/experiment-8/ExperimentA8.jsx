
import { useState } from "react";
import { login } from "./authApi";

export default function ExperimentA8() {
  const [email, setEmail] = useState("student@example.com");
  const [password, setPassword] = useState("student123");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const result = await login(email, password);
      setMessage(result.message);
      console.log("[8A] Login result:", result.message);
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Login failed"
      );
      console.error("[8A] Login error:", error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section>
      <h2>Experiment 8: Applicant Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p role="status">{message}</p>
    </section>
  );
}
