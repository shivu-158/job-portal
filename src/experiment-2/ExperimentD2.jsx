import { useJobContext } from "./ExperimentC2";

export default function EXperimentD() {
  const { filteredJobs, savedJobs, applications } = useJobContext();

  return (
    <div>
      <h2>Job Information</h2>
      <p>Available Jobs: {filteredJobs.length}</p>
      <p>Saved Jobs: {savedJobs.length}</p>
      <p>Applications: {applications.length}</p>
    </div>
  );
}