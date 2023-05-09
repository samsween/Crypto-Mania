import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const WalletData = ({ crypto, index, setOpen, setCurrentSelected }) => {
  return (
    <motion.tr
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.02 }}
      key={crypto.id}
      className={index % 2 === 0 ? "bg-primary-300" : "bg-primary-100"}
    >
      <td className="flex justify-between px-8">
        {crypto.name}
        <img
          src={crypto.image}
          alt="crypto"
          className="w-8 h-8 hidden md:flex"
        />
      </td>
      <td className="hidden md:table-cell">{crypto.symbol}</td>
      <td>{crypto.total}</td>
      <td className="hidden md:table-cell">
        $
        {(parseFloat(crypto.total) * parseFloat(crypto.current_price)).toFixed(
          1
        )}
      </td>
      <td className="flex justify-center items-center md:justify-between flex-col md:flex-row">
        <button
          onClick={() => {
            setCurrentSelected(() => ({
              symbol: crypto.symbol,
              id: crypto.crypto_id,
              total: crypto.total,
            }));
            setOpen(true);
          }}
        >
          Sell
        </button>
        <Link
          to={"/market/" + crypto.crypto_id}
          state={{ coin: { name: crypto.name, image: crypto.image } }}
        >
          Buy
        </Link>
      </td>
    </motion.tr>
  );
};
