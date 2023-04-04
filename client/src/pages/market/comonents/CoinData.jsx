import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const CoinData = ({ coin, index }) => {
  return (
    <motion.tr
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.02 }}
      key={coin.id}
      className={index % 2 === 0 ? "bg-primary-300" : "bg-primary-100"}
    >
      <td className="border px-4 py-2 flex justify-between">
        <Link to={`/market/${coin.id}`} state={{ coin: coin }}>
          <div className="flex flex-col gap-1">
            {coin.name}
            <span className="text-orange-500">{coin.symbol.toUpperCase()}</span>
          </div>
        </Link>
        <img src={coin.image} alt={coin.name} className="w-6 h-6" />
      </td>

      <td className="border px-4 py-2">
        ${parseFloat(coin.current_price).toLocaleString()}
      </td>
      <td className="border px-4 py-2">{coin.price_change_percentage_24h}%</td>
      <td className="border hidden sm:table-cell px-4 py-2">
        ${parseFloat(coin.market_cap).toLocaleString()}
      </td>
      <td className="border hidden md:table-cell px-4 py-2">
        {coin.total_volume}
      </td>
      <td className="border hidden md:table-cell px-4 py-2">
        {coin.circulating_supply}
      </td>
      <td className="border hidden xl:table-cell px-4 py-2">
        {coin.total_supply}
      </td>
    </motion.tr>
  );
};
