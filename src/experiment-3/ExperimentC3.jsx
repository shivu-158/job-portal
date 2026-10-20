import { useParams } from "react-router-dom";

const jobs = [
  {
    id: "101",
    title: "Frontend Developer",
    company: "TechNova",
    location: "Coimbatore",
    salary: "₹5 - ₹8 LPA"
  },
  {
    id: "102",
    title: "Python Developer",
    company: "CodeWorks",
    location: "Bangalore",
    salary: "₹4 - ₹7 LPA"
  },
  {
    id: "103",
    title: "Cyber Security Analyst",
    company: "SecureNet",
    location: "Chennai",
    salary: "₹6 - ₹10 LPA"
  }
];

export default function ExperimentC() {
  const { id } = useParams();

  const job = jobs.find(j => j.id === id);

  if (!job) {
    return <h2 className="page-container">Job not found</h2>;
  }

  return (
    <div className="page-container">
      <h2>{job.title}</h2>
      <p><b>Company:</b> {job.company}</p>
      <p><b>Location:</b> {job.location}</p>
      <p><b>Salary:</b> {job.salary}</p>
    </div>
  );
}