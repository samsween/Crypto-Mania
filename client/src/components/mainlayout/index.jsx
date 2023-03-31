import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../../context/authContext";
import { Menu2 } from "tabler-icons-react";
import { AnimatePresence } from "framer-motion";
import { SideMenu } from "./SideMenu";
import { useState } from "react";
import { MobileMenu } from "./mobileMenu";
const MainLayout = () => {
  const { user } = useUser();
  const [mobileMenu, setMobileMenu] = useState(false);
  if (!user) return <Navigate to="/login" />;
  return (
    <div className="flex">
      <aside className="w-80 bg-primary-100  gap-2 flex-col min-h-sceen hidden lg:flex">
        <SideMenu />
      </aside>
      <div className="flex-1 w-full min-h-screen bg-primary-300">
        <header className="w-full h-20 text-gray-200 items-center bg-primary-100 flex justify-between lg:justify-end">
          <div className="lg:hidden flex px-4">
            <Menu2 onClick={() => setMobileMenu(true)} />
            <MobileMenu open={mobileMenu} setOpen={setMobileMenu} />
          </div>
          <div className="md:flex md:pr-8 md:gap-8 items-center md:flex-row flex-col gap-2 px-4 ">
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

export default MainLayout;
