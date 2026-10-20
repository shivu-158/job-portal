import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ExperimentH() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    resume: "",
    coverLetter: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.resume) {
      setError("Please fill all required fields.");
      return;
    }

    setError("");

    navigate("/application-confirmation");
  };

  return (
    <div className="page-container">
      <h2>Job Application</h2>

      <p>Applying for Job ID: {id}</p>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>

        <input
          name="name"
          placeholder="Applicant Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          name="resume"
          placeholder="Resume"
          value={form.resume}
          onChange={handleChange}
        />

        <textarea
          name="coverLetter"
          placeholder="Cover Letter"
          value={form.coverLetter}
          onChange={handleChange}
        />

        <button className="primary-btn">
          Submit Application
        </button>

      </form>
    </div>
  );
}