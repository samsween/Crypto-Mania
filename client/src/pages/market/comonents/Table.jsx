const SORT_OPTIONS = {
  name: "name",
  price: "price",
  price_change_percentage_24h: "price_change_percentage_24h",
  market_cap: "market_cap",
  total_volume: "total_volume",
  circulating_supply: "circulating_supply",
  total_supply: "total_supply",
};

export const Table = ({ children, handleClick }) => {
  return (
    <table className=" table-auto text-gray-300 text-xs lg:text-sm 2xl:text-lg">
      <thead>
        <tr>
          <th
            className="px-4 py-2"
            onClick={() => {
              handleClick(SORT_OPTIONS.name);
            }}
          >
            Name
          </th>
          <th
            className="px-4 py-2"
            onClick={() => {
              handleClick(SORT_OPTIONS.price);
            }}
          >
            Price
          </th>
          <th
            className="px-4 py-2"
            onClick={() => {
              handleClick(SORT_OPTIONS.price_change_percentage_24h);
            }}
          >
            Price Change (24h)
          </th>
          <th
            className="px-4 py-2 hidden sm:table-cell"
            onClick={() => {
              handleClick(SORT_OPTIONS.market_cap);
            }}
          >
            Market Cap
          </th>
          <th
            className="px-4 py-2 hidden md:table-cell"
            onClick={() => {
              handleClick(SORT_OPTIONS.total_volume);
            }}
          >
            Volume
          </th>
          <th
            className="px-4 py-2 hidden md:table-cell"
            onClick={() => {
              handleClick(SORT_OPTIONS.circulating_supply);
            }}
          >
            Circulating Supply
          </th>
          <th
            className="px-4 py-2 hidden xl:table-cell"
            onClick={() => {
              handleClick(SORT_OPTIONS.total_supply);
            }}
          >
            Total Supply
          </th>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};
