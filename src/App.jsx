import React, {
  useState,
  useEffect,
  lazy,
  Suspense
} from "react";
const JobDetail = lazy(
  () => import("./components/JobDetail")
);

const ApplicationForm = lazy(
  () => import("./components/ApplicationForm")
);
import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  NavLink,
  Outlet,
  useParams,
  useNavigate,
  useLocation
} from "react-router-dom";
import {
  Button,
  Input,
  JobCard,
  StatusBadge,
  ApplicationCard,
  JobAlertCard,
  Loading
} from "./experiment-4/ExperimentG4";  

/* ================= EXPERIMENT 1 ================= */

import ExperimentA
  from "./experiment-1/ExperimentA";

import ExperimentB
  from "./experiment-1/ExperimentB";

import ExperimentC
  from "./experiment-1/ExperimentC";

import ExperimentD
  from "./experiment-1/ExperimentD";

import ExperimentE
  from "./experiment-1/ExperimentE";

import ExperimentF
  from "./experiment-1/ExperimentF";

import ExperimentG
  from "./experiment-1/ExperimentG";

/* ================= EXPERIMENT 2 ================= */

import {
  JobProvider,
  useJobContext
} from "./experiment-2/ExperimentC2";

import ExperimentD2
  from "./experiment-2/ExperimentD2";

import ExperimentE2
  from "./experiment-2/ExperimentE2";

import ExperimentF2
  from "./experiment-2/ExperimentF2";

import ExperimentG2
  from "./experiment-2/ExperimentG2";

import ExperimentH2
  from "./experiment-2/ExperimentH2";


/* ================= EXPERIMENT 4 ================= */

import AuthProvider, {
  useAuth
} from "./experiment-4/ExperimentB4";

import ProtectedRoute
  from "./experiment-4/ExperimentC4";

import ErrorBoundary
  from "./experiment-4/ExperimentF4";

import ExperimentA4
  from "./experiment-4/ExperimentA4";

import ExperimentD4
  from "./experiment-4/ExperimentD4";

import ExperimentH4
  from "./experiment-4/ExperimentH4";

import ExperimentI4
  from "./experiment-4/ExperimentI4";

import {
  validateEmail,
  validateName,
  validateApplication,
  validateAlert
} from "./experiment-4/ExperimentE4";

/* ================= EXPERIMENT 5 ================= */

import ExperimentA5 from "./experiment-5/ExperimentA5";
import ExperimentB5 from "./experiment-5/ExperimentB5";
import ExperimentC5 from "./experiment-5/ExperimentC5";
import ExperimentD5 from "./experiment-5/ExperimentD5";
import ExperimentE5 from "./experiment-5/ExperimentE5";
import ExperimentF5 from "./experiment-5/ExperimentF5";
import ExperimentG5 from "./experiment-5/ExperimentG5";
import ExperimentH5 from "./experiment-5/ExperimentH5";
import ExperimentI5 from "./experiment-5/ExperimentI5";   

/* ================= EXPERIMENT 6 ================= */
import Experiment6Home from "./experiment-6/Experiment6Home";
import ExperimentA6 from "./experiment-6/ExperimentA6";
import ExperimentB6 from "./experiment-6/ExperimentB6";
import ExperimentC6 from "./experiment-6/ExperimentC6";
import ExperimentD6 from "./experiment-6/ExperimentD6";
import ExperimentE6 from "./experiment-6/ExperimentE6";
import ExperimentF6 from "./experiment-6/ExperimentF6";
import ExperimentG6 from "./experiment-6/ExperimentG6";
import ExperimentH6 from "./experiment-6/ExperimentH6";
import ExperimentI6 from "./experiment-6/ExperimentI6";

/* ================= EXPERIMENT 7 ================= */
import ExperimentA7 from "./experiment-7/ExperimentA7";
import ExperimentB7 from "./experiment-7/ExperimentB7";
import ExperimentCD7 from "./experiment-7/ExperimentCD7";
import ExperimentE7 from "./experiment-7/ExperimentE7";

/* ================= EXPERIMENT 8 ================= */
import ExperimentA8 from "./experiment-8/ExperimentA8";
import ExperimentB8 from "./experiment-8/ExperimentB8";

/* ================= EXPERIMENT 10 ================= */


/* =================================================
   HOME PAGE
   ================================================= */

function Home() {

  return (
    <div className="home-page">

      <div className="hero">

        <div className="hero-content">

          <p className="welcome">
            WELCOME TO JOB PORTAL
          </p>

          <h1>
            Find Your <span>Dream Job</span>
          </h1>

          <p>
            Search, save and apply for your favorite jobs
            from one simple platform.
          </p>

          <Link
            to="/jobs"
            className="hero-btn"
          >
            Explore Jobs
          </Link>

        </div>

      </div>


      <div className="home-features">

        <div className="feature-card">

          <div className="feature-icon">
            🔎
          </div>

          <h3>
            Find Jobs
          </h3>

          <p>
            Search for jobs based on your skills
            and interests.
          </p>

        </div>


        <div className="feature-card">

          <div className="feature-icon">
            ❤️
          </div>

          <h3>
            Save Jobs
          </h3>

          <p>
            Save your favorite jobs and access
            them anytime.
          </p>

        </div>


        <div className="feature-card">

          <div className="feature-icon">
            📩
          </div>

          <h3>
            Apply Easily
          </h3>

          <p>
            Apply for jobs quickly using our
            application form.
          </p>

        </div>

      </div>

    </div>
  );
}


/* =================================================
   JOBS PAGE
   Experiment 2 + Experiment 3
   ================================================= */

function Jobs() {
  const navigate = useNavigate();
  const {
    filteredJobs,
    saved,
    saveJob,
    removeSavedJob,

    keyword,
    setKeyword,

    company,
    setCompany,

    location,
    setLocation,

    industry,
    setIndustry,

    experience,
    setExperience,

    type,
    setType,

    salary,
    setSalary

  } = useJobContext();


  return (
    <div className="page-container">

      <h1>
        Available Jobs
      </h1>


      {/* SEARCH */}

      <input
        className="search-input"
        type="text"
        placeholder="Search job title..."
        value={keyword}
        onChange={(e) =>
          setKeyword(e.target.value)
        }
      />


      <input
        className="search-input"
        type="text"
        placeholder="Search company..."
        value={company}
        onChange={(e) =>
          setCompany(e.target.value)
        }
      />


      {/* FILTERS */}

      <div className="filters">

        <select
          value={location}
          onChange={(e) =>
            setLocation(e.target.value)
          }
        >

          <option value="">
            All Locations
          </option>

          <option>
            Coimbatore
          </option>

          <option>
            Chennai
          </option>

          <option>
            Bangalore
          </option>

          <option>
            Mumbai
          </option>

          <option>
            Hyderabad
          </option>

        </select>


        <select
          value={industry}
          onChange={(e) =>
            setIndustry(e.target.value)
          }
        >

          <option value="">
            All Industries
          </option>

          <option>
            IT
          </option>

          <option>
            Cyber Security
          </option>

          <option>
            Design
          </option>

          <option>
            Cloud
          </option>

        </select>


        <select
          value={experience}
          onChange={(e) =>
            setExperience(e.target.value)
          }
        >

          <option value="">
            Experience
          </option>

          <option>
            Fresher
          </option>

          <option>
            1-3 Years
          </option>

          <option>
            3-5 Years
          </option>

        </select>


        <select
          value={type}
          onChange={(e) =>
            setType(e.target.value)
          }
        >

          <option value="">
            Job Type
          </option>

          <option>
            Full Time
          </option>

          <option>
            Part Time
          </option>

          <option>
            Remote
          </option>

        </select>


        <select
          value={salary}
          onChange={(e) =>
            setSalary(e.target.value)
          }
        >

          <option value="">
            Salary
          </option>

          <option value="5">
            ₹5 LPA+
          </option>

          <option value="8">
            ₹8 LPA+
          </option>

          <option value="10">
            ₹10 LPA+
          </option>

        </select>

      </div>


      {/* JOB LIST */}

      {filteredJobs.length === 0 ? (
        <div className="empty-box">
          <h2>
            No matching job opportunities available
          </h2>
        </div>
      ) : (
        <div className="saved-list">
          {filteredJobs.map((job) => {
            const isSaved = saved.some(
              (item) => item.id === job.id
            );

            return (
              <JobCard
                key={job.id}
                job={job}
                isSaved={isSaved}
                onView={() =>
                  navigate(`/job/${job.id}`)
                }
                onSave={() => {
                  if (isSaved) {
                    removeSavedJob(job.id);
                  } else {
                    saveJob(job);
                  }
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

/* =================================================
   SAVED JOBS
   ================================================= */

function SavedJobsPage() {

  const {
    saved,
    removeSavedJob
  } = useJobContext();


  return (
    <div className="page-container">

      <h1>
        ❤️ Saved Jobs
      </h1>


      {saved.length === 0 ? (

        <div className="empty-box">

          <div className="empty-icon">
            💼
          </div>

          <h2>
            No Saved Jobs
          </h2>

          <p>
            You have not saved any jobs yet.
          </p>

          <Link
            to="/jobs"
            className="primary-btn"
          >
            Explore Jobs
          </Link>

        </div>

      ) : (

        <div className="saved-list">

          {saved.map((job) => (

            <div
              className="saved-card"
              key={job.id}
            >

              <div>

                <h3>
                  {job.title}
                </h3>

                <p>
                  {job.company}
                </p>

                <p>
                  {job.location}
                </p>

                <p>
                  ₹{job.salary} LPA
                </p>

              </div>


              <button
                onClick={() =>
                  removeSavedJob(job.id)
                }
              >
                Remove
              </button>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}


/* =================================================
   JOB ALERTS
   ================================================= */

function JobAlertsPage() {

  const {
    alerts,
    createJobAlert,
    removeJobAlert
  } = useJobContext();


  const [
    keyword,
    setKeyword
  ] = useState("");


  const [
    error,
    setError
  ] = useState("");


  const createAlert = () => {

    const validation =
      validateAlert(keyword);


    if (validation) {

      setError(validation);

      return;
    }


    createJobAlert(keyword);

    setKeyword("");

    setError("");
  };


  return (
    <div className="page-container">

      <h1>
        🔔 Job Alerts
      </h1>


      <div className="alert-box">

        <h2>
          Create Job Alert
        </h2>

        <p>
          Get notified about jobs matching
          your interests.
        </p>


        {error && (
          <p className="error">
            {error}
          </p>
        )}


        <input
          type="text"
          placeholder="Enter job keyword"
          value={keyword}
          onChange={(e) =>
            setKeyword(e.target.value)
          }
        />


        <button
          onClick={createAlert}
          className="primary-btn"
        >
          Create Alert
        </button>

      </div>


      <div className="alerts-list">

        <h2>
          Your Alerts
        </h2>


        {alerts.length === 0 ? (

          <p>
            No alerts created yet.
          </p>

        ) : (

          alerts.map((alert, index) => (

            <div
              className="alert-card"
              key={index}
            >

              🔔 Jobs matching:
              <strong>
                {" "}{alert}
              </strong>

              <button
                className="secondary-btn"
                onClick={() =>
                  removeJobAlert(alert)
                }
              >
                Remove
              </button>

            </div>

          ))

        )}

      </div>

    </div>
  );
}

/* =================================================
   APPLICATIONS
   ================================================= */

function ApplicationsPage() {

  const {
    applications,
    withdrawApplication,
    statusSummary
  } = useJobContext();


  return (
    <div className="page-container">

      <h1>
        📩 My Applications
      </h1>


      <div className="application-summary">

        <span>
          Applied:
          {" "}
          {statusSummary.Applied}
        </span>

        <span>
          Selected:
          {" "}
          {statusSummary.Selected}
        </span>

        <span>
          Rejected:
          {" "}
          {statusSummary.Rejected}
        </span>

      </div>


      {applications.length === 0 ? (

        <div className="empty-box">

          <div className="empty-icon">
            📄
          </div>

          <h2>
            No Applications Submitted
          </h2>

          <p>
            You have not applied for any jobs yet.
          </p>

          <Link
            to="/jobs"
            className="primary-btn"
          >
            Explore Jobs
          </Link>

        </div>

      ) : (

        <div className="saved-list">

          {applications.map(
            (application) => (

              <div
                className="saved-card"
                key={application.job.id}
              >

                <div>

                  <h3>
                    {application.job.title}
                  </h3>

                  <p>
                    {application.job.company}
                  </p>

                  <p>
                    📍 {application.job.location}
                  </p>

                  <p>
                    Status:
                    {" "}
                    {application.status}
                  </p>

                  <p>
                    Applied:
                    {" "}
                    {application.date}
                  </p>

                </div>


                <button
                  onClick={() =>
                    withdrawApplication(
                      application.job.id
                    )
                  }
                >
                  Withdraw
                </button>

              </div>
            )
          )}

        </div>
      )}

    </div>
  );
}


/* =================================================
   APPLICATION REVIEW
   ================================================= */

function ApplicationReview() {

  const { id } = useParams();

const { applications } = useJobContext();

const application = applications.find(
  (item) => Number(item.job.id) === Number(id)
);

  if (!application) {

    return (
      <div className="page-container">

        <h2>
          No application found.
        </h2>

      </div>
    );
  }


  return (
    <div className="page-container">

      <div className="review-box">

        <h1>
          📋 Application Review
        </h1>


        <h3>
          {application.job.title}
        </h3>

        <p>
          Company:
          {" "}
          {application.job.company}
        </p>

        <p>
          Name:
          {" "}
          {application.applicant.name}
        </p>

        <p>
          Email:
          {" "}
          {application.applicant.email}
        </p>

        <p>
          Phone:
          {" "}
          {application.applicant.phone}
        </p>

        <p>
          Resume:
          {" "}
          {application.applicant.resume}
        </p>

        <p>
          Experience:
          {" "}
          {application.applicant.experience}
        </p>

        <p>
          Cover Letter:
          {" "}
          {application.applicant.coverLetter}
        </p>


        <Link
          to="/confirmation"
          className="primary-btn"
        >
          Confirm Application
        </Link>

      </div>

    </div>
  );
}


/* =================================================
   APPLICATION CONFIRMATION
   ================================================= */

function ApplicationConfirmation() {

  return (
    <div className="page-container">

      <div className="confirmation-box">

        <div className="success-icon">
          ✅
        </div>

        <h1>
          Application Submitted!
        </h1>

        <p>
          Your application has been
          successfully submitted.
        </p>

        <Link
          to="/dashboard"
          className="primary-btn"
        >
          Go to Dashboard
        </Link>

      </div>

    </div>
  );
}


/* =================================================
   LOGIN
   ================================================= */

function Login() {

  const navigate =
    useNavigate();

  const location =
    useLocation();


  const {
    login
  } = useAuth();


  const [
    email,
    setEmail
  ] = useState("");


  const [
    password,
    setPassword
  ] = useState("");


  const [
    error,
    setError
  ] = useState("");


  const handleLogin = (e) => {

    e.preventDefault();


    if (!email) {

      setError(
        "Email or username is required."
      );

      return;
    }


    if (!password) {

      setError(
        "Password is required."
      );

      return;
    }


    const success =
      login(
        email,
        password
      );


    if (!success) {

      setError(
        "Login failed."
      );

      return;
    }


    const destination =
      location.state?.from?.pathname ||
      "/";


    navigate(
      destination,
      {
        replace: true
      }
    );
  };


  return (
    <div className="form-page">

      <div className="form-box">

        <h1>
          🔐 Login
        </h1>


        {error && (
          <p className="error-message">
            {error}
          </p>
        )}


        <form
          onSubmit={handleLogin}
        >

          <input
            type="text"
            placeholder="Email / Username"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
          />


          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
          />


          <button
            type="submit"
            className="primary-btn"
          >
            Login
          </button>

        </form>

      </div>

    </div>
  );
}
/* =================================================
   DASHBOARD
   ================================================= */

function Dashboard() {

  return (
    <div className="page-container">

      <h1>
        📊 Applicant Dashboard
      </h1>


      <div className="dashboard-links">

        <NavLink to="applications">
          Applications
        </NavLink>

        <NavLink to="saved-jobs">
          Saved Jobs
        </NavLink>

        <NavLink to="job-alerts">
          Job Alerts
        </NavLink>

        <NavLink to="profile">
          Profile
        </NavLink>

      </div>


      <Outlet />

    </div>
  );
}


/* =================================================
   DASHBOARD - APPLICATIONS
   ================================================= */

function DashboardApplications() {

  const {
    applications
  } = useJobContext();


  return (
    <div className="job-card">

      <h2>
        Applications
      </h2>

      <p>
        Total Applications:
        {" "}
        {applications.length}
      </p>

    </div>
  );
}


/* =================================================
   DASHBOARD - SAVED
   ================================================= */

function DashboardSaved() {

  const {
    saved
  } = useJobContext();


  return (
    <div className="job-card">

      <h2>
        Saved Jobs
      </h2>

      <p>
        Total Saved Jobs:
        {" "}
        {saved.length}
      </p>

    </div>
  );
}


/* =================================================
   DASHBOARD - ALERTS
   ================================================= */

function DashboardAlerts() {

  const {
    alerts
  } = useJobContext();


  return (
    <div className="job-card">

      <h2>
        Job Alerts
      </h2>

      <p>
        Total Alerts:
        {" "}
        {alerts.length}
      </p>

    </div>
  );
}


/* =================================================
   DASHBOARD - PROFILE
   ================================================= */

function DashboardProfile() {

  const {
    profile
  } = useJobContext();


  return (
    <div className="job-card">

      <h2>
        Profile
      </h2>

      <p>
        Name: {" "}{profile?.name || "Not available"}
      </p>

      <p>
        Email: {" "}{profile?.email || "Not available"}
      </p>

    </div>
  );
}
// ================= PROFILE PAGE =================

function Profile() {
  const { profile, updateProfile } = useJobContext();

  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [skills, setSkills] = useState("");
  const [interest, setInterest] = useState("");
  const [about, setAbout] = useState("");

  // Update form fields whenever the logged-in profile changes
  useEffect(() => {
    if (profile) {
      setName(profile.name || "");
      setEmail(profile.email || "");
      setSkills(profile.skills || "");
      setInterest(profile.interest || "");
      setAbout(profile.about || "");
    } else {
      setName("");
      setEmail("");
      setSkills("");
      setInterest("");
      setAbout("");
    }
  }, [profile]);

const handleSave = (e) => {
  e.preventDefault();

  if (!validateName(name)) {
    setMessage("Enter a valid name.");
    return;
  }

  if (!validateEmail(email)) {
    setMessage("Enter a valid email address.");
    return;
  }

  updateProfile({
    name: name.trim(),
    email: email.trim(),
    skills: skills.trim(),
    interest: interest.trim(),
    about: about.trim()
  });

  setEditMode(false);
  setMessage("Profile updated successfully!");
};

  const handleCancel = () => {
    setName(profile?.name || "");
    setEmail(profile?.email || "");
    setSkills(profile?.skills || "");
    setInterest(profile?.interest || "");
    setAbout(profile?.about || "");

    setEditMode(false);
    setMessage("");
  };

  // Do not display another user's profile when logged out
  if (!profile) {
    return (
      <div className="page-container">
        <h1>My Profile</h1>
        <p>Please log in to view your profile.</p>

        <Link to="/login" className="primary-btn">
          Login
        </Link>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h1>👤 My Profile</h1>

      <div className="profile-card">
        <div className="profile-avatar">👤</div>

        {!editMode ? (
          <>
            <h2>{profile.name}</h2>

            <p>
              📧 <strong>Email:</strong> {profile.email}
            </p>

            <p>
              💻 <strong>Skills:</strong>{" "}
              {profile.skills || "Not added"}
            </p>

            <p>
              🎯 <strong>Career Interest:</strong>{" "}
              {profile.interest || "Not added"}
            </p>

            <p>
              📝 <strong>About:</strong>{" "}
              {profile.about || "Not added"}
            </p>

            <button
              className="primary-btn"
              type="button"
              onClick={() => {
                setEditMode(true);
                setMessage("");
              }}
            >
              ✏️ Edit Profile
            </button>
          </>
        ) : (
          <form onSubmit={handleSave}>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Skills"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />

            <input
              type="text"
              placeholder="Career Interest"
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
            />

            <textarea
              placeholder="About Me"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              rows={5}
            />

            <div className="profile-actions">
              <button
                type="submit"
                className="primary-btn"
              >
                💾 Save Changes
              </button>

              <button
                type="button"
                className="secondary-btn"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {message && (
          <p className="profile-message">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

/* =================================================
   HEADER
   ================================================= */

function Header() {

  const {
    savedCount,
    applicationCount
  } = useJobContext();

  const {
    user,
    isAuthenticated,
    logout
  } = useAuth();

  const navigate =
    useNavigate();


  const handleLogout = () => {

    logout();

    navigate(
      "/",
      {
        replace: true
      }
    );
  };


  return (
    <header className="header">

      <Link
        to="/"
        className="logo"
      >
        💼 Job<span>Portal</span>
      </Link>


      <nav>

        <Link to="/">
          Home
        </Link>

        <Link to="/jobs">
          Jobs
        </Link>


        {isAuthenticated && (
          <>
            <Link to="/saved">
              Saved Jobs ({savedCount})
            </Link>

            <Link to="/applications">
              Applications ({applicationCount})
            </Link>

            <Link to="/alerts">
              Job Alerts
            </Link>

            <Link to="/dashboard">
              Dashboard
            </Link>

            <Link to="/profile">
              Profile
            </Link>
          </>
        )}


        {!isAuthenticated ? (

          <Link to="/login">
            Login
          </Link>

        ) : (

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>

        )}

      </nav>
    </header>
  );
}

/* =================================================
   FOOTER
   ================================================= */

function Footer() {

  return (
    <footer>

      <div>

        <h3>
          💼 JobPortal
        </h3>

        <p>
          Find your dream career with ease.
        </p>

      </div>


      <p>
        © 2026 Job Portal.
        All Rights Reserved.
      </p>

    </footer>
  );
}


/* =================================================
   MAIN APP
   ================================================= */

function App() {

  return (

    <BrowserRouter>

      {/* EXPERIMENT 4 AUTH */}
      <Suspense fallback={<p role="status">Loading page...</p>}>

      <AuthProvider>

        {/* EXPERIMENT 2 CONTEXT */}

        <JobProvider>

          {/* EXPERIMENT 4 ERROR BOUNDARY */}

          <ErrorBoundary>

            <Header />

            <Routes>


              {/* =================================
                 HOME
                 ================================= */}

              <Route
                path="/"
                element={<Home />}
              />


              {/* =================================
                 JOBS
                 ================================= */}

              <Route
                path="/jobs"
                element={<Jobs />}
              />


              {/* =================================
                 DYNAMIC JOB DETAILS - EXP 3
                 ================================= */}

              <Route
                path="/job/:id"
                element={<JobDetail />}
              />


              {/* =================================
                 LOGIN - EXP 4
                 ================================= */}

              <Route path="/login"
              element={<ExperimentA4 />}/>

              {/* =================================
                 PROTECTED APPLY
                 ================================= */}

              <Route
                path="/apply/:id"
                element={
                  <ProtectedRoute>
                    <ApplicationForm />
                  </ProtectedRoute>
                }
              />


              {/* =================================
                 PROTECTED SAVED JOBS
                 ================================= */}

              <Route
                path="/saved"
                element={
                  <ProtectedRoute>
                    <SavedJobsPage />
                  </ProtectedRoute>
                }
              />


              {/* Requirement path */}

              <Route
                path="/saved-jobs"
                element={
                  <ProtectedRoute>
                    <SavedJobsPage />
                  </ProtectedRoute>
                }
              />


              {/* =================================
                 PROTECTED APPLICATIONS
                 ================================= */}

              <Route
                path="/applications"
                element={
                  <ProtectedRoute>
                    <ApplicationsPage />
                  </ProtectedRoute>
                }
              />


              {/* =================================
                 PROTECTED ALERTS
                 ================================= */}

              <Route
                path="/alerts"
                element={
                  <ProtectedRoute>
                    <JobAlertsPage />
                  </ProtectedRoute>
                }
              />


              {/* Requirement path */}

              <Route
                path="/job-alerts"
                element={
                  <ProtectedRoute>
                    <JobAlertsPage />
                  </ProtectedRoute>
                }
              />


              {/* =================================
                 PROTECTED PROFILE
                 ================================= */}

              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />


              {/* =================================
                 APPLICATION REVIEW
                 ================================= */}

              <Route
                path="/review/:id"
                element={
                  <ProtectedRoute>
                    <ApplicationReview />
                  </ProtectedRoute>
                }
              />


              {/* =================================
                 APPLICATION CONFIRMATION
                 ================================= */}

              <Route
                path="/confirmation"
                element={
                  <ProtectedRoute>
                    <ApplicationConfirmation />
                  </ProtectedRoute>
                }
              />


              {/* =================================
                 DASHBOARD + NESTED ROUTES
                 ================================= */}

              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              >
                <Route indexelement={
                  <div className="job-card">
                    <h2>Welcome to your Dashboard</h2>
                    <p>Select a section to view your details.</p>
                    </div>}/>

                <Route
                  path="applications"
                  element={
                    <DashboardApplications />
                  }
                />

                <Route
                  path="saved-jobs"
                  element={
                    <DashboardSaved />
                  }
                />

                <Route
                  path="job-alerts"
                  element={
                    <DashboardAlerts />
                  }
                />

                <Route
                  path="profile"
                  element={
                    <DashboardProfile />
                  }
                />

              </Route>


              {/* =================================
                 EXPERIMENT 1 TEST ROUTES
                 ================================= */}

              <Route
                path="/experiment-a"
                element={<ExperimentA />}
              />

              <Route
                path="/experiment-b"
                element={<ExperimentB />}
              />

              <Route
                path="/experiment-c"
                element={<ExperimentC />}
              />

              <Route
                path="/experiment-d"
                element={<ExperimentD />}
              />

              <Route
                path="/experiment-e"
                element={<ExperimentE />}
              />

              <Route
                path="/experiment-f"
                element={<ExperimentF />}
              />

              <Route
                path="/experiment-g"
                element={<ExperimentG />}
              />


              {/* =================================
                 EXPERIMENT 2 TEST ROUTES
                 ================================= */}

              <Route
                path="/experiment-2-d"
                element={<ExperimentD2 />}
              />

              <Route
                path="/experiment-2-e"
                element={<ExperimentE2 />}
              />

              <Route
                path="/experiment-2-f"
                element={<ExperimentF2 />}
              />

              <Route
                path="/experiment-2-g"
                element={<ExperimentG2 />}
              />

              <Route
                path="/experiment-2-h"
                element={<ExperimentH2 />}
              />


              {/* =================================
                 EXPERIMENT 4 TEST ROUTES
                 ================================= */}

              <Route
                path="/experiment-4-login"
                element={<ExperimentA4 />}
              />

              <Route
                path="/experiment-4-redirect"
                element={<ExperimentD4 />}
              />

              <Route
                path="/experiment-4-validation"
                element={<div className="page-container">
                  <h2>
                    Experiment 4 - Form Validation
                  </h2>

                  <p>
                    Validation functions are integrated
                    into Login, Application, Profile
                    and Job Alert forms.
                  </p>
                </div>}
              />

              <Route
                path="/experiment-4-flow"
                element={<ExperimentH4 />}
              />

              <Route
                path="/experiment-4-router"
                element={<ExperimentI4 />}
              />

              {/* ================= EXPERIMENT 5 ================= */}

<Route
  path="/experiment-5/a"
  element={<ExperimentA5 />}
/>

<Route
  path="/experiment-5/b"
  element={<ExperimentB5 />}
/>

<Route
  path="/experiment-5/c/:id"
  element={<ExperimentC5 />}
/>

<Route
  path="/experiment-5/d"
  element={<ExperimentD5 />}
/>

<Route
  path="/experiment-5/e"
  element={<ExperimentE5 />}
/>

<Route
  path="/experiment-5/f"
  element={<ExperimentF5 />}
/>

<Route
  path="/experiment-5/g"
  element={<ExperimentG5 />}
/>

<Route
  path="/experiment-5/h"
  element={<ExperimentH5 />}
/>

<Route
  path="/experiment-5/i"
  element={<ExperimentI5 />}
/>

<Route path="/experiment-6" element={<Experiment6Home />} />
<Route path="/experiment-6/a" element={<ExperimentA6 />} />
<Route path="/experiment-6/b" element={<ExperimentB6 />} />
<Route path="/experiment-6/c" element={<ExperimentC6 />} />
<Route path="/experiment-6/d" element={<ExperimentD6 />} />
<Route path="/experiment-6/e" element={<ExperimentE6 />} />
<Route path="/experiment-6/f" element={<ExperimentF6 />} />
<Route path="/experiment-6/g" element={<ExperimentG6 />} />
<Route path="/experiment-6/h" element={<ExperimentH6 />} />
<Route path="/experiment-6/i" element={<ExperimentI6 />} />

<Route path="/experiment-7/jobs" element={<ExperimentA7 />} />
<Route path="/experiment-7/apply" element={<ExperimentB7 />} />
<Route path="/experiment-7/manage" element={<ExperimentCD7 />} />
<Route path="/experiment-7/history" element={<ExperimentE7 />} />

<Route path="/experiment-8/login" element={<ExperimentA8 />} />
<Route path="/experiment-8/protected" element={<ExperimentB8 />} />

            </Routes>
           

            <Footer />

          </ErrorBoundary>

        </JobProvider>

      </AuthProvider>
      </Suspense>

    </BrowserRouter>
  );
}


export default App;

