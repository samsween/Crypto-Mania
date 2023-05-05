const SORT_FUNCTIONS = {
  name: (a, b) => a.name.localeCompare(b.name),
  price: (a, b) => a.current_price - b.current_price,
  price_change_percentage_24h: (a, b) =>
    a.price_change_percentage_24h - b.price_change_percentage_24h,
  market_cap: (a, b) => a.market_cap - b.market_cap,
  total_volume: (a, b) => a.total_volume - b.total_volume,
  circulating_supply: (a, b) => a.circulating_supply - b.circulating_supply,
  total_supply: (a, b) => a.total_supply - b.total_supply,
};

const SORT_TYPE = {
  asc: (sortFunction) => sortFunction,
  desc: (sortFunction) => (a, b) => sortFunction(b, a),
};

export { SORT_FUNCTIONS, SORT_TYPE };
