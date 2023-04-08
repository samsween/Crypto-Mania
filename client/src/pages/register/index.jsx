import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useUser } from "../../context/authContext";
import authService from "../../utils/authService";
import { useInput } from "../../hooks/useInput";
import {
  validateEmail,
  validatePassword,
  validateUsername,
} from "./utils/validateInputs";
import { RegisterInput } from "./components/RegisterInput";
import { useState } from "react";

const Register = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const username = useInput("", validateUsername);
  const password = useInput("", validatePassword);
  const email = useInput("", validateEmail);
  const [error, setError] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    if (!username.value || !password.value || !email.value) return;
    authService
      .register({
        username: username.value,
        password: password.value,
        email: email.value,
      })
      .then((data) => {
        setUser(data.user);
        navigate("/");
      })
      .catch((err) => {
        setError(err);
      });
  };
  if (user) navigate("/");
  return (
    <div className="w-full h-screen bg-gradient-to-br from-primary-100 to-primary-300 flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className=" py-10 px-10 bg-primary-300 rounded-md border border-primary-200  text-gray-400 "
      >
        <form className="w-full p-2 flex flex-col gap-8" onSubmit={onSubmit}>
          <h1 className="text-4xl tracking-wide text-center text-orange-500">
            Sign up
          </h1>

          <div className="w-full h-full flex flex-col gap-4">
            <RegisterInput
              id={"username"}
              label={"Username"}
              placeholder={"username102"}
              type={"text"}
              {...username}
            />
            <RegisterInput
              id={"email"}
              label={"Email"}
              placeholder={"johnsmith@email.com"}
              type={"email"}
              {...email}
            />
            <RegisterInput
              id={"password"}
              label={"Password"}
              placeholder={"********"}
              type={"password"}
              {...password}
            />
          </div>
          <div>
            <button className="w-full h-10 border border-primary-200 hover:border-orange-500  duration-200 text-white rounded-md">
              Signup
            </button>
            {error && (
              <div className="h-2 text-center pt-1 text-red-500">{error}</div>
            )}
          </div>
          <div className="flex flex-col gap-4">
            <Link
              to={"/login"}
              className="text-center text-orange-500 hover:underline"
            >
              {" "}
              Back to Login
            </Link>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Register;
