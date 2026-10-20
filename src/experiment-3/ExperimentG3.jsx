import { useNavigate, useParams } from "react-router-dom";

export default function ExperimentG() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="page-container">
      <h2>Application Process</h2>

      <p>Applying for Job ID: {id}</p>

      <button
        className="primary-btn"
        onClick={() => navigate(`/apply/${id}`)}
      >
        Start Application
      </button>
    </div>
  );
}