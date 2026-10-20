import { Link, NavLink } from "react-router-dom";

export default function ExperimentB() {
  return (
    <div className="page-container">
      <h2>Navigation</h2>

      <div className="nav-buttons">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/jobs">Jobs</NavLink>
        <NavLink to="/saved-jobs">Saved Jobs</NavLink>
        <NavLink to="/applications">Applications</NavLink>
      </div>

      <Link to="/profile" className="primary-btn">
        Go to Profile
      </Link>
    </div>
  );
}