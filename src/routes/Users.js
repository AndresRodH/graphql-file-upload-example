import React from "react";
import Avatar from "../components/Avatar";
import useProfile from "../hooks/useProfile";
import { Link } from "react-router-dom";

/**
 * @param string[] allowedRoles roles que pueden ver contenido
 * @returns boolean
 */
function isAdmin(allowedRoles) {
  return allowedRoles.some(role => role === "Admin");
}

const users = [
  {
    firstName: "Andres",
    lastName: "Rodriguez"
  },
  {
    firstName: "Jose",
    lastName: "Perez"
  },
  {
    firstName: "Andres",
    lastName: "Ventura"
  },
  {
    firstName: "Manuel",
    lastName: "Rodriguez"
  }
];

export default function Users() {
  const profile = useProfile();
  return isAdmin(profile.roles) ? (
    <>
      <h2>Users</h2>
      {users.map((user, index) => (
        <Avatar key={index} {...user} />
      ))}
    </>
  ) : (
    <>
      <h2 style={{ color: "red" }}>You have no permissions to see this page</h2>
      <Link to="/">Go back to Home</Link>
    </>
  );
}
