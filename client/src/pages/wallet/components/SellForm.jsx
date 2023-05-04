import { useEffect, useState } from "react";
import socket from "../../../utils/socket";
import { Loader } from "../../../components/Loader";

export const SellForm = ({ id, symbol, total }) => {
  const [price, setPrice] = useState(null);
  const [totalToSell, setTotalToSell] = useState("0");
  const [val, setVal] = useState(0);
  useEffect(() => {
    const onPrice = (value) => {
      setPrice(parseFloat(value.price));
    };
    socket.emit("get-price", id);
    socket.on("price", onPrice);
    return () => {
      socket.off("price", onPrice);
      socket.emit("leave-room", id);
    };
  }, []);

  const onTotalToSellChange = (e) => {
    var countDecimals = function (value) {
      if (Math.floor(value) === value) return 0;
      return value.toString().split(".")[1].length || 0;
    };
    if (isNaN(e.target.value) && e.target.value !== "")
      return setTotalToSell(0);
    if (countDecimals(parseFloat(e.target.value)) > 8) return;
    if (e.target.value > total) {
      setTotalToSell(total.toFixed(8));
    } else {
      setTotalToSell(e.target.value);
    }
    if (e.target.value < 0) {
      setTotalToSell(0);
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (totalToSell > total) return;
    fetch("/api/crypto/sell", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        symbol: symbol,
        quantity: totalToSell,
        price: price,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };
  return (
    <div className="w-full h-full bg-primary-100 p-10 flex flex-col justify-between  text-gray-300">
      <form onSubmit={onSubmit}>
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
          Your wallet: {parseFloat(total).toFixed(8)}
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
            className="w-full h-10 px-2 bg-transparent border-b border-orange-500"
            type="number"
          />
        </div>
        <div className="flex justify-center items-center">
          <button className="bg-orange-500 w-[90%] text-primary-100 mt-8 py-4 rounded-md">
            Sell {symbol.toUpperCase()}
          </button>
        </div>
      </form>
      <h1 className="text-2xl font-bold text-center flex w-full items-center justify-center gap-8">
        Total Sell Value:
        {price ? (
          <span>${parseFloat(price * totalToSell).toFixed(8)}</span>
        ) : (
          <span>
            <Loader />
          </span>
        )}
      </h1>
    </div>
  );
};
