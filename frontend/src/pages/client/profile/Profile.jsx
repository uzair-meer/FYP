import { useState, useEffect } from "react";
import { useAuth } from "src/context/AuthContext";
import { setCookieObject } from "src/utils/helpers/cookies.js";

const Profile = () => {
  const { user, setUser } = useAuth();
  const [name, setName] = useState("");
  const [password, setPassword] = useState(""); // Password should not be pre-filled for security reasons
  useEffect(() => {
    // Initialize the state with the user's current name when the component mounts
    if (user) {
      setName(user?.name);
    }
    console.log(user);
  }, [user]);

  const handleUpdateProfile = async () => {
    // Construct the payload with the fields that are allowed to be updated
    const payload = {
      name: name,
      ...(password && { password: password }), // Include the password only if it's been set
    };

    try {
      const response = await fetch(
        `http://localhost:5000/auth/update/${user._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            // Include an authorization header if your API requires authentication
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedUser = await response.json();

      setUser(updatedUser);

      // Optionally, update the user cookie if you're using it
      setCookieObject("user", updatedUser);

      // Here you would update the user context or perform other actions with the updated user data
      // Show success message or perform further actions
    } catch (error) {
      // Handle errors - for example, by setting an error message in your state
      console.error("There was an error updating the profile:", error);
    }
  };

  return (
    <div className="overflow-hidden bg-white mt-5 m-3 shadow sm:rounded-lg text-textColor">
      <div className="px-4 py-6 sm:px-6">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          User Information
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          Personal details.
        </p>
      </div>
      <div className="border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">Full name</dt>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
            />
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">Password</dt>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
            />
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">Email address</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {user?.email}
            </dd>
          </div>
        </dl>
      </div>
      <div className="flex justify-end px-4 py-3 bg-gray-50 text-right sm:px-6">
        <button
          type="button"
          onClick={handleUpdateProfile}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
