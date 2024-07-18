/* eslint-disable react/prop-types */
import { createContext } from "react";
import { useUser } from "@clerk/clerk-react";
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { user } = useUser();
  const name = user?.fullName;
  const email = user?.primaryEmailAddress.emailAddress;
  return (
    <UserContext.Provider value={{ email, name }}>
      {children}
    </UserContext.Provider>
  );
};
export { UserContext };
