import { useState } from "react";
import { useQuery } from "react-query";
import { Graph } from "./Graph";
import { Loader } from "../../../../components/Loader";
import cryptoService from "../../../../utils/cryptoService";

const TIMES = {
  "1D": "1",
  "1W": "7",
  "1M": "30",
  "1Y": "365",
};

const PRICES = {
  prices: "prices",
  market_caps: "market_caps",
  total_volumes: "total_volumes",
};

const CryptoGraph = ({ id }) => {
  const [time, setTime] = useState(TIMES["1D"]);
  const [type, setType] = useState("prices");
  const { data, isLoading, error } = useQuery([id, time], () => {
   return cryptoService.getHistoricalMarket(id, time);
  });
  return (
    <div className="relative w-full h-fq">
      <div className="absoulte top-0 left-0 flex px-2 w-full  justify-between">
        <ul className="flex gap-4">
          {Object.keys(PRICES).map((key) => {
            return (
              <li
                className={`${
                  type === key
                    ? "bg-primary-100 text-orange-500"
                    : "bg-primary-100 text-gray-300"
                }`}
                onClick={() => setType(key)}
                key={key}
              >
                {key.replace("_", " ").toUpperCase()}
              </li>
            );
          })}
        </ul>
        <ul className="flex gap-4">
          {Object.keys(TIMES).map((key) => {
            return (
              <li
                className={`${
                  time === TIMES[key]
                    ? "bg-primary-100 text-orange-500"
                    : "bg-primary-100 text-gray-300"
                }`}
                onClick={() => setTime(TIMES[key])}
                key={key}
              >
                {key}
              </li>
            );
          })}
        </ul>
      </div>

      {isLoading ? (
        <div className="w-full h-[250px] flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <Graph data={data[type]} time={time} />
      )}
    </div>
  );
};

export default CryptoGraph;
