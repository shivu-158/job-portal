// ================= EMAIL VALIDATION =================

export const validateEmail = (email = "") => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    email.trim()
  );
};


// ================= PHONE VALIDATION =================

export const validatePhone = (phone) => {
  return /^[0-9]{10}$/.test(phone.trim());
};


// ================= PASSWORD VALIDATION =================

export const validatePassword = (password) => {
  return (
    password.length >= 6 &&
    /[A-Z]/.test(password) &&
    /[0-9]/.test(password)
  );
};


// ================= NAME VALIDATION =================

export const validateName = (name) => {
  return /^[A-Za-z ]{2,}$/.test(name.trim());
};


// ================= RESUME VALIDATION =================

const validateResume = (resume) => {
  try {
    const url = new URL(resume.trim());

    return (
      url.protocol === "https:" ||
      url.protocol === "http:"
    );
  } catch {
    return false;
  }
};


// ================= APPLICATION VALIDATION =================

export const validateApplication = (form) => {

  if (!form.name?.trim()) {
    return "Applicant name is required.";
  }

  if (!validateName(form.name)) {
    return "Enter a valid applicant name.";
  }

  if (!form.email?.trim()) {
    return "Email is required.";
  }

  if (!validateEmail(form.email)) {
    return "Enter a valid email address.";
  }

  if (!form.phone?.trim()) {
    return "Phone number is required.";
  }

  if (!validatePhone(form.phone)) {
    return "Enter a valid 10-digit phone number.";
  }

  if (!form.resume?.trim()) {
    return "Resume link is required.";
  }

  if (!validateResume(form.resume)) {
    return "Enter a valid HTTP or HTTPS resume link.";
  }

  if (!form.coverLetter?.trim()) {
    return "Cover letter is required.";
  }

  if (form.coverLetter.trim().length < 20) {
    return "Cover letter must contain at least 20 characters.";
  }

  if (!form.experience?.trim()) {
    return "Experience is required.";
  }

  return "";
};


// ================= JOB ALERT VALIDATION =================

export const validateAlert = (preference) => {

  if (!preference?.trim()) {
    return "Job alert preference is required.";
  }

  if (preference.trim().length < 2) {
    return "Enter a valid job alert preference.";
  }

  return "";
};


// ================= VALIDATION MODULE PAGE =================

function ExperimentE4() {
  return (
    <div className="page-container">
      <h2>Form Validation Module</h2>

      <p>
        Reusable validation functions for Login,
        Job Application, Profile and Job Alerts.
      </p>
    </div>
  );
}

export default ExperimentE4;