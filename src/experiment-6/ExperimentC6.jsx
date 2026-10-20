import React from "react";
import { useJobStore } from "../store/jobStore";
import { Page, Empty } from "./shared";
export default function ExperimentC6(){const jobs=useJobStore(s=>s.jobs), saved=useJobStore(s=>s.savedJobs), save=useJobStore(s=>s.saveJob), remove=useJobStore(s=>s.removeSavedJob);
return <Page letter="C" title="Save and Remove Jobs" 
             aim="Manage saved jobs globally." 
             algorithm={["Show available jobs.","Save a job by its ID.","Remove a saved job when requested.","Persist the saved list in localStorage."]}>
                <div className="exp6-list">{jobs.map(j=><article className="exp6-row" key={j.id}>
                    <div><b>{j.title}</b>
                    <p>{j.company} · {j.location}</p>
                    </div>{saved.some(s=>s.id===j.id)?<button className="exp6-btn secondary" onClick={()=>remove(j.id)}>Remove saved</button>
                    :<button className="exp6-btn" onClick={()=>save(j.id)}>☆ Save job</button>}
                    </article>)}
                </div><h3>Saved jobs ({saved.length})
                    </h3>{saved.length?saved.map(j=>
                    <p key={j.id}>♥ {j.title} — {j.company}</p>):
                    <Empty>No saved jobs. Click “Save job” above.</Empty>}
            </Page>}
