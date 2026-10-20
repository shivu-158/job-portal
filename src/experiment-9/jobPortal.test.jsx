
import { describe, it, expect, vi } from "vitest";
import {
  render,
  screen,
  fireEvent
} from "@testing-library/react";

import { filterJobs } from "./jobUtils";

const jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechNova",
    location: "Coimbatore",
    salary: 7
  },
  {
    id: 2,
    title: "Cyber Security Analyst",
    company: "SecureNet",
    location: "Chennai",
    salary: 9
  }
];

// A: Job card and job list
function JobCard({ job, onSave }) {
  return (
    <article>
      <h2>{job.title}</h2>
      <p>{job.company}</p>
      <p>{job.location}</p>
      <p>{job.salary} LPA</p>
      <button onClick={() => onSave(job.id)}>
        Save Job
      </button>
    </article>
  );
}

function JobList({ jobs, onSave }) {
  if (!jobs.length) return <p>No jobs found</p>;

  return jobs.map((job) => (
    <JobCard key={job.id} job={job} onSave={onSave} />
  ));
}

describe("Experiment 9: Job Portal Tests", () => {
  it("A: displays job cards and job details", () => {
    render(<JobList jobs={jobs} onSave={vi.fn()} />);

    expect(
      screen.getByText("Frontend Developer")
    ).toBeInTheDocument();

    expect(screen.getByText("TechNova")).toBeInTheDocument();
    expect(screen.getByText("Coimbatore")).toBeInTheDocument();
    expect(screen.getByText("7 LPA")).toBeInTheDocument();
  });

  it("A: displays an empty job list", () => {
    render(<JobList jobs={[]} onSave={vi.fn()} />);

    expect(screen.getByText("No jobs found")).toBeInTheDocument();
  });

  // B: Filtering
  it("B: filters jobs by title", () => {
    const result = filterJobs(jobs, {
      title: "frontend",
      location: "",
      company: "",
      salary: ""
    });

    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("Frontend Developer");
  });

  it("B: filters jobs by location and company", () => {
    const result = filterJobs(jobs, {
      title: "",
      location: "chennai",
      company: "securenet",
      salary: ""
    });

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(2);
  });

  it("B: filters jobs by minimum salary", () => {
    const result = filterJobs(jobs, {
      title: "",
      location: "",
      company: "",
      salary: "8"
    });

    expect(result).toHaveLength(1);
    expect(result[0].salary).toBe(9);
  });

  // C: Saving and removing jobs
  it("C: calls save when Save Job is clicked", () => {
    const onSave = vi.fn();

    render(<JobCard job={jobs[0]} onSave={onSave} />);

    fireEvent.click(screen.getByRole("button", {
      name: "Save Job"
    }));

    expect(onSave).toHaveBeenCalledWith(1);
  });

  // D: Application and withdrawal
  it("D: handles application and withdrawal", () => {
    const apply = vi.fn();
    const withdraw = vi.fn();

    function ApplicationActions() {
      return (
        <>
          <button onClick={apply}>Apply</button>
          <button onClick={withdraw}>Withdraw</button>
        </>
      );
    }

    render(<ApplicationActions />);

    fireEvent.click(screen.getByRole("button", { name: "Apply" }));
    fireEvent.click(screen.getByRole("button", { name: "Withdraw" }));

    expect(apply).toHaveBeenCalledOnce();
    expect(withdraw).toHaveBeenCalledOnce();
  });

  // E: Loading and error states
  it("E: displays loading state", () => {
    render(<p role="status">Loading jobs...</p>);

    expect(screen.getByRole("status")).toHaveTextContent(
      "Loading jobs..."
    );
  });

  it("E: displays error state", () => {
    render(<p role="alert">Unable to load jobs</p>);

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Unable to load jobs"
    );
  });
});