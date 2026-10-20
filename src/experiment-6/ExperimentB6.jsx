import React, { useEffect, useMemo, useState } from "react";
import { useJobStore } from "../store/jobStore";
import { Page } from "./shared";
export default function ExperimentB6() {
 const jobs=useJobStore(s=>s.jobs), cache=useJobStore(s=>s.cacheSearch), getCache=useJobStore(s=>s.getCachedSearch); const [q,setQ]=useState("");
 const key=q.trim().toLowerCase();
 const results=useMemo(()=>jobs.filter(j=>`${j.title} ${j.company} ${j.location}`.toLowerCase().includes(key)),[jobs,key]);
 useEffect(()=>{cache(key,results);},[key,results,cache]);

 return <Page letter="B" title="Manage Jobs and Search Cache" aim="Read jobs from the global store and cache repeated searches." algorithm={["Read jobs from Zustand.","Filter by job title, company or location.","Cache each search result for five minutes.","Display matching jobs."]}><label className="exp6-label">Search title, company or location<input className="exp6-input" value={q} onChange={e=>setQ(e.target.value)} placeholder="e.g. Python or Chennai" /></label><p className="exp6-chip">{getCache(key) ? "A valid cached search exists" : "Search results are cached for five minutes"}</p><div className="exp6-list">{results.map(j=><article className="exp6-row" key={j.id}><div><b>{j.title}</b><p>{j.company} · {j.location} · ₹{j.salary} LPA · {j.experience}</p></div><span className="exp6-chip">ID {j.id}</span></article>)}</div></Page>;
}
