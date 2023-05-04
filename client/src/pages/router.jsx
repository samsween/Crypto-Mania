import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Login from "./login";
import MainLayout from "../components/mainlayout";
import Register from "./register";
import Market from "./market";
import Coin from "./coin";
import Home from "./home";
import Wallet from "./wallet";
import { Transactions } from "./transactions";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/market" element={<Market />} />
        <Route path="/market/:id" element={<Coin />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/transactions" element={<Transactions />} />
      </Route>
    </Route>
  )
);

export default router;
