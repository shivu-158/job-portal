import React, { useState } from "react";

function ExperimentB() {

  const [keyword, setKeyword] =
    useState("");

  const [saved, setSaved] =
    useState(0);

  const [selectedJob, setSelectedJob] =
    useState("No Job Selected");

  return (
    <div className="experiment-container">

      <h1>Experiment B - useState</h1>

      <div className="component-box">

        <h2>Job Search</h2>

        <input
          type="text"
          placeholder="Search job"
          value={keyword}
          onChange={(e) =>
            setKeyword(e.target.value)
          }
        />

        <p>
          Search Keyword: {keyword}
        </p>

      </div>

      <div className="component-box">

        <h2>Selected Job</h2>

        <select
          onChange={(e) =>
            setSelectedJob(e.target.value)
          }
        >

          <option>
            No Job Selected
          </option>

          <option>
            Frontend Developer
          </option>

          <option>
            Python Developer
          </option>

          <option>
            Cyber Security Analyst
          </option>

        </select>

        <p>
          Selected: {selectedJob}
        </p>

      </div>

      <div className="component-box">

        <h2>Saved Jobs</h2>

        <p>
          Saved Jobs: {saved}
        </p>

        <button
          onClick={() =>
            setSaved(saved + 1)
          }
        >
          Save Job
        </button>

      </div>

    </div>
  );
}

export default ExperimentB;