
import { useEffect, useState } from "react";

export default function ExperimentD5() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function loadAlerts() {
    try {
      setLoading(true);
      setError("");

      console.log("Part D: Fetching job alerts...");

      const res = await fetch(
        "https://jsonplaceholder.typicode.com/posts?_limit=8"
      );

      console.log("Part D: HTTP Status:", res.status);

      if (!res.ok) {
        throw new Error("Unable to load alerts");
      }

      const data = await res.json();

      console.log("Part D: API Response:", data);

      setAlerts(data);
      console.log("Part D: Alerts Updated:", data);
    } catch (err) {
      console.error("Part D: API Error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAlerts();
  }, []);

  return (
    <section className="page">
      <h1>Job Alerts</h1>

      <button onClick={loadAlerts} disabled={loading}>
        {loading ? "Fetching..." : "Refresh Alerts"}
      </button>

      {loading && <p>Loading alerts...</p>}
      {error && <p className="error">{error}</p>}

      {!loading &&
        !error &&
        alerts.map((alert) => (
          <article className="job-card" key={alert.id}>
            <h3>{alert.title}</h3>
            <p>Alert ID: {alert.id}</p>
            <p>{alert.body}</p>
          </article>
        ))}
    </section>
  );
}
