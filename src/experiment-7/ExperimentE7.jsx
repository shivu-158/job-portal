
import { useEffect, useState } from "react";
import { getSavedJobs, getApplications } from "./api";

export default function ExperimentE7() {
  const [savedJobs, setSavedJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([getSavedJobs(), getApplications()])
      .then(([saved, applied]) => {
        setSavedJobs(saved.data);
        setApplications(applied.data);
      })
      .catch(() => setError("Unable to retrieve records."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading records...</p>;
  if (error) return <p role="alert">{error}</p>;

  return (
    <section>
      <h2>Experiment 7E: Saved Jobs</h2>
      {savedJobs.map((job) => (
        <p key={job.id}>{job.title || `Job ${job.jobId || job.id}`}</p>
      ))}

      <h2>Application History</h2>
      {applications.map((app) => (
        <p key={app.id}>
          {app.applicant} — {app.status} (Application #{app.id})
        </p>
      ))}
    </section>
  );
}
