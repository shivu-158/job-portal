import React, {
  useState,
  useCallback
} from "react";

function ExperimentF() {

  const [savedJobs, setSavedJobs] =
    useState([]);

  const [applications, setApplications] =
    useState([]);

  const [profile, setProfile] =
    useState("Shivani");

  const saveJob = useCallback(() => {

    setSavedJobs(previous => [
      ...previous,
      "Frontend Developer"
    ]);

  }, []);

  const removeSavedJob =
    useCallback(() => {

      setSavedJobs(previous =>
        previous.slice(0, -1)
      );

    }, []);

  const applyJob =
    useCallback(() => {

      setApplications(previous => [
        ...previous,
        "Frontend Developer"
      ]);

    }, []);

  const updateProfile =
    useCallback(() => {

      setProfile("Shivani R");

    }, []);

  const createJobAlert =
    useCallback(() => {

      alert(
        "Job Alert Created Successfully!"
      );

    }, []);

  return (
    <div className="experiment-container">

      <h1>
        Experiment F - useCallback
      </h1>

      <div className="component-box">

        <h2>Job Operations</h2>

        <button onClick={saveJob}>
          Save Job
        </button>

        <button
          onClick={removeSavedJob}
        >
          Remove Saved Job
        </button>

        <button onClick={applyJob}>
          Apply Job
        </button>

        <button
          onClick={updateProfile}
        >
          Update Profile
        </button>

        <button
          onClick={createJobAlert}
        >
          Create Job Alert
        </button>

      </div>

      <div className="stats-container">

        <div className="stat-card">

          <h3>
            {savedJobs.length}
          </h3>

          <p>Saved Jobs</p>

        </div>

        <div className="stat-card">

          <h3>
            {applications.length}
          </h3>

          <p>Applications</p>

        </div>

      </div>

      <div className="component-box">

        <h3>
          Profile: {profile}
        </h3>

      </div>

    </div>
  );
}

export default ExperimentF;