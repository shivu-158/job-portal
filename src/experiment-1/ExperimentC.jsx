import React, {
  useState,
  useEffect
} from "react";

function ExperimentC() {

  const [jobs, setJobs] =
    useState([]);

  const [keyword, setKeyword] =
    useState("");

  useEffect(() => {

    const jobData = [
      "Frontend Developer",
      "Python Developer",
      "Cyber Security Analyst",
      "Cloud Engineer"
    ];

    setJobs(jobData);

  }, []);

  const filteredJobs =
    jobs.filter(job =>
      job
        .toLowerCase()
        .includes(
          keyword.toLowerCase()
        )
    );

  return (
    <div className="experiment-container">

      <h1>Experiment C - useEffect</h1>

      <input
        type="text"
        placeholder="Search jobs"
        value={keyword}
        onChange={(e) =>
          setKeyword(e.target.value)
        }
      />

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

export default ExperimentC;