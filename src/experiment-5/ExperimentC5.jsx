
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function ExperimentC5() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function loadJob() {
    try {
      setLoading(true);
      setJob(null);
      setError("");

      console.log("Part C: Fetching job details for ID:", id);

      const res = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`
      );

      console.log("Part C: HTTP Status:", res.status);

      if (!res.ok) {
        throw new Error("Job not found");
      }

      const u = await res.json();

      console.log("Part C: API Response:", u);

      const jobData = {
        id: u.id,
        title: ["Developer", "Designer", "Analyst"][(u.id - 1) % 3],
        company: u.company.name,
        location: u.address.city,
        email: u.email,
      };

      setJob(jobData);
      console.log("Part C: Job Details Updated:", jobData);
    } catch (err) {
      console.error("Part C: API Error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadJob();
  }, [id]);

  if (loading && !job) {
    return (
      <section className="page">
        <p>Loading details...</p>
      </section>
    );
  }

  if (error && !job) {
    return (
      <section className="page">
        <p className="error">{error}</p>
        <button onClick={loadJob}>Try Again</button>
      </section>
    );
  }

  return (
    <section className="page">
      <h1>{job?.title}</h1>
      <p>Company: {job?.company}</p>
      <p>Location: {job?.location}</p>
      <p>Contact: {job?.email}</p>

      {error && <p className="error">{error}</p>}

      <button onClick={loadJob} disabled={loading}>
        {loading ? "Refreshing..." : "Refresh Details"}
      </button>

      <Link className="button" to="/experiment-5/b">
        Browse Jobs
      </Link>
    </section>
  );
}
