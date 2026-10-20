
import { useEffect, useState } from "react";

export default function ExperimentF5() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchData() {
    setLoading(true);
    setError("");

    try {
      console.log("Part F: Fetching user data...");

      const res = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );

      console.log("Part F: HTTP Status:", res.status);

      if (!res.ok) {
        throw new Error("API request failed");
      }

      const result = await res.json();

      console.log("Part F: API Response:", result);

      setData(result);

      console.log("Part F: User data updated:", result);
    } catch (err) {
      console.error("Part F: API Error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="page">
      <h1>Async/Await Demo</h1>

      <button
        className="button"
        onClick={fetchData}
        disabled={loading}
      >
        {loading ? "Loading..." : "Reload Data"}
      </button>

      {loading && <p>Loading...</p>}

      {error && <p className="error">{error}</p>}

      {!loading &&
        !error &&
        data.map((user) => (
          <article className="job-card" key={user.id}>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
          </article>
        ))}
    </section>
  );
}
