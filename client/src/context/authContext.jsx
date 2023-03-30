import { createContext, useContext, useState } from "react";
import { useQuery } from "react-query";

const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { error, data, isLoading } = useQuery(
    "auth",
    () => {
      return fetch("http://localhost:3000/api/user/auth")
        .then((res) => res.json())
        .catch((err) => {
          console.log(err);
          return null;
        });
    },
    {
      onSuccess: (data) => {
        if (!data.message) {
          setUser(data);
        }
      },
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
