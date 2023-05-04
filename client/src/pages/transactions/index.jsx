import { useMemo, useState } from "react"
import { useQuery } from "react-query"
import { sortData } from "./utils/sortData"

// Data looks like this
/*
{"price":43611.57,"quantity":0.20693519,"date":"04/05/2023 18:17:25","_id":"64536a15e5490eac52b29a99","id":"64536a15e5490eac52b29a99","type":"sold","name":"Bitcoin","symbol":"btc"}
*/

const SORT_FUNCTIONS = {
    date: (a, b) => {
        return new Date(b.date) - new Date(a.date)
    },
    price: (a, b) => {
        return b.price - a.price
    },
    quantity: (a, b) => {
        return b.quantity - a.quantity
    },
    total: (a, b) => {
        return b.price * b.quantity - a.price * a.quantity
    },
    coin: (a, b) => {
        return a.name.localeCompare(b.name)
    },
    type: (a, b) => {
        return a.type.localeCompare(b.type)
    }

}

const SORT_OPTIONS = {
    date: "date",
    price: "price",
    quantity: "quantity",
    total: "total",
    coin: "coin",
    type: "type"

}

const SORT_TYPES = {
    asc: (sortFunction) => sortFunction,
    desc: (sortFunction) => (a, b) => sortFunction(b, a),
}




export const Transactions = () => {
    const [sortOption, setSortOption] = useState(SORT_OPTIONS.price);
    const [sortType, setSortType] = useState("asc");
    const {data} = useQuery("transactions", () => {
        return fetch("/api/crypto/transactions").then((res) => res.json())
    })
    const sortedData = useMemo(()=>{
        if(!data) return []
        return sortData(data)
    }, [data])
    const handleClick = (type) => {
        setSortOption(type);
        setSortType((prev) => prev === "asc" ? "desc" : "asc")
    }
 
    return (
        <div className="w-full h-full">
            <h1 className="text-center py-20 text-gray-200 text-2xl">Transactions</h1>
            <div className="px-20 text-gray-300  py-10">
            <table className="table table-auto w-full p-10 bg-primary-100 border-l border-r text-2xl  border-orange-500">
                <thead>
                    <tr>
                        <th scope="col" className="text-orange-500" onClick={()=>{
                            handleClick(SORT_OPTIONS.date)
                        }}>Date</th>
                        <th scope="col" className="text-orange-500" onClick={()=>{
                            handleClick(SORT_OPTIONS.type)
                        }}>Type</th>
                        <th scope="col" className="text-orange-500" onClick={()=>{
                            handleClick(SORT_OPTIONS.coin)
                        }}>Coin</th>
                        <th scope="col" className="text-orange-500" onClick={()=>{
                            handleClick(SORT_OPTIONS.price)
                        }}>Price</th>
                        <th scope="col" className="text-orange-500" onClick={()=>{
                            handleClick(SORT_OPTIONS.quantity)
                        }}>Quantity</th>
                        <th scope="col" className="text-orange-500" onClick={()=>{
                            handleClick(SORT_OPTIONS.total)
                        }}>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedData.sort(SORT_TYPES[sortType](SORT_FUNCTIONS[sortOption])).map((transaction) => (
                        <tr key={transaction._id} className={transaction.type === "sold" ? "text text-red-500": "text text-green-500 "  }>
                            <td>{transaction.date}</td>
                            <td>{transaction.type}</td>
                            <td>{transaction.name}</td>
                            <td>${transaction.price}</td>
                            <td>{transaction.quantity}</td>
                            <td>${transaction.price * transaction.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
     

        </div>
    )
}