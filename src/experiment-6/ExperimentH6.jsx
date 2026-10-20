import React from "react";
import { useJobStore } from "../store/jobStore";
import { Page, Empty } from "./shared";
export default function ExperimentH6(){const history=useJobStore(s=>s.actionHistory),saved=useJobStore(s=>s.savedJobs),apps=useJobStore(s=>s.applications),alerts=useJobStore(s=>s.alerts);
return <Page letter="H" 
             title="Middleware and Action Monitor" 
             aim="Monitor global state operations using logging middleware and an action history." 
             algorithm={["Wrap Zustand state updates with actionLogger middleware.","Log previous and next state in the browser console.","Record user-friendly save/apply/alert actions.","Display recent actions on this page."]}>
                <div className="exp6-stats">{[["Saved",saved.length],["Applications",apps.length],["Alerts",alerts.length]].map(([k,v])=><article className="exp6-stat" key={k}>
                    <span>{k}</span>
                    <strong>{v}</strong>
                    </article>)}
                </div>
                <h3>Recent application actions</h3>
                {history.length?
                <ol className="exp6-history">{history.map((item,i)=>
                    <li key={`${item}-${i}`}>{item}</li>)}
                </ol>:<Empty>Use the save, apply, alert or profile pages to generate actions. Detailed state logs appear in the browser console.</Empty>}
        </Page>
}
