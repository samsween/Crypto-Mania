import { useEffect, useState } from "react";
import socket from "../../../utils/socket";
import { Loader } from "../../../components/Loader";

export const SellForm = ({ id, symbol, total }) => {
  const [price, setPrice] = useState(null);
  const [totalToSell, setTotalToSell] = useState("0");
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

  const onTotalToSellChange = (e) => {
    const regex = /^[0-9\b]+$/;
    if ( regex.test(e.target.value)) {
      setVal(e.target.value);
    }
    if (isNaN(e.target.value)) return setTotalToSell(0);
    if (e.target.value > total) {
      setTotalToSell(total);
    } else {
      setTotalToSell(e.target.value);
    }
    if (e.target.value < 0) {
      setTotalToSell(0);
    }
  };
  return (
    <div className="w-full h-full bg-primary-100 p-10 text-gray-300">
      <form>
        <h1 className="text-2xl font-bold text-center flex w-full items-center justify-center gap-8">
          Current Price:{" "}
          {price ? (
            price
          ) : (
            <span>
              <Loader />
            </span>
          )}
        </h1>
        <h2 className="text-xl font-bold text-center flex w-full items-center justify-center gap-8">
          Your wallet: {total}
        </h2>
        <div>
          <label className="text-xl" htmlFor="total">
            Amount
          </label>
          <input
            value={totalToSell}
            onChange={onTotalToSellChange}
            name="total"
            id="total"
            className="w-full h-10  px-2 bg-transparent border-b border-orange-500"
            type="number"
          />
        </div>
      </form>
      <div className="flex justify-center mt-10">
        <button className="bg-orange-500 w-[90%] text-primary-100 py-4 rounded-md">
          Sell {symbol.toUpperCase()}
        </button>
      </div>
    </div>
  );
};
