import { useCallback } from "react";
import { useJobContext } from "./ExperimentC2";

export default function EXperimentF() {
  const {
    saveJob,
    removeSavedJob,
    applyJob,
    withdrawApplication,
    createJobAlert
  } = useJobContext();

  const save = useCallback(job => saveJob(job), [saveJob]);

  const remove = useCallback(id => removeSavedJob(id), [removeSavedJob]);

  const apply = useCallback(job => applyJob(job), [applyJob]);

  const withdraw = useCallback(
    id => withdrawApplication(id),
    [withdrawApplication]
  );

  const alert = useCallback(
    data => createJobAlert(data),
    [createJobAlert]
  );

  return (
    <div>
      <h2>Job Operations</h2>
      <button onClick={() => alert("Developer Jobs")}>
        Create Alert
      </button>
      <p>Job operations implemented using useCallback.</p>
    </div>
  );
}