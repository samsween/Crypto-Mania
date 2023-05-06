import { useMemo, useState } from "react";
import { useQuery } from "react-query";
import { sortData } from "./utils/sortData";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUp } from "tabler-icons-react";

// Data looks like this
/*
{"price":43611.57,"quantity":0.20693519,"date":"04/05/2023 18:17:25","_id":"64536a15e5490eac52b29a99","id":"64536a15e5490eac52b29a99","type":"sold","name":"Bitcoin","symbol":"btc"}
*/

const SORT_FUNCTIONS = {
  date: (a, b) => {
    return new Date(b.date) - new Date(a.date);
  },
  price: (a, b) => {
    return b.price - a.price;
  },
  quantity: (a, b) => {
    return b.quantity - a.quantity;
  },
  total: (a, b) => {
    return b.price * b.quantity - a.price * a.quantity;
  },
  coin: (a, b) => {
    return a.name.localeCompare(b.name);
  },
  type: (a, b) => {
    return a.type.localeCompare(b.type);
  },
};

const SORT_OPTIONS = {
  date: "date",
  type: "type",
  coin: "coin",
  price: "price",
  quantity: "quantity",
  total: "total",


};

const SORT_TYPES = {
  asc: (sortFunction) => sortFunction,
  desc: (sortFunction) => (a, b) => sortFunction(b, a),
};

export const Transactions = () => {
  const [sortOption, setSortOption] = useState(SORT_OPTIONS.price);
  const [sortType, setSortType] = useState("asc");
  const { data } = useQuery("transactions", () => {
    return fetch("/api/crypto/transactions").then((res) => res.json());
  });
  const sortedData = useMemo(() => {
    if (!data) return [];
    return sortData(data);
  }, [data]);
  const handleClick = (type) => {
    setSortOption(type);
    setSortType((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  return (
    <div className="w-full h-full">
      <h1 className="text-center py-20 text-gray-200 text-2xl">Transactions</h1>
      <div className="px-20 text-gray-300  py-10">
        <table className="table table-auto w-full p-10 bg-primary-100 border-l border-r text-2xl  border-orange-500">
          <thead>
            <tr>
              {/*  <th className="cursor-pointer" onClick={() => handleClick(SORT_OPTIONS.date)}> */}
              {Object.keys(SORT_OPTIONS).map((option) => (
                <th
                  className="cursor-pointer "
                  onClick={() => handleClick(SORT_OPTIONS[option])}
                >
                  <div className="flex px-2 justify-between">
                    {SORT_OPTIONS[option]}
                    {sortOption === SORT_OPTIONS[option] &&
                      (sortType === "asc" ? <ArrowUp /> : <ArrowDown />)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData
              .sort(SORT_TYPES[sortType](SORT_FUNCTIONS[sortOption]))
              .map((transaction, index) => (
                <motion.tr
                  key={transaction._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <td>{transaction.date}</td>
                  <td
                    className={
                      transaction.type === "sold"
                        ? "text text-red-500"
                        : "text text-green-500 "
                    }
                  >
                    {transaction.type}
                  </td>
                  <td>{transaction.name}</td>
                  <td>${transaction.price}</td>
                  <td>{transaction.quantity}</td>
                  <td>
                    ${(transaction.price * transaction.quantity).toFixed(2)}
                  </td>
                </motion.tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
