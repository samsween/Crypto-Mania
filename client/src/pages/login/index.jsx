import { useState } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useUser } from "../../context/authContext";

// Animate background gradient

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const onUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:3000/api/user/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.user) {
          console.log(data);
          setUser(data.user);
          navigate("/");
          return;
        }
        setError(data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  if (user) {
    return <Navigate to="/" />;
  }
  return (
    <div className="w-full h-screen bg-gradient-to-br from-primary-100 to-primary-300 flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className=" py-10 px-10 bg-primary-300 rounded-md border border-primary-200  text-gray-400  "
      >
        <form className="w-full p-4 flex flex-col gap-8" onSubmit={onSubmit}>
          <h1 className="text-4xl tracking-wide text-center text-orange-500">
            Welcome Back
          </h1>

          <div className="w-full h-full flex flex-col gap-4">
            <div className="w-full gap-2">
              <label htmlFor="email">Username</label>
              <input
                onChange={onUsernameChange}
                type="text"
                placeholder="username102"
                name="username"
                id="username"
                className="w-full text-gray-300 focus:outline-none h-10 py-2 bg-transparent placeholder:text-gray-600 border-b border-primary-200"
              />
            </div>
            <div className="w-full gap-2">
              <label htmlFor="password">Password</label>
              <input
                onChange={onPasswordChange}
                type="password"
                name="password"
                placeholder="********"
                id="password"
                className="w-full text-gray-300 focus:outline-none h-10 py-2 bg-transparent placeholder:text-gray-600 border-b border-primary-200"
              />
            </div>
          </div>
          <div>
            <button className="w-full h-10 border border-primary-200 hover:border-orange-500  duration-200 text-white rounded-md">
              Login
            </button>
            <p className="text-center pt-2 h-2 text-red-500">{error}</p>
          </div>

          <div className="flex flex-col gap-4">
            <Link to={"/signup"} className="text-center">
              Don't have an account?{" "}
              <span className="text-orange-500 hover:underline">Sign Up</span>
            </Link>
            <p className="text-center text-orange-500 hover:underline">
              Continue as a guest
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
