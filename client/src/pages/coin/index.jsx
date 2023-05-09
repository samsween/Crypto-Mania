import { useLocation, useParams } from "react-router-dom";
import CryptoGraph from "./components/graph/CryptoGraph";
import socket from "../../utils/socket";
import { useEffect, useState } from "react";
import { PriceTable } from "./components/PriceTable";
import { PriceTableSkeleton } from "./components/PriceTableSekeleton";
import { AnimatePrice } from "../../components/AnimatePrice";
import { Modal } from "../../components/Modal";
import { BuyForm } from "./components/BuyForm";
const Coin = () => {
  const [price, setPrice] = useState({});
  const [open, setOpen] = useState(false);

  const {
    state: { coin },
  } = useLocation();
  const { id } = useParams();
  useEffect(() => {
    const onPrice = (value) => {
      console.log(value);
      setPrice(value);
    };
    socket.emit("get-price", id);
    socket.on("price", onPrice);
    return () => {
      socket.off("price", onPrice);
      socket.emit("leave-room", id);
    };
  }, []);
  return (
    <div className="w-full h-full">
      <div className="w-[90%] h-full flex flex-col gap-20 m-auto">
        <div className="pt-20 flex justify-between items-center w-full">
          <div className="flex gap-8 items-center">
            <h1 className="text-3xl font-bold text-orange-500">{coin.name}</h1>
            <img src={coin.image} alt={coin.name} className="w-10" />
          </div>
          {price?.price && (
            <div className="text-orange-500 text-3xl">
              $<AnimatePrice price={parseFloat(price.price)} />
            </div>
          )}
        </div>
        <CryptoGraph id={id} />
        <div className="flex w-ful gap-8">
          <button
            className="bg-orange-500 w-full text-primary-100 py-4 rounded-md"
            onClick={() => {
              setOpen(true);
            }}
          >
            Buy
          </button>
        </div>
        <div className=" w-full bg-primary-100 p-10 text-gray-300">
          <div className="px-10 flex justify-between m-auto text-xl">
            {price.data ? (
              <>
                <PriceTable data={price?.data?.slice(0, 4)} />
                <PriceTable data={price?.data?.slice(4)} />
              </>
            ) : (
              <>
                <PriceTableSkeleton numRows={4} />
                <PriceTableSkeleton numRows={4} />
              </>
            )}
          </div>
        </div>
      </div>
      <Modal open={open} setOpen={setOpen}>
        <BuyForm setOpen={setOpen} coin={coin} currentPrice={price?.price} />
      </Modal>
    </div>
  );
};

export default Coin;
