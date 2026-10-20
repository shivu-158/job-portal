import React, { useState } from "react";
import { useJobStore } from "../store/jobStore";
import { Page, JobOptions } from "./shared";
export default function ExperimentI6(){const jobs=useJobStore(s=>s.jobs),cache=useJobStore(s=>s.cacheJobDetail),getCache=useJobStore(s=>s.getCachedJobDetail);const [id,setId]=useState("");const [selected,setSelected]=useState(null);const [message,setMessage]=useState("");
const viewJob=(jobId)=>{const cached=getCache(jobId);if(cached){setSelected(cached);setMessage("Loaded from cache (valid for 10 minutes).");return;}const job=jobs.find(j=>j.id===jobId);if(job){cache(job);setSelected(job);setMessage("Loaded from store and cached for 10 minutes.");}};
return <Page letter="I" title="Cache Job Details" 
             aim="Cache frequently accessed job details with a time-to-live (TTL)." 
             algorithm={["Select a job.","Check whether a valid cached copy exists.","Use cached data when available; otherwise read the store and cache it.","Expire cached job details after ten minutes."]}>
                <JobOptions jobs={jobs} onSelect={id=>{setId(id);viewJob(id)}} />
                    {selected&&
                    <article className="exp6-detail">
                        <p className="exp6-chip">{message}</p>
                        <h2>{selected.title}</h2>
                        <p>{selected.company} · {selected.location}</p>
                        <p>Salary: ₹{selected.salary} LPA</p>
                        <p>Experience: {selected.experience}</p>
                        <button className="exp6-btn secondary" onClick={()=>viewJob(Number(id))}>Read again</button>
                    </article>}
        </Page>
}
