import { useJobContext } from "./ExperimentC2";

export default function EXperimentH() {
  const {
    filteredJobs,
    savedJobs,
    applications,
    alerts
  } = useJobContext();

  return (
    <div>
      <h2>Job Portal Status</h2>

      {filteredJobs.length === 0 &&
        <p>No jobs found</p>}

      {filteredJobs.length > 0 &&
        <p>{filteredJobs.length} jobs found</p>}

      {savedJobs.length === 0 &&
        <p>No saved jobs</p>}

      {applications.length === 0 &&
        <p>No applications submitted</p>}

      {alerts.length === 0 &&
        <p>No job alerts available</p>}
    </div>
  );
}