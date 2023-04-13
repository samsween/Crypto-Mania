import { useState } from "react";
import { useQuery } from "react-query";
import { Modal } from "../../components/Modal";
import { SellForm } from "./components/SellForm";
const Wallet = () => {
  const [currentSelected, setCurrentSelected] = useState({});
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useQuery("wallet", () =>
    fetch("/api/crypto").then((res) => res.json())
  );
  console.log(data);
  if (isLoading) return <h1>Loading...</h1>;
  return (
    <div className="w-full h-full flex flex-col justify-center gap-20">
      <h1 className="text-2xl text-center pt-20 text-gray-300">Wallet</h1>
      <div className="px-20">
        <table className="w-full h-full">
          <thead>
            <tr className="text-gray-300">
              <th className="w-1/4">Name</th>
              <th className="w-1/4">Symbol</th>
              <th className="w-1/4">Amount</th>
              <th>Value</th>
              <th className="w-1/4">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((crypto) => (
              <tr className=" border text-xl text-orange-500" key={crypto._id}>
                <td>{crypto.name} </td>
                <td>{crypto.symbol}</td>
                <td>{crypto.total}</td>
                <td>
                  $
                  {(
                    parseFloat(crypto.total) * parseFloat(crypto.current_price)
                  ).toFixed(1)}
                </td>
                <td>
                  <button
                    onClick={() => {
                      setCurrentSelected(() => ({
                        symbol: crypto.symbol,
                        id: crypto.id,
                      }));
                      setOpen(true);
                    }}
                  >
                    Sell
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal open={open} setOpen={setOpen}>
        <SellForm {...currentSelected} />
      </Modal>
    </div>
  );
};

export default Wallet;
