import React from "react";
import { Link } from "react-router-dom";

function ExperimentH4() {

  return (
    <div className="page-container">

      <h1>Application Flow</h1>

      <div className="flow-box">

        <p>🔐 Login</p>
        <span>↓</span>

        <p>🏠 Home</p>
        <span>↓</span>

        <p>🔎 Job Search</p>
        <span>↓</span>

        <p>📄 Job Details</p>
        <span>↓</span>

        <p>📝 Apply for Job</p>
        <span>↓</span>

        <p>📋 Application Review</p>
        <span>↓</span>

        <p>✅ Confirmation</p>
        <span>↓</span>

        <p>📊 Dashboard</p>

      </div>

      <Link
        to="/jobs"
        className="primary-btn"
      >
        Start Job Search
      </Link>

    </div>
  );
}

export default ExperimentH4;