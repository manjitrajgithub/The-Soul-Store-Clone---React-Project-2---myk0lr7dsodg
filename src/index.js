import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
import HeroBanner from "./components/HeroBanner";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Route,
} from "react-router-dom";
import DeleteAccount from "./components/DeleteAccount";
import Main from "./components/Main";
import ProductInfo from "./components/ProductInfo";
import Cart from "./components/Cart";
import WishList from "./components/WishList";
import Login from "./components/Login";
import Signup from "./components/SignUp";
import ForgotPassword from "./components/ForgotPassword";
import PrivateRoute from "./components/PrivateRoute";
import OrderNow from "./components/OrderNow";
import OrderList from "./components/OrderList";
import EachOrder from "./components/EachOrder";
import SearchResult from "./components/SearchResult";
import Filter from "./components/Filter";
import UpdatePassword from "./components/UpdatePassword";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HeroBanner />,
      },
      {
        path: "/women",
        element: <Main />,
      },
      {
        path: "/kids",
        element: <Main />,
      },
      {
        path: "/filter",
        element: <Filter />,
      },
      {
        path: "/updateprofile",
        element: <PrivateRoute component={<UpdatePassword />} />,
      },
      {
        path: "/searchresult/:search",
        element: <SearchResult />,
      },

      {
        path: "/main",
        element: <Main />,
      },
      {
        path: "/productinfo/:productId",
        element: <ProductInfo />,
      },
      {
        path: "/cart",
        element: <PrivateRoute component={<Cart />} />,
      },
      {
        path: "/wishlist",
        element: <PrivateRoute component={<WishList />} />,
      },
      {
        path: "/buynow/:productId",
        element: <PrivateRoute component={<OrderNow />} />,
      },
      {
        path: "/eachorder/:orderId",
        element: <EachOrder />,
      },
      {
        path: "/orderlist",
        element: <PrivateRoute component={<OrderList />} />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/forgotpassword",
        element: <ForgotPassword />,
      },
      {
        path: "/deleteaccount",
        element: <DeleteAccount />,
      },
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);