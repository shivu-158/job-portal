import React from "react";
import { useJobStore } from "../store/jobStore";
import { Page, Empty } from "./shared";
export default function ExperimentE6(){const apps=useJobStore(s=>s.applications), withdraw=useJobStore(s=>s.withdrawApplication);
return <Page letter="E" title="Withdraw Applications" 
             aim="Remove a submitted application from global state." 
             algorithm={["Read the current application list.","Select Withdraw for an application.","Remove the record by job ID.","Update the list immediately."]}>
                {apps.length?
                <div className="exp6-list">{apps.map(a=>
                    <article className="exp6-row" key={a.jobId}>
                        <div><b>{a.title}</b>
                        <p>{a.company} · {a.status} · {a.appliedAt}</p>
                        </div>
                        <button className="exp6-btn danger" onClick={()=>withdraw(a.jobId)}>Withdraw</button>
                    </article>)}
                </div>:<Empty>No applications to withdraw. Apply for a job in Part D first.</Empty>}
        </Page>
        }
