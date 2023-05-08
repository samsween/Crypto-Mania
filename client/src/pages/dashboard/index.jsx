import { useQuery } from "react-query";
import cryptoService from "../../utils/cryptoService";
import { useMemo } from "react";
import { AnimatePrice } from "../../components/AnimatePrice";
import { useUser } from "../../context/authContext";

export const Dashboard = () => {
  const { user } = useUser();
  const { data, isLoading, refetch } = useQuery(
    "wallet",
    () => cryptoService.getUserCrypto(),
    { refetchInterval: 60 * 1000 }
  );

  const totalWalletValue = useMemo(() => {
    return data?.reduce((acc, crypto) => {
      return acc + crypto.total * crypto.current_price;
    }, 0);
  }, [data]);
  const priceChange = useMemo(() => {
    // Formula is (a - b)/ b * 100
    return (((totalWalletValue + user?.money) - 50000) / 50000) * 100
  }, [totalWalletValue, user?.money])
  return (
    <div className="w-full h-full">
      <h1 className="text-center py-20 text-gray-200 text-2xl">Dashboard</h1>
      <div className="px-20 flex justify-between text-gray-300">
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
          <div className={priceChange < 0 ? "text-red-500" : "text-green-500"}>
          %<AnimatePrice price={priceChange} />
          </div>
        </div>
        </div>
    
     
      </div>
    </div>
  );
};
