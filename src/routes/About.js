import React from "react";
import useProfile from "../hooks/useProfile";

export default function About() {
  const profile = useProfile();
  return <h2>Hello {profile.firstName}! About Us...</h2>;
}
