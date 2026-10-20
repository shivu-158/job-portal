import { useParams, Link } from "react-router-dom";

export default function ExperimentD() {
  const { id } = useParams();

  const job = {
    title: "Cyber Security Analyst",
    company: "SecureNet",
    location: "Chennai",
    salary: "₹6 - ₹10 LPA",
    industry: "Cyber Security",
    experience: "1-3 Years",
    type: "Full Time",
    description: "Protect systems and analyze security threats.",
    skills: "Python, Networking, Linux, Cyber Security"
  };

  return (
    <div className="page-container">
      <h2>{job.title}</h2>

      <p><b>Job ID:</b> {id}</p>
      <p><b>Company:</b> {job.company}</p>
      <p><b>Location:</b> {job.location}</p>
      <p><b>Salary:</b> {job.salary}</p>
      <p><b>Industry:</b> {job.industry}</p>
      <p><b>Experience:</b> {job.experience}</p>
      <p><b>Job Type:</b> {job.type}</p>
      <p><b>Description:</b> {job.description}</p>
      <p><b>Required Skills:</b> {job.skills}</p>

      <Link to={`/apply/${id}`} className="primary-btn">
        Apply Now
      </Link>
    </div>
  );
}