// import { createBrowserRouter } from "react-router-dom";
// import RootLayout from "./Rootlayout";
// import DashBoard from "./Components/DashBoard";
// import AddProduct from "./Components/AddProduct";
// import LoginPage from "./Components/Login";
// import SingleProduct from "./Components/ProductView";
// import OrderDetails from "./Components/Orders";
// import OrderHistory from "./Components/OrderHistroy";

// const router = createBrowserRouter([
//   // {
//   //   path: "/login",
//   //   element: <Login />,
//   // },

//   {
//     path: "/signup",
//     element: <LoginPage />,
//   },
//   {
//     path: "/",
//     element: <RootLayout />,

//     children: [
//       {
//         path: "/",
//         element: <DashBoard />,
//         index: true,
//       },
//       {
//         path: "/add-product",
//         element: <AddProduct />,
//       },
//       {
//         path: "/:id",
//         element: <SingleProduct />,
//       },
//       {
//         path: "/orders",
//         element: <OrderDetails />,
//       },
//       {
//         path: "/history",
//         element: <OrderHistory />,
//       },
//       // {
//       //   path: "/chat",
//       //   element: <ProtectedRoute element={<ChatScreen />} />,
//       // },
//     ],
//   },
// ]);

// export default router;
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./Rootlayout";
import DashBoard from "./Components/DashBoard";
import AddProduct from "./Components/AddProduct";
import LoginPage from "./Components/Login";
import SingleProduct from "./Components/ProductView";
import OrderDetails from "./Components/Orders";
import OrderHistory from "./Components/OrderHistroy";
import ProtectedRoute from "./ProtectedRoutes";
import Profile from "./Components/AdminProfile";
import AllProducts from "./Components/AllProducts";

const router = createBrowserRouter([
  {
    path: "/signup",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <ProtectedRoute element={<DashBoard />} /> },
      {
        path: "all-products",
        element: <ProtectedRoute element={<AllProducts />} />,
      },
      {
        path: "add-product",
        element: <ProtectedRoute element={<AddProduct />} />,
      },
      { path: ":id", element: <ProtectedRoute element={<SingleProduct />} /> },
      {
        path: "orders",
        element: <ProtectedRoute element={<OrderDetails />} />,
      },
      {
        path: "history",
        element: <ProtectedRoute element={<OrderHistory />} />,
      },
      {
        path: "profile",
        element: <ProtectedRoute element={<Profile />} />,
      },
    ],
  },
]);

export default router;
