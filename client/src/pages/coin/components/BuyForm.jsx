import { useState } from "react";
import { useUser } from "../../../context/authContext";

export const BuyForm = ({ currentPrice, coin, setOpen }) => {
  const { user, setUser } = useUser();
  const [amount, setAmount] = useState(0);
  const [total, setTotal] = useState("");
  const onAmountChange = (e) => {
    e.target.classList.remove("border-red-500");
    if (e.target.value === "") {
      setAmount("");
      setTotal("");
      return;
    }
    if (isNaN(e.target.value)) {
      e.preventDefault();
      return;
    }
    if (parseFloat(e.target.value) > user.money) {
      e.preventDefault();
      setAmount(user.money);
      setTotal((user.money / currentPrice).toFixed(8));
      e.target.classList.add("border-red-500");
      return;
    }

    setAmount(e.target.value);
    setTotal((parseFloat(e.target.value) / currentPrice).toFixed(8));
  };
  const onSubmit = (e) => {
    e.preventDefault();
    fetch("/api/crypto", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        name: coin.name,
        symbol: coin.symbol,
        quantity: total,
        image: coin.image,
        price: amount,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.crypto) {
          setUser({
            ...user,
            money: data.money,
          });
          setOpen(false);
        }
      });
  };
  return (
    <div className="w-full h-full bg-primary-100 border border-gray-300 text-gray-200 flex flex-col p-4">
      <div className="w-full flex text-2xl flex-col gap-8 items-center justify-center">
        <h1>
          {coin.name} ({coin?.symbol?.toUpperCase()})
        </h1>
        <h2 className="text-xl border-b border-orange-500">
          Current price: {currentPrice}
        </h2>
      </div>
      <form
        className="w-full h-full py-10 flex flex-col gap-16 justify-center items-center"
        onSubmit={onSubmit}
      >
        <div className="w-full flex  flex-col gap-10">
          <div className="w-full gap-2">
            <input
              onChange={onAmountChange}
              value={amount}
              type="number"
              placeholder="0.00000000"
              name="amount"
              id="amount"
              className="w-full text-center text-gray-300 focus:outline-none h-10 py-2 text-2xl bg-transparent placeholder:text-gray-600 border-b border-primary-200"
            />
          </div>
        </div>
        <div className="w-full px-20  text-2xl flex h-10  justify-between text-center">
          <div>
            Amount of coins:
            <h1 className="text-center text-4xl text-orange-500">{total}</h1>
          </div>
          <div>
            Total:
            <h1 className="text-center text-4xl text-orange-500">${amount}</h1>
          </div>
        </div>
        <button className="w-full h-10 border border-primary-200 hover:border-orange-500 text-2xl duration-200 text-white rounded-md">
          Buy
        </button>
      </form>
    </div>
  );
};
