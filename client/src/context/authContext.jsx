import { createContext, useContext, useState } from "react";
import { useQuery } from "react-query";
import auth from "../utils/authService";
const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useQuery(
    "auth",
    () => {
      return auth.auth();
    },
    {
      retry: false,
      onSuccess: (data) => {
          setUser(data);
      },
    }
  );
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useUser = () => useContext(AuthContext);
