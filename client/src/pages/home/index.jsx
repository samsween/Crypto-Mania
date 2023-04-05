import { Navigate } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <Navigate to="/market" />
    </div>
  );
};

export default Home;
