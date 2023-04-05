import { useQuery } from "react-query";
import { useLocation, useParams } from "react-router-dom";
import { Graph } from "./components/graph/Graph";
import CryptoGraph from "./components/graph/CryptoGraph";

const Coin = () => {
  const {
    state: { coin },
  } = useLocation();
  const { id } = useParams();
  return (
    <div>
      <CryptoGraph id={id} />
    </div>
  );
};

export default Coin;
