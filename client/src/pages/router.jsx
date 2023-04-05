const {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} = require("react-router-dom");
import Login from "./pages/login";
import MainLayout from "./components/mainlayout";
import Register from "./pages/register";
import Market from "./pages/market";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<MainLayout />}>
        <Route path="/" element={<Market />} />
      </Route>
    </Route>
  )
);

export default router;
