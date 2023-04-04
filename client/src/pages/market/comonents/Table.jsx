export const Table = ({ children }) => {
  return (
    <table className=" table-auto text-gray-300 text-sm">
      <thead>
        <tr>
          <th className="px-4 py-2">Name</th>
          <th className="px-4 py-2">Price</th>
          <th className="px-4 py-2">Price Change (24h)</th>
          <th className="px-4 py-2">Market Cap</th>
          <th className="px-4 py-2">Volume</th>
          <th className="px-4 py-2">Circulating Supply</th>
          <th className="px-4 py-2">Total Supply</th>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};
