import { useEffect, useState } from "react";

export default function ExperimentI5() {
  const [summary, setSummary] = useState({
    users: 0,
    posts: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadSummary() {
      try {
        const [userRes, postRes] = await Promise.all([
          fetch("https://jsonplaceholder.typicode.com/users"),
          fetch("https://jsonplaceholder.typicode.com/posts")
        ]);

        if (!userRes.ok || !postRes.ok) {
          throw new Error("Failed to load dashboard data");
        }

        const [users, posts] = await Promise.all([
          userRes.json(),
          postRes.json()
        ]);

        setSummary({
          users: users.length,
          posts: posts.length
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadSummary();
  }, []);

  return (
    <section className="page">
      <h1>API Dashboard</h1>
      {loading && <p>Loading dashboard...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <div className="dashboard-grid">
          <article className="job-card">
            <h2>{summary.users}</h2>
            <p>API User Records</p>
          </article>
          <article className="job-card">
            <h2>{summary.posts}</h2>
            <p>API Post Records</p>
          </article>
        </div>
      )}
    </section>
  );
}