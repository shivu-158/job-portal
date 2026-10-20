import React from "react";
import { useJobStore } from "../store/jobStore";
import { Page } from "./shared";
export default function ExperimentA6() {
  const jobs = useJobStore(s => s.jobs), saved = useJobStore(s => s.savedJobs), apps = useJobStore(s => s.applications), alerts = useJobStore(s => s.alerts), profile = useJobStore(s => s.profile);
  return <Page letter="A" title="Global Job Portal Store" aim="Create a global store shared by all job portal pages." algorithm={["Create the Zustand store.","Read jobs, saved jobs, applications, alerts and profile from the store.","Display shared state counts."]}><div className="exp6-stats">{[["Jobs",jobs.length],["Saved",saved.length],["Applications",apps.length],["Alerts",alerts.length]].map(([k,v])=><article className="exp6-stat" key={k}><span>{k}</span><strong>{v}</strong></article>)}</div><p>Welcome, <b>{profile.name}</b>. This page reads global state.</p></Page>;
}
