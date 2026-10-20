import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback
} from "react";

import { useAuth } from "../experiment-4/ExperimentB4";


/* =================================================
   JOB DATA
   ================================================= */

const initialJobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechNova",
    location: "Coimbatore",
    salary: 7,
    industry: "IT",
    experience: "Fresher",
    type: "Full Time",
    skills: "HTML, CSS, JavaScript, React"
  },
  {
    id: 2,
    title: "Cyber Security Analyst",
    company: "SecureNet",
    location: "Chennai",
    salary: 9,
    industry: "Cyber Security",
    experience: "1-3 Years",
    type: "Full Time",
    skills: "Python, Networking, Linux, Security"
  },
  {
    id: 3,
    title: "Python Developer",
    company: "CodeWorks",
    location: "Bangalore",
    salary: 8,
    industry: "IT",
    experience: "Fresher",
    type: "Remote",
    skills: "Python, MySQL, Flask"
  },
  {
    id: 4,
    title: "UI/UX Designer",
    company: "Creative Studio",
    location: "Mumbai",
    salary: 6,
    industry: "Design",
    experience: "1-3 Years",
    type: "Part Time",
    skills: "Figma, UI Design, UX Research"
  },
  {
    id: 5,
    title: "Cloud Engineer",
    company: "CloudTech",
    location: "Hyderabad",
    salary: 11,
    industry: "Cloud",
    experience: "3-5 Years",
    type: "Full Time",
    skills: "AWS, Azure, Docker"
  }
];


/* =================================================
   LOCAL STORAGE HELPER
   ================================================= */

function getStorage(key, defaultValue = []) {
  try {
    const value = localStorage.getItem(key);

    return value === null
      ? defaultValue
      : JSON.parse(value);
  } catch {
    return defaultValue;
  }
}


/* =================================================
   CUSTOM HOOK 1: useJobs()
   Search and filters
   ================================================= */

function useJobs() {
  const [keyword, setKeyword] = useState("");
  const [company, setCompany] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] =
  useState(keyword);

useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedKeyword(keyword);
  }, 300);

  return () => clearTimeout(timer);
}, [keyword]);
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [industry, setIndustry] = useState("");
  const [experience, setExperience] = useState("");
  const [type, setType] = useState("");

  const filteredJobs = useMemo(() => {
    return initialJobs.filter((job) => {
      return (
        job.title.toLowerCase()
           .includes(debouncedKeyword.toLowerCase())&&
        job.company
          .toLowerCase()
          .includes(company.toLowerCase()) &&

        (!location || job.location === location) &&

        (!salary || job.salary >= Number(salary)) &&

        (!industry || job.industry === industry) &&

        (!experience || job.experience === experience) &&

        (!type || job.type === type)
      );
    });
  }, [
    debouncedKeyword,
    company,
    location,
    salary,
    industry,
    experience,
    type
  ]);

  return {
    jobs: initialJobs,
    filteredJobs,

    keyword,
    setKeyword,

    company,
    setCompany,

    location,
    setLocation,

    salary,
    setSalary,

    industry,
    setIndustry,

    experience,
    setExperience,

    type,
    setType
  };
}


/* =================================================
   CUSTOM HOOK 2: useApplications()
   Saved jobs, applications and alerts
   ================================================= */

function useApplications() {
  const { isAuthenticated } = useAuth();

  const [saved, setSaved] = useState(() =>
    isAuthenticated ? getStorage("savedJobs") : []
  );

  const [applications, setApplications] = useState(() =>
    isAuthenticated ? getStorage("applications") : []
  );

  const [alerts, setAlerts] = useState(() =>
    isAuthenticated ? getStorage("jobAlerts") : []
  );

  const [interviews, setInterviews] = useState(() =>
    isAuthenticated ? getStorage("interviews") : []
  );


  /* Clear data when the user logs out */

  useEffect(() => {
    if (!isAuthenticated) {
      setSaved([]);
      setApplications([]);
      setAlerts([]);
      setInterviews([]);
    }
  }, [isAuthenticated]);


  /* Save data only while authenticated */

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem("savedJobs", JSON.stringify(saved));
    } else {
      localStorage.removeItem("savedJobs");
    }
  }, [saved, isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem(
        "applications",
        JSON.stringify(applications)
      );
    } else {
      localStorage.removeItem("applications");
    }
  }, [applications, isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem("jobAlerts", JSON.stringify(alerts));
    } else {
      localStorage.removeItem("jobAlerts");
    }
  }, [alerts, isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem(
        "interviews",
        JSON.stringify(interviews)
      );
    } else {
      localStorage.removeItem("interviews");
    }
  }, [interviews, isAuthenticated]);


  /* Save a job */

  const saveJob = useCallback((job) => {
    setSaved((previous) => {
      if (previous.some((item) => item.id === job.id)) {
        return previous;
      }

      return [...previous, job];
    });
  }, []);


  /* Remove a saved job */

  const removeSavedJob = useCallback((id) => {
    setSaved((previous) =>
      previous.filter((job) => job.id !== id)
    );
  }, []);


  /* Apply for a job */

  const applyJob = useCallback((job, applicant = {}) => {
    setApplications((previous) => {
      if (
        previous.some((item) => item.job.id === job.id)
      ) {
        return previous;
      }

      return [
        ...previous,
        {
          job,
          applicant,
          status: "Applied",
          date: new Date().toLocaleDateString()
        }
      ];
    });
  }, []);


  /* Withdraw an application */

  const withdrawApplication = useCallback((id) => {
    setApplications((previous) =>
      previous.filter((item) => item.job.id !== id)
    );
  }, []);


  /* Create a job alert */

  const createJobAlert = useCallback((text) => {
    const value = text.trim();

    if (!value) return;

    setAlerts((previous) =>
      previous.includes(value)
        ? previous
        : [...previous, value]
    );
  }, []);


  /* Remove a job alert */

  const removeJobAlert = useCallback((alert) => {
    setAlerts((previous) =>
      previous.filter((item) => item !== alert)
    );
  }, []);


  /* Add interview */

  const addInterview = useCallback((interview) => {
    setInterviews((previous) => [
      ...previous,
      interview
    ]);
  }, []);


  return {
    saved,
    applications,
    alerts,
    interviews,

    saveJob,
    removeSavedJob,

    applyJob,
    withdrawApplication,

    createJobAlert,
    removeJobAlert,

    addInterview
  };
}


/* =================================================
   CONTEXT
   ================================================= */

const JobContext = createContext(null);


/* =================================================
   JOB PROVIDER
   ================================================= */

function JobProvider({ children }) {
  const jobs = useJobs();
  const applicationData = useApplications();

  const { user, isAuthenticated } = useAuth();


  /* Counts */

  const savedCount = useMemo(
    () => applicationData.saved.length,
    [applicationData.saved]
  );

  const applicationCount = useMemo(
    () => applicationData.applications.length,
    [applicationData.applications]
  );


  /* Filtered jobs */

  const matchingJobs = useMemo(
    () => jobs.filteredJobs,
    [jobs.filteredJobs]
  );


  /* Application status summary */

  const statusSummary = useMemo(() => ({
    Applied: applicationData.applications.filter(
      (item) => item.status === "Applied"
    ).length,

    Selected: applicationData.applications.filter(
      (item) => item.status === "Selected"
    ).length,

    Rejected: applicationData.applications.filter(
      (item) => item.status === "Rejected"
    ).length
  }), [applicationData.applications]);


  /* Profile data */

  const [profile, setProfile] = useState(null);


  useEffect(() => {
    if (!isAuthenticated || !user) {
      setProfile(null);
      localStorage.removeItem("profile");
      return;
    }

    const existingProfile = getStorage("profile", null);

    if (
      existingProfile &&
      existingProfile.email === user.email
    ) {
      setProfile(existingProfile);
    } else {
      setProfile({
        name: user.name,
        email: user.email,
        skills: "",
        interest: "",
        about: ""
      });
    }
  }, [user, isAuthenticated]);


  /* Persist profile */

  useEffect(() => {
    if (isAuthenticated && profile) {
      localStorage.setItem(
        "profile",
        JSON.stringify(profile)
      );
    } else if (!isAuthenticated) {
      localStorage.removeItem("profile");
    }
  }, [profile, isAuthenticated]);


  /* Update profile */

  const updateProfile = useCallback((data) => {
    setProfile((previous) => ({
      ...(previous || {}),
      ...data
    }));
  }, []);


  return (
    <JobContext.Provider
      value={{
        ...jobs,
        ...applicationData,

        savedCount,
        applicationCount,
        matchingJobs,
        statusSummary,

        profile,
        updateProfile
      }}
    >
      {children}
    </JobContext.Provider>
  );
}


/* =================================================
   CONTEXT HOOK
   ================================================= */

function useJobContext() {
  const context = useContext(JobContext);

  if (!context) {
    throw new Error(
      "useJobContext must be used inside JobProvider"
    );
  }

  return context;
}


/* =================================================
   EXPORTS
   ================================================= */

export {
  JobProvider,
  useJobContext
};