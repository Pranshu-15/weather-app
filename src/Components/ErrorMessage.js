import React from 'react';

const ErrorMessage = ({ error }) => {
  // Flag to track if the error message needs to be displayed
  const [showError, setShowError] = React.useState(false);

  React.useEffect(() => {
    // If there is an error, set showError to true
    if (error) {
      setShowError(true);
    } else {
      // If there is no error, reset showError after a short delay
      const timeout = setTimeout(() => setShowError(false), 500);
      return () => clearTimeout(timeout);
    }
  }, [error]);

  return showError ? <p>{error}</p> : null;
};

export default ErrorMessage;