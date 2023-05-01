import { useMemo, useState } from "react";
import { useQuery } from "react-query";
import { Modal } from "../../components/Modal";
import { SellForm } from "./components/SellForm";
import { AnimatePrice } from "../../components/AnimatePrice";
import { useUser } from "../../context/authContext";
import { Table } from "./components/Table";
import { WalletData } from "./components/WalletData";
const Wallet = () => {
  const [currentSelected, setCurrentSelected] = useState({});
  const [open, setOpen] = useState(false);
  const { user } = useUser();
  const { data, isLoading } = useQuery(
    "wallet",
    () => fetch("/api/crypto").then((res) => res.json()),
    { refetchInterval: 60 * 1000 }
  );
  const totalWalletValue = useMemo(() => {
    if (!data) return null;
    return data.reduce((acc, crypto) => {
      return acc + crypto.total * crypto.current_price;
    }, 0);
  }, [data]);

  if (isLoading) return <h1>Loading...</h1>;
  return (
    <div className="w-full h-full flex flex-col justify-center gap-20">
      <div className="flex flex-col gap-4 px-20 pt-20 text-xl">
        <div className="text-gray-300">
          Total Crypto Value:{" "}
          <span className="text-orange-500">
            $<AnimatePrice price={totalWalletValue} />
          </span>
        </div>
        <div className="text-gray-300">
          Total Value:{" "}
          <span className="text-orange-500">
            $<AnimatePrice price={totalWalletValue + user.money} />
          </span>
        </div>
      </div>
      <h1 className="text-2xl text-center  text-gray-300">Your Wallet</h1>
      <div className="px-20 text-xl">
        <Table>
          {data.map((crypto, index) => (
            <WalletData
              crypto={crypto}
              index={index}
              setCurrentSelected={setCurrentSelected}
              setOpen={setOpen}
            />
          ))}
        </Table>
      </div>
      <Modal open={open} setOpen={setOpen}>
        <SellForm {...currentSelected} />
      </Modal>
    </div>
  );
};

export default Wallet;
