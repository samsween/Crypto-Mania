import { motion } from "framer-motion";
export const PriceTable = ({ data }) => {
  return (
    <table>
      <tbody className="w-full text-sm lg:text-xl">
        {data.map((item, index) => (
          <motion.tr
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="border-b border-orange-500 border-opacity-40 py-8 whitespace-nowrap"
            key={item.name}
          >
            <td>{item.name}</td>
            <td className="px-8">{item.value}</td>
          </motion.tr>
        ))}
      </tbody>
    </table>
  );
};
