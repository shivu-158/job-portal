import React from "react";
import { useNavigate } from "react-router-dom";

function ExperimentD4() {

  const navigate = useNavigate();

  return (
    <div className="page-container">

      <h2>Authentication Successful</h2>

      <p>
        Redirecting to your requested page...
      </p>

      <button
        className="primary-btn"
        onClick={() => navigate("/dashboard")}
      >
        Open Dashboard
      </button>

    </div>
  );
}

export default ExperimentD4;