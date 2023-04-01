import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useUser } from "../../context/authContext";
import authService from "../../utils/authService";
import { useInput } from "../../hooks/useInput";
import {
  validateEmail,
  validatePassword,
  validateUsername,
} from "./utils/validateInputs";

const Register = () => {
  const { user, setUser } = useUser();
  const username = useInput("", validateUsername);
  const password = useInput("", validatePassword);
  const email = useInput("", validateEmail);
  const onSubmit = (e) => {
    e.preventDefault();
  };
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
            <div className="w-full gap-2">
              <label htmlFor="email">Username</label>
              <input
                onChange={username.onChange}
                type="text"
                name="username"
                id="username"
                placeholder="username102"
                className="w-full text-gray-300 focus:outline-none h-10 py-2 bg-transparent placeholder:text-gray-600 border-b border-primary-200"
              />
            </div>
            <div className="w-full gap-2">
              <label htmlFor="email">Email</label>
              <input
                type={"email"}
                name={"email"}
                placeholder="johnsmith@email.com"
                id={"email"}
                className="w-full text-gray-300 focus:outline-none h-10 py-2 bg-transparent placeholder:text-gray-600 border-b border-primary-200"
              />
            </div>

            <div className="w-full gap-2">
              <label htmlFor="password">Password</label>
              <input
                onChange={password.onChange}
                type="password"
                name="password"
                placeholder="********"
                id="password"
                className="w-full text-gray-300 focus:outline-none h-10 py-2 bg-transparent placeholder:text-gray-600 border-b border-primary-200"
              />
            </div>
            <div className="w-full gap-2">
              <label htmlFor="password">Confirm password</label>
              <input
                onChange={() => {}}
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
              Signup
            </button>
            <p className="text-center pt-2 h-2 text-red-500">
              {password.errors?.map((error) => (
                <span key={error}>{error}</span>
              ))}
            </p>
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
