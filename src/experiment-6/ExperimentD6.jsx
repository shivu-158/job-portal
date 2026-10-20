import React from "react";
import { useJobStore } from "../store/jobStore";
import { Page, Empty } from "./shared";
export default function ExperimentD6(){const jobs=useJobStore(s=>s.jobs), apps=useJobStore(s=>s.applications), apply=useJobStore(s=>s.applyForJob);
return <Page letter="D" title="Apply for a Job" aim="Create an application record in the global store." algorithm={["Display available jobs.","Check whether the job has already been applied for.","Add an application with Submitted status.","Show the application list."]}>
           <div className="exp6-list">{jobs.map(j=><article className="exp6-row" key={j.id}>
                <div><b>{j.title}</b>
                   <p>{j.company} · {j.location}</p>
                </div>
                <button className="exp6-btn" disabled={apps.some(a=>a.jobId===j.id)} onClick={()=>apply(j.id)}>{apps.some(a=>a.jobId===j.id)?"Applied":"Apply"}</button>
            </article>)}
            </div>
        <h3>Applications ({apps.length})</h3>
        {apps.length?apps.map(a=><p key={a.jobId}>{a.title} — {a.status}</p>):<Empty>No applications submitted yet.</Empty>}
        </Page>
        }
