import { useState } from "react";

export function useApplications() {
  const [applications, setApplications] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [alerts, setAlerts] = useState([]);

  const saveJob = job => {
    setSavedJobs(prev => [...prev, job]);
  };

  const removeSavedJob = id => {
    setSavedJobs(prev => prev.filter(job => job.id !== id));
  };

  const applyJob = job => {
    setApplications(prev => [...prev, {
      jobId: job.id,
      title: job.title,
      status: "Applied"
    }]);
  };

  const withdrawApplication = id => {
    setApplications(prev =>
      prev.filter(app => app.jobId !== id)
    );
  };

  const createJobAlert = alert => {
    setAlerts(prev => [...prev, alert]);
  };

  return {
    applications,
    savedJobs,
    alerts,
    saveJob,
    removeSavedJob,
    applyJob,
    withdrawApplication,
    createJobAlert
  };
}