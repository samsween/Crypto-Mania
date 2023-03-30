import { useQuery } from "react-query";

const Market = () => {
  const { error, isLoading, data } = useQuery(
    "market",
    () => {
      return fetch("http://localhost:3000/api/market").then((res) =>
        res.json()
      );
    },
    {
      refetchInterval: 1000,
    }
  );
  return (
    <div>
      <h1>Market</h1>
      {error && <div>Something went wrong</div>}
      {isLoading && <div>Loading...</div>}
      {data && <div>{JSON.stringify(data)}</div>}
    </div>
  );
};

export default Market;
