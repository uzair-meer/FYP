import React from "react";
import Layout from "../../layout/Layout";
import { useLocation } from "react-router";

function UserDashbord() {
  const location = useLocation();
  const userName = location.state.name;
  return <Layout>{userName} Profile</Layout>;
}

export default UserDashbord;
