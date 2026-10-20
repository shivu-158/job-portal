import React from "react";
import { Link } from "react-router-dom";

export function Page({ letter, title, aim, algorithm, children }) {
  return <main className="exp6-page"><div className="exp6-heading"><p className="exp6-kicker">EXPERIMENT 6 · PART {letter}</p><h1>{title}</h1><p className="exp6-aim"><b>Aim:</b> {aim}</p><details className="exp6-algorithm"><summary>Algorithm</summary><ol>{algorithm.map((step, i) => <li key={i}>{step}</li>)}</ol></details></div><section className="exp6-panel">{children}</section><nav className="exp6-pager"><Link to="/">← Home</Link><Link to="/experiment-6">Experiment 6 overview</Link></nav></main>;
}
export function JobOptions({ jobs, onSelect, label = "Choose a job" }) {
  return <label className="exp6-label">{label}<select className="exp6-input" onChange={(e) => onSelect(Number(e.target.value))} defaultValue=""><option value="" disabled>Select job</option>{jobs.map((j) => <option key={j.id} value={j.id}>{j.title} — {j.company}</option>)}</select></label>;
}
export function Empty({ children = "No records yet." }) { return <p className="exp6-empty">{children}</p>; }
