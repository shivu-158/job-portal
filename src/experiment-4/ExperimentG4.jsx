import React from "react";

export function Button({
  children,
  onClick,
  type = "button"
}) {
  return (
    <button
      type={type}
      className="primary-btn"
      onClick={onClick}
    >
      {children}
    </button>
  );
}


export function Input({
  type = "text",
  placeholder,
  value,
  onChange
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}


export function JobCard({
  job,
  onView,
  onSave,
  isSaved = false
}) {
  return (
    <div className="job-card">

      <div className="job-icon">
        💼
      </div>

      <h3>{job.title}</h3>
      <p>{job.company}</p>
      <p>📍 {job.location}</p>
      <p>💰 ₹{job.salary} LPA</p>

      <div className="job-actions">

        <button
          type="button"
          className="primary-btn"
          onClick={onView}
        >
          View
        </button>

        <button
          type="button"
          className="primary-btn"
          onClick={onSave}
        >
          {isSaved ? "★ Saved" : "☆ Save"}
        </button>

      </div>

    </div>
  );
}

export function StatusBadge({
  status
}) {
  return (
    <span className="status-badge">
      {status}
    </span>
  );
}


export function ApplicationCard({
  application
}) {
  return (
    <div className="application-card">

      <h3>
        {application.job.title}
      </h3>

      <p>
        {application.job.company}
      </p>

      <StatusBadge
        status={application.status}
      />

    </div>
  );
}


export function JobAlertCard({
  alert,
  onRemove
}) {
  return (
    <div className="alert-card">

      <span>
        🔔 {alert}
      </span>

      <button
        className="secondary-btn"
        onClick={onRemove}
      >
        Remove
      </button>

    </div>
  );
}


export function Loading() {
  return (
    <div className="loading">
      Loading...
    </div>
  );
}


export default {
  Button,
  Input,
  JobCard,
  StatusBadge,
  ApplicationCard,
  JobAlertCard,
  Loading
};