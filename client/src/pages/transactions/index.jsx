import { useMemo } from "react"
import { useQuery } from "react-query"
import { sortData } from "./utils/sortData"



export const Transactions = () => {
    const {data} = useQuery("transactions", () => {
        return fetch("/api/crypto/transactions").then((res) => res.json())
    })
    const sortedData = useMemo(()=>{
        if(!data) return []
        return sortData(data)
    }, [data])
    return (
        <div>
            <h1>Transactions</h1>
            <p className="text-white">
              {data && JSON.stringify(sortedData)}
            </p>
        </div>
    )
}