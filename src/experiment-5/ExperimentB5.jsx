import { useEffect, useState } from "react";

export default function ExperimentB5() {
  const [jobs, setJobs] = useState([]);
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [experience, setExperience] = useState("");

  useEffect(() => {
    async function loadJobs() {
      try {
        const res = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        if (!res.ok) throw new Error("Could not load jobs");
        const data = await res.json();
        console.log("Experiment 5 - Part B: API Response");
        console.log(data);
        setJobs(data.map((u, i) => ({
          id: u.id,
          title: ["Developer", "Designer", "Analyst"][i % 3],
          company: u.company.name,
          location: u.address.city,
          salary: 5 + i,
          experience: i === 0 ? "Fresher" : "Experienced"
        })));
      } catch (err) {
        console.error(err);
      }
    }
    loadJobs();
  }, []);

  const filtered = jobs.filter(job =>
    job.title.toLowerCase().includes(title.toLowerCase()) &&
    job.company.toLowerCase().includes(company.toLowerCase()) &&
    job.location.toLowerCase().includes(location.toLowerCase()) &&
    (!salary || job.salary >= Number(salary)) &&
    (!experience || job.experience === experience)
  );
  useEffect(() => {
  console.log("Experiment 5 - Part B: Filter Values", {
    title,
    company,
    location,
    salary,
    experience
  });

  console.log("Filtered Job Results:", filtered);
  console.log("Number of matching jobs:", filtered.length);
}, [title, company, location, salary, experience, jobs]);

  return (
    <section className="page">
      <h1>Filter Jobs</h1>

      <input placeholder="Job title" value={title}
        onChange={e => setTitle(e.target.value)} />
      <input placeholder="Company" value={company}
        onChange={e => setCompany(e.target.value)} />
      <input placeholder="Location" value={location}
        onChange={e => setLocation(e.target.value)} />

      <select value={salary} onChange={e => setSalary(e.target.value)}>
        <option value="">Any salary</option>
        <option value="5">₹5 LPA+</option>
        <option value="8">₹8 LPA+</option>
        <option value="10">₹10 LPA+</option>
      </select>

      <select value={experience}
        onChange={e => setExperience(e.target.value)}>
        <option value="">Any experience</option>
        <option value="Fresher">Fresher</option>
        <option value="Experienced">Experienced</option>
      </select>

      {filtered.length ? filtered.map(job => (
        <article className="job-card" key={job.id}>
          <h3>{job.title}</h3>
          <p>{job.company} · {job.location}</p>
          <p>₹{job.salary} LPA · {job.experience}</p>
        </article>
      )) : <p>No matching jobs found.</p>}
    </section>
  );
}