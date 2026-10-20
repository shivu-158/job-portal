import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const starterJobs = [
  { id: 1, title: "Frontend Developer", company: "TechNova", location: "Coimbatore", salary: 7, experience: "Fresher" },
  { id: 2, title: "Cyber Security Analyst", company: "SecureNet", location: "Chennai", salary: 9, experience: "1-3 Years" },
  { id: 3, title: "Python Developer", company: "CodeWorks", location: "Bangalore", salary: 8, experience: "Fresher" },
  { id: 4, title: "UI/UX Designer", company: "Creative Studio", location: "Mumbai", salary: 6, experience: "1-3 Years" },
  { id: 5, title: "Cloud Engineer", company: "CloudTech", location: "Hyderabad", salary: 11, experience: "3-5 Years" }
];

// Middleware: logs every state-changing action for Experiment 6(e).

const actionLogger = (config) => (set, get, api) =>
  config(
    (partial, replace, actionName) => {
      const previous = get();

      set(partial, replace);

      const next = get();

      console.group(
        `%c[Experiment 6] ${actionName || "Store Updated"}`,
        "color: #7c3aed; font-weight: bold;"
      );

      console.log("Time:", new Date().toLocaleString());
      console.log("Previous State:", previous);
      console.log("Updated State:", next);
      console.log("Action History:", next.actionHistory);

      console.groupEnd();
    },
    get,
    api
  );


export const useJobStore = create(
  persist(
    actionLogger((set, get) => ({
      jobs: starterJobs,
      savedJobs: [],
      applications: [],
      alerts: [],
      profile: { name: "Job Seeker", email: "student@example.com", location: "Coimbatore" },
      actionHistory: [],
      searchCache: {},
      detailCache: {},

      addJob: (job) => set((s) => ({ jobs: [...s.jobs.filter((j) => j.id !== job.id), job] })),
      saveJob: (id) => set((s) => {
        const job = s.jobs.find((j) => j.id === Number(id));
        if (!job || s.savedJobs.some((j) => j.id === job.id)) return s;
        return { savedJobs: [...s.savedJobs, job], actionHistory: [`Saved ${job.title}`, ...s.actionHistory].slice(0, 30) };
      }),
      removeSavedJob: (id) => set((s) => ({ savedJobs: s.savedJobs.filter((j) => j.id !== Number(id)), actionHistory: [`Removed saved job #${id}`, ...s.actionHistory].slice(0, 30) })),
      applyForJob: (id) => set((s) => {
        const job = s.jobs.find((j) => j.id === Number(id));
        if (!job || s.applications.some((a) => a.jobId === job.id)) return s;
        return { applications: [...s.applications, { jobId: job.id, title: job.title, company: job.company, status: "Submitted", appliedAt: new Date().toLocaleString() }], actionHistory: [`Applied for ${job.title}`, ...s.actionHistory].slice(0, 30) };
      }),
      withdrawApplication: (id) => set((s) => ({ applications: s.applications.filter((a) => a.jobId !== Number(id)), actionHistory: [`Withdrew application #${id}`, ...s.actionHistory].slice(0, 30) })),
      addAlert: (keyword) => set((s) => {
        const value = keyword.trim();
        if (!value || s.alerts.some((a) => a.keyword.toLowerCase() === value.toLowerCase())) return s;
        return { alerts: [...s.alerts, { id: Date.now(), keyword: value, createdAt: new Date().toLocaleDateString() }], actionHistory: [`Created alert: ${value}`, ...s.actionHistory].slice(0, 30) };
      }),
      removeAlert: (id) => set((s) => ({ alerts: s.alerts.filter((a) => a.id !== Number(id)), actionHistory: [`Removed alert #${id}`, ...s.actionHistory].slice(0, 30) })),
      updateProfile: (patch) => set((s) => ({ profile: { ...s.profile, ...patch }, actionHistory: ["Updated profile", ...s.actionHistory].slice(0, 30) })),
      cacheSearch: (key, results) => set((s) => ({ searchCache: { ...s.searchCache, [key]: { results, cachedAt: Date.now() } } })),
      getCachedSearch: (key) => {
        const item = get().searchCache[key];
        return item && Date.now() - item.cachedAt < 5 * 60 * 1000 ? item.results : null;
      },
      cacheJobDetail: (job) => set((s) => ({ detailCache: { ...s.detailCache, [job.id]: { job, cachedAt: Date.now() } } })),
      getCachedJobDetail: (id) => {
        const item = get().detailCache[Number(id)];
        return item && Date.now() - item.cachedAt < 10 * 60 * 1000 ? item.job : null;
      }
    })),
    { name: "job-portal-experiment-6", storage: createJSONStorage(() => localStorage), partialize: (s) => ({ savedJobs: s.savedJobs, applications: s.applications, alerts: s.alerts, profile: s.profile, actionHistory: s.actionHistory, searchCache: s.searchCache, detailCache: s.detailCache }) }
  )
);
