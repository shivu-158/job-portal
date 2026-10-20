
import { useParams, Link } from "react-router-dom";
import { useJobContext } from "../experiment-2/ExperimentC2";

export default function JobDetail() {
  const { id } = useParams();

  const {
    jobs,
    saved,
    saveJob,
    removeSavedJob
  } = useJobContext();

  const job = jobs.find(
    (item) => item.id === Number(id)
  );

  if (!job) {
    return (
      <div className="page-container">
        <h2>Job Not Found</h2>

        <Link to="/jobs" className="primary-btn">
          Back to Jobs
        </Link>
      </div>
    );
  }

  const isSaved = saved.some(
    (item) => item.id === job.id
  );

  return (
    <div className="page-container">
      <div className="job-detail">
        <div className="job-icon">💼</div>

        <h1>{job.title}</h1>
        <h3>{job.company}</h3>

        <p>📍 {job.location}</p>
        <p>💰 ₹{job.salary} LPA</p>
        <p>🏢 Industry: {job.industry}</p>
        <p>💼 Experience: {job.experience}</p>
        <p>⏰ Job Type: {job.type}</p>

        <h3>Required Skills</h3>
        <p>{job.skills}</p>

        <h3>Job Description</h3>
        <p>
          This position provides an opportunity
          to work on real-world projects and
          develop technical and professional skills.
        </p>

        <div className="job-actions">
          <button
            className="primary-btn"
            onClick={() => {
              if (isSaved) {
                removeSavedJob(job.id);
              } else {
                saveJob(job);
              }
            }}
          >
            {isSaved ? "★ Saved" : "☆ Save Job"}
          </button>

          <Link
            to={`/apply/${job.id}`}
            className="primary-btn"
          >
            Apply Now
          </Link>
        </div>
      </div>
    </div>
  );
}
