
import { useEffect, useState } from "react";

export default function ExperimentE5() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function loadApplications() {
    try {
      setLoading(true);
      setError("");

      console.log("Part E: Fetching applications...");

      const res = await fetch(
        "https://jsonplaceholder.typicode.com/posts?_limit=6"
      );

      console.log("Part E: HTTP Status:", res.status);

      if (!res.ok) {
        throw new Error("Unable to load applications");
      }

      const data = await res.json();

      console.log("Part E: API Response:", data);

      setApplications(data);

      console.log("Part E: Applications Updated:", data);
    } catch (err) {
      console.error("Part E: API Error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadApplications();
  }, []);

  return (
    <section className="page">
      <h1>Application Information</h1>

      <button onClick={loadApplications} disabled={loading}>
        {loading ? "Fetching..." : "Refresh Applications"}
      </button>

      {loading && <p>Loading applications...</p>}

      {error && <p className="error">{error}</p>}

      {!loading &&
        !error &&
        applications.map((app) => (
          <article className="job-card" key={app.id}>
            <h3>Application #{app.id}</h3>
            <p>{app.title}</p>
            <span className="status">Status: Demo</span>
          </article>
        ))}
    </section>
  );
}
