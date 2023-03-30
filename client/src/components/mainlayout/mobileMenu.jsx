import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { SideMenu } from "./SideMenu";

export const MobileMenu = ({ open, setOpen }) => {
  const containerRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside, {
      capture: true,
    });
    return () => {
      document.removeEventListener("mousedown", handleClickOutside, {
        capture: true,
      });
    };
  }, [containerRef, setOpen]);
  return (
    <AnimatePresence mode="wait">
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed w-full h-screen bg-black bg-opacity-20 top-0 left-0 lg:hidden"
        >
          <aside
            className="w-60 md:w-80 bg-primary-100  gap-2 flex-col min-h-full flex lg:hidden"
            ref={containerRef}
          >
            <SideMenu />
          </aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
