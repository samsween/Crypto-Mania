import { useEffect, useState } from "react";
import socket from "../../../utils/socket";
import { Loader } from "../../../components/Loader";

export const SellForm = ({ id, symbol }) => {
  const [price, setPrice] = useState(null);
  useEffect(() => {
    const onPrice = (value) => {
      setPrice(value.price);
    };
    socket.emit("get-price", id);
    socket.on("price", onPrice);
    return () => {
      socket.off("price", onPrice);
      socket.emit("leave-room", id);
    };
  }, []);
  return (
    <div className="w-full h-full bg-primary-100 p-10 text-gray-300">
      <form>
        <h1 className="text-4xl font-bold text-center">Sell</h1>
        <h2 className="text-2xl font-bold text-center flex w-full items-center justify-center gap-8">
          Current Price:{" "}
          {price ? (
            price
          ) : (
            <span>
              <Loader />
            </span>
          )}
        </h2>
      </form>
      <div className="flex justify-center mt-10">
        <button className="bg-orange-500 w-[90%] text-primary-100 py-4 rounded-md">
          Sell {symbol.toUpperCase()}
        </button>
      </div>
    </div>
  );
};
