import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


// SearchBar
function SearchBar({ keyword, setKeyword }) {

  return (
    <input
      className="search-input"
      type="text"
      placeholder="Search jobs..."
      value={keyword}
      onChange={(e) =>
        setKeyword(e.target.value)
      }
    />
  );
}


// FilterPanel
function FilterPanel({
  location,
  setLocation,
  type,
  setType
}) {

  return (
    <div className="filter-panel">

      <select
        value={location}
        onChange={(e) =>
          setLocation(e.target.value)
        }
      >

        <option value="">
          All Locations
        </option>

        <option value="Coimbatore">
          Coimbatore
        </option>

        <option value="Chennai">
          Chennai
        </option>

        <option value="Bangalore">
          Bangalore
        </option>

        <option value="Mumbai">
          Mumbai
        </option>

        <option value="Hyderabad">
          Hyderabad
        </option>

      </select>

      <select
        value={type}
        onChange={(e) =>
          setType(e.target.value)
        }
      >

        <option value="">
          All Types
        </option>

        <option value="Full Time">
          Full Time
        </option>

        <option value="Part Time">
          Part Time
        </option>

        <option value="Remote">
          Remote
        </option>

      </select>

    </div>
  );
}


// JobCard
function JobCard({
  job,
  saveJob,
  viewJob
}) {

  return (
    <div className="job-card">

      <div className="job-icon">
        💼
      </div>

      <h3>{job.title}</h3>

      <p className="company">
        {job.company}
      </p>

      <p>
        📍 {job.location}
      </p>

      <p>
        💼 {job.type}
      </p>

      <p>
        💰 {job.salary}
      </p>

      <div className="job-actions">

        <button
          onClick={() => viewJob(job)}
        >
          View Details
        </button>

        <button
          className="save-btn"
          onClick={() => saveJob(job)}
        >
          ❤️ Save
        </button>

      </div>

    </div>
  );
}


// JobList
function JobList({
  jobs,
  saveJob,
  viewJob
}) {

  return (
    <div className="job-list">

      {jobs.length === 0 ? (

        <p>No jobs found.</p>

      ) : (

        jobs.map(job => (

          <JobCard
            key={job.id}
            job={job}
            saveJob={saveJob}
            viewJob={viewJob}
          />

        ))

      )}

    </div>
  );
}


// JobDetail
function JobDetail({
  job,
  setJob
}) {

  if (!job) {
    return null;
  }

  return (
    <div className="job-detail-box">

      <h2>{job.title}</h2>

      <p>
        Company: {job.company}
      </p>

      <p>
        Location: {job.location}
      </p>

      <p>
        Category: {job.category}
      </p>

      <p>
        Salary: {job.salary}
      </p>

      <button
        onClick={() => setJob(null)}
      >
        Close Details
      </button>

    </div>
  );
}


// ApplicationForm
function ApplicationForm({ job }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const submitApplication = (e) => {

    e.preventDefault();

    alert(
      `Application submitted for ${job?.title}`
    );

  };

  return (
    <form
      className="application-form"
      onSubmit={submitApplication}
    >

      <h2>Application Form</h2>

      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
        required
      />

      <input
        type="email"
        placeholder="Your Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
        required
      />

      <button type="submit">
        Apply
      </button>

    </form>
  );
}



// Home
function HomeComponent() {

  return (
    <div className="component-box">

      <h2>Welcome to Job Portal</h2>

      <p>
        Find and apply for your dream job.
      </p>

    </div>
  );
}

// Main Experiment A
function ExperimentA({
  jobs = [],
  savedJobs = [],
  saveJob = () => {}
}) {

  const navigate = useNavigate();

  const [keyword, setKeyword] =
    useState("");

  const [location, setLocation] =
    useState("");

  const [type, setType] =
    useState("");

  const [selectedJob, setSelectedJob] =
    useState(null);

  const filteredJobs = jobs.filter(job => {

    const keywordMatch =
      job.title
        .toLowerCase()
        .includes(
          keyword.toLowerCase()
        );

    const locationMatch =
      location === "" ||
      job.location === location;

    const typeMatch =
      type === "" ||
      job.type === type;

    return (
      keywordMatch &&
      locationMatch &&
      typeMatch
    );

  });

  const viewJob = (job) => {

    setSelectedJob(job);

  };

  return (
    <div className="experiment-container">

      <HomeComponent />

      <div className="search-section">

        <SearchBar
          keyword={keyword}
          setKeyword={setKeyword}
        />

        <FilterPanel
          location={location}
          setLocation={setLocation}
          type={type}
          setType={setType}
        />

      </div>

      <JobList
        jobs={filteredJobs}
        saveJob={saveJob}
        viewJob={viewJob}
      />

      <JobDetail
        job={selectedJob}
        setJob={setSelectedJob}
      />

      <ApplicationForm
        job={selectedJob}
      />

      <button
        className="primary-btn"
        onClick={() =>
          navigate("/jobs")
        }
      >
        Go to Jobs Page
      </button>

    </div>
  );
}

export default ExperimentA;