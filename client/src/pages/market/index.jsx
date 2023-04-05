import { useQuery } from "react-query";
import { Table } from "./comonents/Table";
import { CoinData } from "./comonents/CoinData";
import { ArrowRight, ArrowLeft } from "tabler-icons-react";
import { useState, useMemo } from "react";
const Market = () => {
  const { error, isLoading, data } = useQuery("market", () => {
    return fetch("http://localhost:3000/api/market").then((res) => res.json());
  }, {
    refetchInterval: 1000 * 60,
  });
  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(10);
  const [page, setPage] = useState(1);
  const setEntriesAndSearch = useMemo(() => {
    return data
      ?.filter((coin) => {
        return coin.name.toLowerCase().includes(search.toLowerCase());
      })
      .slice((page - 1) * entries, page * entries);
  }, [search, entries, data, page]);
  const totalPages = useMemo(() => {
    return Math.ceil(data?.length / entries);
  }, [data, entries]);

  const onEntriesChange = (e) => {
    setEntries(e.target.value);
    setPage(1);
  };

  const goForward = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };
  const goBack = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;
  return (
    <div className="w-full h-full flex flex-col gap-10 items-center">
      <div className="flex flex-col gap-8 pt-4 w-full ">
        <h1 className="text-2xl text-white text-center">Exchange</h1>
      </div>
      <div className="w-[90%] m-auto flex justify-center flex-col">
        <div className="w-full flex justify-between flex-col md:flex-row gap-8 items-center py-4">
          <div className="flex gap-4 text-gray-200 items-center">
            Show
            <select
              className="text-gray-300 w-full rounded-md bg-primary-200 focus:outline-none px-2"
              onChange={onEntriesChange}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            entries
          </div>
          <div>
            <input
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              id="search"
              placeholder="Search..."
              name="search"
              className="w-full text-gray-300 focus:outline-none h-10 py-1 bg-transparent placeholder:text-gray-600 border-b  border-primary-200"
            />
          </div>
        </div>
        <Table>
          {setEntriesAndSearch.map((coin, index) => {
            return <CoinData coin={coin} index={index} key={coin.id} />;
          })}
        </Table>
        <div className="w-full flex justify-between py-2">
          <button
            className="bg-primary-100 text-orange-500 px-4 py-2 rounded-md"
            onClick={goBack}
          >
            <ArrowLeft />
          </button>
          <button
            className="bg-primary-100 text-orange-500 px-4 py-2 rounded-md"
            onClick={goForward}
          >
            <ArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Market;
