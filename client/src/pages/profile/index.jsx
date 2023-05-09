import { useQuery } from "react-query";
import authService from "../../utils/authService";
import { Loader } from "../../components/Loader";
import { useState } from "react";

export const Profile = () => {
  const { data, isLoading, refetch } = useQuery("profile", () => {
    return authService.info();
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    const regex = /^[a-zA-Z0-9]+$/;
    if (!regex.test(e.target.username.value)) {
      return setError("Username must be alphanumeric");
    }
    setError("");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(e.target.email.value)) {
      return setError("Email is not valid");
    }
    setError("");
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    authService
      .update(data)
      .then((data) => {
        refetch();
        setSuccess("Profile updated successfully");
      })
      .catch((err) => {
        setError(err);
      });
  };
  if (isLoading) return <Loader />;

  return (
    <div className="w-full h-full text-gray-200">
      <h1 className="py-20 text-center text-gray-200 text-2xl">PROFILE</h1>
      <div className="w-full flex justify-center items-center">
        <form
          className="w-1/2 text-xl flex flex-col gap-10 p-8 border shadow-md shadow-gray-700"
          onSubmit={onSubmit}
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="username">Username</label>
              <input
                defaultValue={data?.username}
                name="username"
                id="username"
                className="w-full h-10 px-2 bg-transparent border-b border-orange-500"
                type="text"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email">Email</label>
              <input
                defaultValue={data?.email}
                name="email"
                id="email"
                className="w-full h-10 px-2 bg-transparent border-b border-orange-500"
                type="email"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password">Password</label>
              <input
                name="password"
                id="password"
                className="w-full h-10 px-2 bg-transparent border-b border-orange-500"
                type="password"
              />
            </div>
            <button className="bg-orange-500 w-full text-primary-100 mt-8 py-4 rounded-md">
              Update
            </button>
            <p className="text-center text-red-500">{error}</p>
            <p className="text-center text-green-500">{success}</p>
          </div>
        </form>
      </div>
    </div>
  );
};
