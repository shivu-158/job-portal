
import { useEffect, useState } from "react";

export default function ExperimentA5() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchJobs() {
    try {
      setLoading(true);
      setError("");

      console.log("Fetching job data from API...");

      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch jobs");
      }

      const data = await response.json();

      console.log("Experiment 5 - Part A: API Response");
      console.log(data);

      const jobData = data.map((user, index) => ({
        id: user.id,
        title: ["Developer", "Designer", "Analyst"][index % 3],
        company: user.company.name,
        location: user.address.city,
        salary: 5 + index,
        experience: index === 0 ? "Fresher" : "Experienced"
      }));

      console.log("Job Information:", jobData);

      setJobs(jobData);
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <section className="page">
      <h1>Available Jobs</h1>

      {/* Fetch again when clicked */}
      <button onClick={fetchJobs} disabled={loading}>
        {loading ? "Fetching..." : "Fetch Jobs"}
      </button>

      {error && <p className="error">{error}</p>}

      {jobs.map((job) => (
        <article className="job-card" key={job.id}>
          <h3>{job.title}</h3>
          <p>{job.company}</p>
          <p>{job.location}</p>
          <p>Salary: ₹{job.salary} LPA</p>
          <p>{job.experience}</p>
        </article>
      ))}
    </section>
  );
}
