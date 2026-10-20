import React from "react";
import { Link } from "react-router-dom";
import { Page } from "./shared";
const parts = [
  ["A", "Global store", "/experiment-6/a", "Shared Zustand state"],
  ["B", "Jobs and search cache", "/experiment-6/b", "Read jobs and cache searches"],
  ["C", "Save / remove jobs", "/experiment-6/c", "Saved jobs operations"],
  ["D", "Apply for jobs", "/experiment-6/d", "Create application records"],
  ["E", "Withdraw applications", "/experiment-6/e", "Remove application records"],
  ["F", "Job alerts", "/experiment-6/f", "Create and remove alerts"],
  ["G", "Profile", "/experiment-6/g", "Edit global profile data"],
  ["H", "Middleware monitor", "/experiment-6/h", "Review logged state actions"],
  ["I", "Job detail cache", "/experiment-6/i", "Cache frequently viewed jobs"]
];
export default function Experiment6Home(){return <Page letter="A–I" title="Experiment 6: State Management" aim="Explore nine small pages demonstrating global state, operations, middleware and caching." algorithm={["Open a part using its card.","Perform an operation on the page.","See shared state update immediately.","Refresh to verify persisted state."]}><div className="exp6-grid">{parts.map(([letter,title,path,desc])=><Link className="exp6-part" to={path} key={letter}><span>PART {letter}</span><h3>{title}</h3><p>{desc}</p><b>Open page →</b></Link>)}</div></Page>}
