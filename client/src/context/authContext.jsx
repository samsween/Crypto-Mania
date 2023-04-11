import { createContext, useContext, useState } from "react";
import { useQuery } from "react-query";
import auth from "../utils/authService";
import { LoadingPage } from "../components/LoadingPage";
const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const {isLoading} = useQuery(
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
  if (isLoading) return <LoadingPage />;
  return (
    <AuthContext.Provider value={{ user, setUser}}>
      <div>
      {children}
      </div>
    </AuthContext.Provider>
  );
};

export const useUser = () => useContext(AuthContext);
