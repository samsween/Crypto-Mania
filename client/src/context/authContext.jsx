const { createContext, useContext, useState } = require("react");
import { useQuery } from "react-query";

const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { error, data, isLoading } = useQuery(
    "auth",
    () => {
      return fetch("http://localhost:3000/api/user/auth").then((res) =>
        res.json()
      );
    },
    {
      onSuccess: (data) => setUser(data),
      onError: (error) => setUser(null),
    }
  );
  if (isLoading) return <div>Loading...</div>;
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useUser = () => useContext(AuthContext);
