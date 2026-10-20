import React, {
  useEffect,
  useRef
} from "react";

function ExperimentD() {

  const searchRef =
    useRef(null);

  useEffect(() => {

    searchRef.current.focus();

  }, []);

  const focusInput = () => {

    searchRef.current.focus();

  };

  return (
    <div className="experiment-container">

      <h1>Experiment D - useRef</h1>

      <div className="component-box">

        <h2>Job Search</h2>

        <input
          ref={searchRef}
          type="text"
          placeholder="Search job..."
        />

        <button
          onClick={focusInput}
        >
          Focus Search
        </button>

        <p>
          The search field is automatically
          focused using useRef.
        </p>

      </div>

    </div>
  );
}

export default ExperimentD;