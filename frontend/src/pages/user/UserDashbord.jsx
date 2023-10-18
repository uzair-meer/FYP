import React from "react";
import { useLocation } from "react-router";

function UserDashbord() {
  const location = useLocation();
  const userName = location.state.name;
  return <h1>{userName} Profile</h1>;
}

export default UserDashbord;
