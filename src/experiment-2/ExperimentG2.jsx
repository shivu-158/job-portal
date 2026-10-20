import { useEffect } from "react";
import { useJobContext } from "./ExperimentC2";

export default function EXperimentG() {
  const {
    savedJobs,
    applications,
    alerts
  } = useJobContext();

  useEffect(() => {
    localStorage.setItem(
      "savedJobs",
      JSON.stringify(savedJobs)
    );
  }, [savedJobs]);

  useEffect(() => {
    localStorage.setItem(
      "applications",
      JSON.stringify(applications)
    );
  }, [applications]);

  useEffect(() => {
    localStorage.setItem(
      "jobAlerts",
      JSON.stringify(alerts)
    );
  }, [alerts]);

  return (
    <div>
      <h2>Browser Storage</h2>
      <p>Job data synchronized with localStorage.</p>
    </div>
  );
}