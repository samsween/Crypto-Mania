export const sortData = (data) => {
  let temp = data.map((crypto) => {
    return {
      ...crypto,
      positions: [
        ...crypto.soldPositions.map((pos) => {
          return {
            position: pos,
            type: "sold",
            name: crypto.name,
            symbol: crypto.symbol,
          };
        }),
        ...crypto.boughtPositions.map((pos) => {
          return {
            position: pos,
            type: "bought",
            name: crypto.name,
            symbol: crypto.symbol,
          };
        }),
      ],
    };
  });
  let arr = [];
  temp.forEach((crypto) => {
    crypto.positions.forEach((pos) => {
      arr.push(pos);
    });
  });
  const sorted = [...arr].sort((a, b) => {
    return new Date(b.position.date) - new Date(a.position.date);
  });
  return sorted;
};
