
import { useState } from "react";
import {
  updateApplication,
  deleteApplication
} from "./api";

export default function ExperimentCD7() {
  const [id, setId] = useState("");
  const [status, setStatus] = useState("Reviewed");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function update() {
    if (!id.trim()) {
      setMessage("Enter an application ID.");
      return;
    }

    setLoading(true);
    try {
      await updateApplication(id, { status });
      setMessage("Application updated successfully.");
    } catch {
      setMessage("Update failed. Check the application ID.");
    } finally {
      setLoading(false);
    }
  }

  async function withdraw() {
    if (!id.trim()) {
      setMessage("Enter an application ID.");
      return;
    }

    setLoading(true);
    try {
      await deleteApplication(id);
      setMessage("Application withdrawn successfully.");
    } catch {
      setMessage("Withdrawal failed. Check the application ID.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section>
      <h2>Experiment 7C–D: Manage Application</h2>

      <input
        value={id}
        onChange={(e) => setId(e.target.value)}
        placeholder="Application ID"
      />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option>Reviewed</option>
        <option>Shortlisted</option>
        <option>Rejected</option>
      </select>

      <button onClick={update} disabled={loading}>
        Update Status
      </button>

      <button onClick={withdraw} disabled={loading}>
        Withdraw Application
      </button>

      <p role="status">{message}</p>
    </section>
  );
}
