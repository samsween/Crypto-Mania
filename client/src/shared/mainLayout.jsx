import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import { useUser } from "../context/authContext";
import {
  User,
  CoinBitcoin,
  Wallet,
  History,
  Settings,
  Logout,
} from "tabler-icons-react";
import { AnimatePresence } from "framer-motion";
export const MainLayout = () => {
  const { user, setUser } = useUser();
  const router = useLocation();
  const handleLogout = async () => {
    setUser(null);
    location.reload();
  };
  if (!user) return <Navigate to="/login" />;
  return (
    <div className="flex">
      <aside className="w-80 bg-primary-100 flex gap-2 flex-col min-h-sceen">
        <nav className="px-8 py-10 w-full h-full flex justify-between flex-col max-h-screen text-orange-500">
          <h1 className="text-2xl">Crypto Mania</h1>
          <div className="h-full py-12 text-lg ">
            <p className="text-gray-600 border-dashed p-2 my-4 border-b border-gray-500">
              Game
            </p>
            <ul className="flex flex-col gap-6">
              <Link to={"/dashboard"}>
                <li
                  className={`text-gray-400 p-1 items-center flex gap-2 ${
                    router.pathname === "/dashboard"
                      ? "border border-orange-500"
                      : ""
                  }`}
                >
                  <User className="text-orange-500" />
                  Dashboard
                </li>
              </Link>
              <Link to={"/exchange"}>
                <li
                  className={`text-gray-400 p-1 items-center flex gap-2 ${
                    router.pathname === "/exchange"
                      ? "border border-orange-500"
                      : ""
                  }`}
                >
                  <CoinBitcoin className="text-orange-500" />
                  Exchange
                </li>
              </Link>
              <Link to={"/wallet"}>
                <li
                  className={`text-gray-400 p-1 items-center flex gap-2 ${
                    router.pathname === "/wallet"
                      ? "border border-orange-500"
                      : ""
                  }`}
                >
                  <Wallet className="text-orange-500" />
                  Wallet
                </li>
              </Link>
              <Link to={"/transactions"}>
                <li
                  className={`text-gray-400 p-1 items-center flex gap-2 ${
                    router.pathname === "/transactions"
                      ? "border border-orange-500"
                      : ""
                  }`}
                >
                  <History className="text-orange-500" />
                  Transactions
                </li>
              </Link>
            </ul>
            <p className="text-gray-600 border-dashed my-4 mt-16 p-2 border-b border-gray-500">
              Config
            </p>
            <ul className="flex flex-col gap-6">
              <Link to={"/profile"}>
                <li
                  className={`text-gray-400 p-1 items-center flex gap-2 ${
                    router.pathname === "/profile"
                      ? "border border-orange-500"
                      : ""
                  }`}
                >
                  <User className="text-orange-500" />
                  Profile
                </li>
              </Link>
              <Link to={"/settings"}>
                <li className="text-gray-400 p-1 items-center flex gap-2">
                  <Settings className="text-orange-500" />
                  Settings
                </li>
              </Link>
              <button onClick={handleLogout}>
                <li className="text-gray-400 p-1 items-center flex gap-2">
                  <Logout className="text-orange-500" />
                  Logout
                </li>
              </button>
            </ul>
          </div>

          <div className="flex items-center"> Sam Sweeney 2023 &copy;</div>
        </nav>
      </aside>
      <div className="flex-1 w-full min-h-screen bg-primary-300">
        <header className="w-full h-20 text-gray-200 items-center bg-primary-100 flex justify-end">
          <div className="flex pr-8 gap-8">
            <h1>
              Current cash{" "}
              <span className="text-orange-500">
                ${user?.money?.toFixed(2)}
              </span>
            </h1>
            <h1>
              Signed in as:{" "}
              <span className="text-orange-500">{user?.username}</span>
            </h1>
          </div>
        </header>
        <main className="">
          <AnimatePresence mode="wait">
            <Outlet />
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};
