import { useQuery } from "react-query";
import cryptoService from "../../utils/cryptoService";
import { useMemo } from "react";
import { AnimatePrice } from "../../components/AnimatePrice";
import { useUser } from "../../context/authContext";
import { CryptoPieChart } from "./components/graph/PieChart";
import { sortData } from "../transactions/utils/sortData";

export const Dashboard = () => {
  const { user } = useUser();
  const userCrypto = useQuery("wallet", () => cryptoService.getUserCrypto(), {
    refetchInterval: 60 * 1000,
  });
  const recentTransactions = useQuery("recentTransactions", () =>
    cryptoService.getTransactions()
  );

  const sortedTransactions = useMemo(() => {
    if (!recentTransactions?.data) return null;
    const temp = sortData(recentTransactions?.data);
    return temp?.slice(0, 2);
  }, [recentTransactions?.data]);

  const total = useMemo(() => {
    return userCrypto?.data?.map((crypto) => {
      const totalValue = (
        parseFloat(crypto.total) * parseFloat(crypto.current_price)
      ).toFixed(2);
      return { ...crypto, totalValue: parseFloat(totalValue) };
    });
  }, [userCrypto?.data]);
  const totalWalletValue = useMemo(() => {
    return userCrypto?.data?.reduce((acc, crypto) => {
      return acc + crypto.total * crypto.current_price;
    }, 0);
  }, [userCrypto?.data]);
  const priceChange = useMemo(() => {
    // Formula is (a - b)/ b * 100
    return ((totalWalletValue + user?.money - 50000) / 50000) * 100;
  }, [totalWalletValue, user?.money]);
  return (
    <div className="w-3/4  m-auto h-full">
      <h1 className="text-center py-20 text-gray-200 text-xl">Dashboard</h1>
      <div className="flex justify-between items-center gap-8 text-xl text-gray-300">
        <div className="flex flex-col gap-8  ">
          <div className="flex gap-2">
            <h1>Your Crypto Value:</h1>
            <div className="text-orange-500">
              <AnimatePrice price={totalWalletValue} />
            </div>
          </div>
          <div className="flex gap-2">
            <h1>Your Total Value:</h1>
            <div className="text-orange-500">
              <AnimatePrice price={totalWalletValue + user?.money} />
            </div>
          </div>
          <div className="flex gap-2">
            <h1 className=" text-gray-300 ">Value change (all time)</h1>
            <div
              className={priceChange < 0 ? "text-red-500" : "text-green-500"}
            >
              %<AnimatePrice price={priceChange} />
            </div>
          </div>
        </div>
        <div className="flex justify-center flex-col items-center">
          <h1 className=" text-gray-300 text-md ">Recent Transactions</h1>
          <table className="table-auto w-3/4 text-sm">
            <thead>
              <tr>
                <th className="px-4 py-2 text-gray-300">Date</th>
                <th className="px-4 py-2 text-gray-300">Crypto</th>
                <th className="px-4 py-2 text-gray-300">Amount</th>
                <th className="px-4 py-2 text-gray-300">Price</th>
                <th className="px-4 py-2 text-gray-300">Total</th>
              </tr>
            </thead>
            <tbody>
              {sortedTransactions?.map((transaction, index) => (
                <tr
                  key={transaction.id}
                  className={
                    index % 2 === 0 ? "bg-primary-100" : "bg-primary-300"
                  }
                >
                  <td className=" px-4 py-2 text-gray-300">
                    {transaction.date}
                  </td>
                  <td className=" px-4 py-2 text-gray-300">
                    {transaction.name}
                  </td>
                  <td className=" px-4 py-2 text-gray-300">
                    {transaction.quantity}
                  </td>
                  <td className=" px-4 py-2 text-gray-300">
                    {transaction.price}
                  </td>
                  <td className=" px-4 py-2 text-gray-300">
                    <AnimatePrice
                      price={transaction.quantity * transaction.price}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className=" w-full flex justify-between items-center mt-20">
        <div className="flex flex-col">
          <CryptoPieChart total={total} isLoading={userCrypto?.isLoading} />
        </div>
        <div className="text-4xl flex flex-col justify-center items-center gap-8 w-1/2">
          <div>
            <h1 className="text-center text-gray-300">Current Cash</h1>
            <div className="text-center text-orange-500">
              <AnimatePrice price={user?.money} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
