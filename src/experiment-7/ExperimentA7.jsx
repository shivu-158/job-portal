
import { useEffect, useState } from "react";
import { getJobs } from "./api";

export default function ExperimentA7() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
  console.log("F: Loading jobs...");

  getJobs()
    .then((response) => {
      setJobs(response.data);
      console.log("F: Loading completed successfully");
    })
    .catch((error) => {
      setError("Unable to load jobs.");
      console.error("F: Loading failed:", error.message);
    })
    .finally(() => {
      setLoading(false);
      console.log("F: Loading state ended");
    });
}, []);
}