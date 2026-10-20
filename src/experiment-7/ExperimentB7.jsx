
import { useState } from "react";
import { createApplication } from "./api";

export default function ExperimentB7() {
  const [jobId, setJobId] = useState("1");
  const [applicant, setApplicant] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function apply() {
    if (!applicant.trim()) {
      setMessage("Enter your name.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await createApplication({
        jobId,
        applicant,
        status: "Submitted"
      });

      setMessage(`Application created: ${response.data.id}`);
    } catch {
      setMessage("Application failed. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section>
      <h2>Experiment 7B: Apply for a Job</h2>

      <input
        value={jobId}
        onChange={(e) => setJobId(e.target.value)}
        placeholder="Job ID"
      />

      <input
        value={applicant}
        onChange={(e) => setApplicant(e.target.value)}
        placeholder="Applicant name"
      />

      <button onClick={apply} disabled={loading}>
        {loading ? "Submitting..." : "Apply"}
      </button>

      <p role="status">{message}</p>
    </section>
  );
}
