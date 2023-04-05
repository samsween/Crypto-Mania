import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
} from "react-router-dom";
import Login from "./login";
import MainLayout from "../components/mainlayout";
import Register from "./register";
import Market from "./market";
import Coin from "./coin";
import Home from "./home";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/market" element={<Market />} />
        <Route path="/market/:id" element={<Coin />} />
      </Route>
    </Route>
  )
);

export default router;
