import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Market from "./pages/market";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(<Route path="/" element={<Market />} />)
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
