import { Outlet, NavLink } from "react-router-dom";

export default function ExperimentE() {
  return (
    <div className="dashboard">
      <h2>Applicant Dashboard</h2>

      <div className="dashboard-links">
        <NavLink to="/dashboard/applications">
          Applications
        </NavLink>

        <NavLink to="/dashboard/saved-jobs">
          Saved Jobs
        </NavLink>

        <NavLink to="/dashboard/job-alerts">
          Job Alerts
        </NavLink>

        <NavLink to="/dashboard/profile">
          Profile
        </NavLink>
      </div>

      <Outlet />
    </div>
  );
}