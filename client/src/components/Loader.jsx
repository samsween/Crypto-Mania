import { motion } from "framer-motion";

export const Loader = () => {
  return (
    <motion.svg
      initial={{ rotate: 0 }}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-currency-bitcoin text-orange-500 bg-white rounded-full "
      width={50}
      height={50}
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M6 6h8a3 3 0 0 1 0 6a3 3 0 0 1 0 6h-8"></path>
      <path d="M8 6l0 12"></path>
      <path d="M8 12l6 0"></path>
      <path d="M9 3l0 3"></path>
      <path d="M13 3l0 3"></path>
      <path d="M9 18l0 3"></path>
      <path d="M13 18l0 3"></path>
    </motion.svg>
  );
};
