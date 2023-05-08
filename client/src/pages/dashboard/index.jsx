import { useQuery } from "react-query";
import cryptoService from "../../utils/cryptoService";
import { useMemo } from "react";
import { AnimatePrice } from "../../components/AnimatePrice";
import { useUser } from "../../context/authContext";
import { Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
export const Dashboard = () => {
  const { user } = useUser();
  const { data, isLoading, refetch } = useQuery(
    "wallet",
    () => cryptoService.getUserCrypto(),
    { refetchInterval: 60 * 1000 }
  );

  const total = useMemo(() => {
    return data?.map((crypto) => {
      const totalValue = (
        parseFloat(crypto.total) * parseFloat(crypto.current_price)
      ).toFixed(2);
      return { ...crypto, totalValue: parseFloat(totalValue) };
    });
  }, [data]);
  console.log(total);
  const totalWalletValue = useMemo(() => {
    return data?.reduce((acc, crypto) => {
      return acc + crypto.total * crypto.current_price;
    }, 0);
  }, [data]);
  const priceChange = useMemo(() => {
    // Formula is (a - b)/ b * 100
    return ((totalWalletValue + user?.money - 50000) / 50000) * 100;
  }, [totalWalletValue, user?.money]);
  return (
    <div className="w-full h-full">
      <h1 className="text-center py-20 text-gray-200 text-2xl">Dashboard</h1>
      <div className="px-20 flex justify-between items-center text-gray-300">
        <div className="flex flex-col gap-8 ">
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
        <div className="">
          <h1 className="text-center text-gray-300">Your Crypto</h1>
        <ResponsiveContainer height={300} width={300}>
          <PieChart>
            {!isLoading && (
              <Pie
                data={total}
                dataKey="totalValue"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="rgb(249 115 22)"
                label
              />
            )}
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
