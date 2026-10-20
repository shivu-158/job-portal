
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
  headers: { "Content-Type": "application/json" }
});

// A. GET jobs
export const getJobs = async () => {
  console.log("A: GET Jobs - Request started");

  try {
    const response = await api.get("/jobs");
    console.log("A: GET Jobs - Result:", response.data);
    return response;
  } catch (error) {
    console.error("A: GET Jobs - Error:", error.message);
    throw error;
  }
};

// B. POST application
export const createApplication = async (data) => {
  console.log("B: POST Application - Request:", data);

  try {
    const response = await api.post("/applications", data);
    console.log("B: POST Application - Created:", response.data);
    return response;
  } catch (error) {
    console.error("B: POST Application - Error:", error.message);
    throw error;
  }
};

// C. PATCH application
export const updateApplication = async (id, data) => {
  console.log("C: PATCH Application - ID:", id, "Data:", data);

  try {
    const response = await api.patch(`/applications/${id}`, data);
    console.log("C: PATCH Application - Updated:", response.data);
    return response;
  } catch (error) {
    console.error("C: PATCH Application - Error:", error.message);
    throw error;
  }
};

// D. DELETE application
export const deleteApplication = async (id) => {
  console.log("D: DELETE Application - ID:", id);

  try {
    const response = await api.delete(`/applications/${id}`);
    console.log("D: DELETE Application - Success");
    return response;
  } catch (error) {
    console.error("D: DELETE Application - Error:", error.message);
    throw error;
  }
};

// E1. GET saved jobs
export const getSavedJobs = async () => {
  try {
    const response = await api.get("/savedJobs");
    console.log("E: GET Saved Jobs - Result:", response.data);
    return response;
  } catch (error) {
    console.error("E: GET Saved Jobs - Error:", error.message);
    throw error;
  }
};

// E2. GET application history
export const getApplications = async () => {
  try {
    const response = await api.get("/applications");
    console.log("E: GET Application History - Result:", response.data);
    return response;
  } catch (error) {
    console.error("E: GET Application History - Error:", error.message);
    throw error;
  }
};

export default api;
