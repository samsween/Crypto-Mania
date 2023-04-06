export const PriceTable = ({ data }) => {
  return (
    <table>
      <tbody className="w-full">
        {data.map((item) => (
          <tr
            className="border-b border-orange-500 border-opacity-40 py-8 whitespace-nowrap"
            key={item.name}
          >
            <td>{item.name}</td>
            <td className="px-8">{item.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
