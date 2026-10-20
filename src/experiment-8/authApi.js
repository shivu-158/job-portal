
import axios from "axios";

const authApi = axios.create({
  baseURL: "http://localhost:3002"
});

// C: Attach token to protected API requests
authApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  console.log("[8C] API request:", config.method, config.url);
  console.log("[8C] Token attached:", Boolean(token));

  return config;
});

// F: Handle unauthorized and expired-token responses
authApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error(
        "[8F] Unauthorized:",
        error.response.data.message
      );

      localStorage.removeItem("authToken");
      localStorage.removeItem("authUser");

      console.warn("[8F] Token removed. Please log in again.");
    } else {
      console.error("[8F] API error:", error.message);
    }

    return Promise.reject(error);
  }
);

// A and B: Login and store token
export async function login(email, password) {
  console.log("[8A] Login requested:", email);

  const response = await axios.post(
    "http://localhost:3002/login",
    { email, password }
  );

  localStorage.setItem("authToken", response.data.token);
  localStorage.setItem(
    "authUser",
    JSON.stringify(response.data.user)
  );

  console.log("[8B] Token saved in Local Storage");
  console.log("[8B] User:", response.data.user);

  return response.data;
}

// D: Protected operations
export const getProtectedData = (resource) =>
  authApi.get(`/protected/${resource}`);

export const createProtectedData = (resource, data) =>
  authApi.post(`/protected/${resource}`, data);

export const updateProtectedData = (resource, id, data) =>
  authApi.patch(`/protected/${resource}/${id}`, data);

export const deleteProtectedData = (resource, id) =>
  authApi.delete(`/protected/${resource}/${id}`);

// E: Logout and token removal
export function logout() {
  localStorage.removeItem("authToken");
  localStorage.removeItem("authUser");

  console.log("[8E] Logged out successfully");
  console.log("[8E] Authentication token removed");
}

export default authApi;
