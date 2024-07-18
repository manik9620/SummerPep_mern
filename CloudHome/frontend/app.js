import React from "react";
import ReactDom from "react-dom/client";
import { createBrowserRouter , RouterProvider} from "react-router-dom";
import LoginPage from "./src/pages/loginPage";
import SignupPage from "./src/pages/signupPage";

const App = () => {
  const router= createBrowserRouter([
    {
      path: "/login",
      element: <LoginPage/>,
      },
    {
      path: "/signup",
      element: <SignupPage/>,
    }
  ])
  return <RouterProvider router={router}/>
};

const parent = document.getElementById("root");
const root = ReactDom.createRoot(parent);
root.render(App());
