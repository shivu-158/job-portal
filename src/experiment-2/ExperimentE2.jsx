import { useMemo } from "react";
import { useJobContext } from "./ExperimentC2";

export default function EXperimentE() {
  const { filteredJobs, savedJobs, applications } = useJobContext();

  const matchingJobs = useMemo(
    () => filteredJobs.length,
    [filteredJobs]
  );

  const savedCount = useMemo(
    () => savedJobs.length,
    [savedJobs]
  );

  const applicationCount = useMemo(
    () => applications.length,
    [applications]
  );

  const statusSummary = useMemo(() => {
    return applications.reduce((acc, app) => {
      acc[app.status] = (acc[app.status] || 0) + 1;
      return acc;
    }, {});
  }, [applications]);

  return (
    <div>
      <h2>Job Statistics</h2>
      <p>Matching Jobs: {matchingJobs}</p>
      <p>Saved Jobs: {savedCount}</p>
      <p>Applications: {applicationCount}</p>
      <p>Status: {JSON.stringify(statusSummary)}</p>
    </div>
  );
}