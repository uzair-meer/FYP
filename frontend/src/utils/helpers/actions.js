export const handleResponse = (promise) => {
  return promise
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        const errorMessage = error.response.data.message;

        if (errorMessage.includes("Invalid email or password")) {
          alert("Invalid email or password. Please try again.");
        } else if (errorMessage.includes("User not found")) {
          alert("User not found. Please check your email.");
        } else if (
          errorMessage.includes("Company cannot log in because its status is")
        ) {
          alert(errorMessage); // Display the specific error message for company status
        } else {
          // Display a generic error message for other types of errors
          alert("An error occurred");
        }
      } else {
        // Generic error message for other types of errors
        alert("An error occurred");
      }

      throw error; // Re-throw the error for the caller to handle
    });
};
