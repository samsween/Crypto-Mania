import { useQuery } from "react-query";

const Market = () => {
  const { error, isLoading, data } = useQuery("market", () => {
    return fetch("http://localhost:3000/api/market").then((res) => res.json());
  });
  return (
    <div>
      <h1>Market</h1>
      {error && <div>Something went wrong</div>}
      {isLoading && <div>Loading...</div>}
    </div>
  );
};

export default Market;
