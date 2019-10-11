import React from "react";

// hidden from implementation
const UserProfileContext = React.createContext();

export function UserProfileProvider({ children }) {
  // 1. call server for data
  // 2. save profile in state
  // 3. return profile
  const [profile, setProfile] = React.useState();

  // 1.
  React.useEffect(() => {
    setTimeout(
      () =>
        // 2.
        setProfile({
          firstName: "Andres",
          lastName: "Rodriguez",
          roles: ["Admin", "RRHH", "Finanzas"]
        }),
      1000
    );
  }, []);

  // 3.
  return (
    <UserProfileContext.Provider value={profile}>
      {children}
    </UserProfileContext.Provider>
  );
}

export default function useProfile() {
  const profile = React.useContext(UserProfileContext);
  return profile;
}
