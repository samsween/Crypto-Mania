import { useLocation, useParams } from "react-router-dom";
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
