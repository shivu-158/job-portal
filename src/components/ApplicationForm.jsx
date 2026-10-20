import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useJobContext } from "../experiment-2/ExperimentC2";
import { validateApplication } from "../experiment-4/ExperimentE4";

export default function ApplicationForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    jobs,
    applications,
    applyJob
  } = useJobContext();

  const job = jobs.find(
    (item) => item.id === Number(id)
  );

  const alreadyApplied = applications.some(
    (item) => item.job.id === Number(id)
  );

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    resume: "",
    coverLetter: "",
    experience: ""
  });

  const [error, setError] = useState("");

  if (!job) {
    return (
      <div className="page-container">
        <h2>Job Not Found</h2>
      </div>
    );
  }

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationError = validateApplication(form);

    if (validationError) {
      setError(validationError);
      return;
    }

    applyJob(job, form);
    navigate(`/review/${job.id}`);
  };

  if (alreadyApplied) {
    return (
      <div className="page-container">
        <div className="empty-box">
          <h2>Already Applied</h2>

          <p>
            You have already applied for this job.
          </p>

          <Link
            to="/applications"
            className="primary-btn"
          >
            View Applications
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="application-form">
        <h1>Apply for {job.title}</h1>
        <p>{job.company}</p>

        {error && (
          <p className="error">{error}</p>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name *"
            value={form.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email *"
            value={form.email}
            onChange={handleChange}
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number *"
            value={form.phone}
            onChange={handleChange}
          />

          <input
            type="text"
            name="resume"
            placeholder="Resume Link *"
            value={form.resume}
            onChange={handleChange}
          />

          <input
            type="text"
            name="experience"
            placeholder="Experience *"
            value={form.experience}
            onChange={handleChange}
          />

          <textarea
            name="coverLetter"
            placeholder="Cover Letter *"
            value={form.coverLetter}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="primary-btn"
          >
            Review Application
          </button>
        </form>
      </div>
    </div>
  );
}
