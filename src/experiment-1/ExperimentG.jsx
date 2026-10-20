import React from "react";

function ExperimentG() {

  return (
    <div className="experiment-container">

      <h1>
        Experiment G - Responsive Design
      </h1>

      <div className="responsive-demo">

        <div className="responsive-card">
          💼
          <h3>Desktop</h3>
          <p>
            Responsive job portal layout.
          </p>
        </div>

        <div className="responsive-card">
          📱
          <h3>Tablet</h3>
          <p>
            Layout adjusts for tablets.
          </p>
        </div>

        <div className="responsive-card">
          📲
          <h3>Mobile</h3>
          <p>
            Layout adjusts for mobile.
          </p>
        </div>

      </div>

      <p className="responsive-text">
        Resize the browser window to see
        the responsive design.
      </p>

    </div>
  );
}

export default ExperimentG;