import { Outlet } from "react-router-dom";

export default function ExperimentF() {
  return (
    <div className="page-container">
      <h2>Dashboard Content</h2>

      <p>Select an option from the dashboard.</p>

      <Outlet />
    </div>
  );
}