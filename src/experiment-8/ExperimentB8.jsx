
import { useState } from "react";
import {
  getProtectedData,
  createProtectedData,
  logout
} from "./authApi";

export default function ExperimentB8() {
  const [output, setOutput] = useState("");

  async function testProtectedRequest() {
    try {
      const response = await getProtectedData("applications");
      console.log("[8C] Protected response:", response.data);
      setOutput(JSON.stringify(response.data, null, 2));
    } catch (error) {
      setOutput(error.response?.data?.message || error.message);
    }
  }

  async function addApplication() {
    try {
      const response = await createProtectedData("applications", {
        jobId: 1,
        title: "Frontend Developer",
        status: "Submitted"
      });

      console.log("[8D] Application created:", response.data);
      setOutput(JSON.stringify(response.data, null, 2));
    } catch (error) {
      setOutput(error.response?.data?.message || error.message);
    }
  }

  function handleLogout() {
    logout();
    setOutput("Logged out. Try a protected request again.");
  }

  return (
    <section>
      <h2>Experiment 8: Protected Operations</h2>

      <button onClick={testProtectedRequest}>
        C. Get Applications
      </button>

      <button onClick={addApplication}>
        D. Create Application
      </button>

      <button onClick={handleLogout}>
        E. Logout
      </button>

      <pre>{output}</pre>
    </section>
  );
}
