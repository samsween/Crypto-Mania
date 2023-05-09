import { AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
export const Modal = ({ open, setOpen, children }) => {
  const containeRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containeRef.current && !containeRef.current.contains(e.target)) {
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
  }, [containeRef, setOpen]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="w-full h-screen absolute top-0 left-0  bg-black bg-opacity-40 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.2,
              type: "spring",
              stiffness: 500,
              damping: 15,
              mass: 0.4,
            }}
            className="w-full md:w-3/4 lg:w-1/2 h-1/2 bg-white rounded-lg shadow-lg m-auto"
            ref={containeRef}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
