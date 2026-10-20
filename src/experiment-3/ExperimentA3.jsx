export default function ExperimentA() {
  return (
    <div className="page-container">
      <h2>React Router</h2>
      <p>Job Portal routes are configured successfully.</p>

      <ul>
        <li>/</li>
        <li>/jobs</li>
        <li>/job/:id</li>
        <li>/apply/:id</li>
        <li>/saved-jobs</li>
        <li>/applications</li>
        <li>/alerts</li>
        <li>/profile</li>
        <li>/login</li>
        <li>/dashboard/*</li>
      </ul>
    </div>
  );
}