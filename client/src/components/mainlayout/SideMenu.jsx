import { Link, useLocation } from "react-router-dom";
import {
  User,
  CoinBitcoin,
  Wallet,
  History,
  Settings,
  Logout,
} from "tabler-icons-react";
import { useUser } from "../../context/authContext";
import authService from "../../utils/authService";

export const SideMenu = () => {
  const { setUser } = useUser();
  const router = useLocation();
  const handleLogout = async () => {
    authService.logout().then(() => {
      setUser(null);
      location.reload();
    });
  };
  return (
    <nav className="px-8 py-10 w-full h-full flex justify-between flex-col max-h-screen text-orange-500">
      <h1 className="text-lg md:text-xl">Crypto Mania</h1>
      <div className="h-full py-12 text-sm md:text-lg ">
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
          <Link to={"/market"}>
            <li
              className={`text-gray-400 p-1 items-center flex gap-2 ${
                router.pathname.includes("/market")
                  ? "border border-orange-500"
                  : ""
              }`}
            >
              <CoinBitcoin className="text-orange-500" />
              Market
            </li>
          </Link>
          <Link to={"/wallet"}>
            <li
              className={`text-gray-400 p-1 items-center flex gap-2 ${
                router.pathname === "/wallet" ? "border border-orange-500" : ""
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
                router.pathname === "/profile" ? "border border-orange-500" : ""
              }`}
            >
              <User className="text-orange-500" />
              Profile
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
  );
};
