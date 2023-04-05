export const Table = ({ children }) => {
  return (
    <table className=" table-auto text-gray-300 text-xs lg:text-sm 2xl:text-lg">
      <thead>
        <tr>
          <th className="px-4 py-2">Name</th>
          <th className="px-4 py-2">Price</th>
          <th className="px-4 py-2">Price Change (24h)</th>
          <th className="px-4 py-2 hidden sm:table-cell">Market Cap</th>
          <th className="px-4 py-2 hidden md:table-cell">Volume</th>
          <th className="px-4 py-2 hidden md:table-cell">Circulating Supply</th>
          <th className="px-4 py-2 hidden xl:table-cell">Total Supply</th>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};
