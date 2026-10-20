import React from "react";

class ExperimentF4 extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      hasError: false
    };
  }

  static getDerivedStateFromError() {
    return {
      hasError: true
    };
  }

  componentDidCatch(error, info) {
    console.error(error, info);
  }

  render() {

    if (this.state.hasError) {

      return (
        <div className="error-boundary">

          <h1>Something went wrong.</h1>

          <p>
            Please refresh the page and try again.
          </p>

          <button
            className="primary-btn"
            onClick={() =>
              window.location.reload()
            }
          >
            Refresh
          </button>

        </div>
      );
    }

    return this.props.children;
  }
}

export default ExperimentF4;