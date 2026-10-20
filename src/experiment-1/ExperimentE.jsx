import React, {
  useState,
  useMemo
} from "react";

function ExperimentE() {

  const [keyword, setKeyword] =
    useState("");

  const [savedJobs, setSavedJobs] =
    useState(2);

  const jobs = [
    "Frontend Developer",
    "Python Developer",
    "Cyber Security Analyst",
    "Cloud Engineer",
    "UI/UX Designer"
  ];

  const filteredJobs = useMemo(() => {

    return jobs.filter(job =>
      job
        .toLowerCase()
        .includes(
          keyword.toLowerCase()
        )
    );

  }, [keyword]);

  const applicationStats =
    useMemo(() => {

      return {
        matchingJobs:
          filteredJobs.length,

        savedJobs:
          savedJobs
      };

    }, [filteredJobs, savedJobs]);

  return (
    <div className="experiment-container">

      <h1>Experiment E - useMemo</h1>

      <input
        type="text"
        placeholder="Search jobs"
        value={keyword}
        onChange={(e) =>
          setKeyword(e.target.value)
        }
      />

      <div className="stats-container">

        <div className="stat-card">

          <h3>
            {applicationStats.matchingJobs}
          </h3>

          <p>
            Matching Jobs
          </p>

        </div>

        <div className="stat-card">

          <h3>
            {applicationStats.savedJobs}
          </h3>

          <p>
            Saved Jobs
          </p>

        </div>

      </div>

      <div className="job-list">

        {filteredJobs.map(
          (job, index) => (

            <div
              className="job-card"
              key={index}
            >

              <h3>{job}</h3>

            </div>

          )
        )}

      </div>

    </div>
  );
}

export default ExperimentE;