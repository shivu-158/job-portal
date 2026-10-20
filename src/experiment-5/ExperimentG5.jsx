import { useEffect, useState } from "react";
import axios from "axios";

export default function ExperimentG() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadJobs() {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        setJobs(response.data);
      } catch {
        setError("Failed to retrieve data.");
      }
    }
    loadJobs();
  }, []);

  return (
    <section className="page">
      <h1>Axios API Integration</h1>
      {error && <p className="error">{error}</p>}
      {jobs.map(job => (
        <article className="job-card" key={job.id}>
          <h3>{job.name}</h3>
          <p>{job.company.name}</p>
          <p>{job.address.city}</p>
        </article>
      ))}
    </section>
  );
}