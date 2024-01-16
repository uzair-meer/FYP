import { toast } from "react-toastify";

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

        if (errorMessage.includes("Email already exists")) {
          alert("Email already exists. Please use a different email.");
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
