import { useLocation, useParams } from "react-router-dom";
import CryptoGraph from "./components/graph/CryptoGraph";

const Coin = () => {
  const {
    state: { coin },
  } = useLocation();
  const { id } = useParams();
  return (
    <div className="w-full h-full">
      <div className="w-[90%] h-full flex flex-col gap-20 m-auto">
        <div className="pt-20 flex justify-center items-center w-full gap-8">
          <h1 className="text-3xl font-bold text-orange-500">{coin.name}</h1>
          <img src={coin.image} alt={coin.name} className="w-10" />
        </div>
        <CryptoGraph id={id} />
        <div className="flex w-ful gap-8">
          <button className="bg-orange-500 w-full text-primary-100 py-4 rounded-md">
            Buy
          </button>
          <button className="bg-primary-100 w-full  text-orange-500  border border-orange-500 py-4 rounded-md">
            Sell
          </button>
        </div>
        <div className=" w-full bg-primary-100">
          {/* 
            Add table with real time coin data
         */}
        </div>
      </div>
    </div>
  );
};

export default Coin;
