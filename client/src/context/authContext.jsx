import { createContext, useContext, useState } from "react";
import { useQuery } from "react-query";
import auth from "../utils/authService";
const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { error, data, isLoading } = useQuery(
    "auth",
    () => {
      return auth.auth();
    },
    {
      retry: false,
      onSuccess: (data) => {
        if (!data.message) {
          setUser(data);
        }
      },
      onError: (error) => setUser(null),
    }
  );
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useUser = () => useContext(AuthContext);
