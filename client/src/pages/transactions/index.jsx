import { useMemo } from "react"
import { useQuery } from "react-query"




export const Transactions = () => {
    const {data} = useQuery("transactions", () => {
        return fetch("/api/crypto/transactions").then((res) => res.json())
    })
    return (
        <div>
            <h1>Transactions</h1>
            <p className="text-white">
              {data && JSON.stringify(data)}
            </p>
        </div>
    )
}