import React, { useState } from "react";
import { useJobStore } from "../store/jobStore";
import { Page, Empty } from "./shared";
export default function ExperimentF6(){const [keyword,setKeyword]=useState("");const alerts=useJobStore(s=>s.alerts), add=useJobStore(s=>s.addAlert), remove=useJobStore(s=>s.removeAlert);
return <Page letter="F" title="Job Alerts" 
             aim="Create and remove job alert keywords using the global store." 
             algorithm={["Enter a job keyword.","Validate that it is not empty or duplicated.","Add the alert to global state.","Allow existing alerts to be removed."]}>
                <form className="exp6-form" onSubmit={e=>{e.preventDefault();add(keyword);setKeyword("")}}>
                    <label className="exp6-label">Alert keyword<input className="exp6-input" value={keyword} onChange={e=>setKeyword(e.target.value)} placeholder="e.g. React Developer" />
                    </label>
                    <button className="exp6-btn">Create alert</button>
                </form>
                    <h3>Active alerts ({alerts.length})</h3>
                    {alerts.length?
                    <div className="exp6-list">{alerts.map(a=>
                    <article className="exp6-row" key={a.id}>
                        <div><b>{a.keyword}</b>
                        <p>Created {a.createdAt}</p>
                        </div>
                        <button className="exp6-btn danger" onClick={()=>remove(a.id)}>Remove</button>
                    </article>)}
                    </div>:<Empty>No alerts created yet.</Empty>}
            </Page>
            }
