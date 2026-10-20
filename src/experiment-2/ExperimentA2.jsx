import { useState, useMemo } from "react";

export function useJobs() {
  const [jobs] = useState([
    {
      id: 1,
      title: "Frontend Developer",
      company: "TCS",
      location: "Chennai",
      salary: 600000,
      industry: "IT",
      experience: "Fresher",
      type: "Full Time"
    },
    {
      id: 2,
      title: "Python Developer",
      company: "Infosys",
      location: "Bangalore",
      salary: 700000,
      industry: "IT",
      experience: "1-3 Years",
      type: "Full Time"
    },
    {
      id: 3,
      title: "Cyber Security Analyst",
      company: "Wipro",
      location: "Coimbatore",
      salary: 800000,
      industry: "Cyber Security",
      experience: "1-3 Years",
      type: "Full Time"
    }
  ]);

  const [keyword, setKeyword] = useState("");
  const [industry, setIndustry] = useState("All");
  const [type, setType] = useState("All");

  const filteredJobs = useMemo(() => {
    return jobs.filter(job =>
      (job.title.toLowerCase().includes(keyword.toLowerCase()) ||
       job.company.toLowerCase().includes(keyword.toLowerCase()) ||
       job.location.toLowerCase().includes(keyword.toLowerCase())) &&
      (industry === "All" || job.industry === industry) &&
      (type === "All" || job.type === type)
    );
  }, [jobs, keyword, industry, type]);

  return {
    jobs,
    filteredJobs,
    keyword,
    setKeyword,
    industry,
    setIndustry,
    type,
    setType
  };
}