import { useState } from "react";

import ReactDOM from "react-dom/client";
import "./globalStyles.css";
import HomePage from "./src/pages/homePage.js";
import SearchPage from "./src/pages/searchPage.js";
import ProductInfo from "./src/pages/productInfo.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const parent = document.getElementById("root");
const root = ReactDOM.createRoot(parent);

const productInfoCards = [
  {
    id: 1,
    title: "Revamp",
    products: [
      {
        title: "Air Conditioners",
        img: "https://images-eu.ssl-images-amazon.com/images/G/31/IMG15/Irfan/GATEWAY/MSO/Appliances-QC-PC-372x232----B08RDL6H79._SY232_CB667322346_.jpg",
      },
      {
        title: "Refrigerators",
        img: "https://images-eu.ssl-images-amazon.com/images/G/31/IMG15/Irfan/GATEWAY/MSO/B08345R1ZW---372x232._SY232_CB667322346_.jpg",
      },
      {
        title: "Microwaves",
        img: "https://images-eu.ssl-images-amazon.com/images/G/31/IMG15/Irfan/GATEWAY/MSO/B07G5J5FYP._SY232_CB667322346_.jpg",
      },
      {
        title: "Washing Machines",
        img: "https://images-eu.ssl-images-amazon.com/images/G/31/IMG15/Irfan/GATEWAY/MSO/Appliances-QC-PC-186x116--B08CPQVLZT._SY232_CB667322346_.jpg",
      },
    ],
  },
  {
    id: 2,
    title: "Revamp",
    products: [
      {
        title: "Air Conditioners",
        img: "https://images-eu.ssl-images-amazon.com/images/G/31/IMG15/Irfan/GATEWAY/MSO/Appliances-QC-PC-372x232----B08RDL6H79._SY232_CB667322346_.jpg",
      },
      {
        title: "Refrigerators",
        img: "https://images-eu.ssl-images-amazon.com/images/G/31/IMG15/Irfan/GATEWAY/MSO/B08345R1ZW---372x232._SY232_CB667322346_.jpg",
      },
      {
        title: "Microwaves",
        img: "https://images-eu.ssl-images-amazon.com/images/G/31/IMG15/Irfan/GATEWAY/MSO/B07G5J5FYP._SY232_CB667322346_.jpg",
      },
      {
        title: "Washing Machines",
        img: "https://images-eu.ssl-images-amazon.com/images/G/31/IMG15/Irfan/GATEWAY/MSO/Appliances-QC-PC-186x116--B08CPQVLZT._SY232_CB667322346_.jpg",
      },
    ],
  },
  {
    id: 3,
    title: "Revamp",
    products: [
      {
        title: "Air Conditioners",
        img: "https://images-eu.ssl-images-amazon.com/images/G/31/IMG15/Irfan/GATEWAY/MSO/Appliances-QC-PC-372x232----B08RDL6H79._SY232_CB667322346_.jpg",
      },
      {
        title: "Refrigerators",
        img: "https://images-eu.ssl-images-amazon.com/images/G/31/IMG15/Irfan/GATEWAY/MSO/B08345R1ZW---372x232._SY232_CB667322346_.jpg",
      },
      {
        title: "Microwaves",
        img: "https://images-eu.ssl-images-amazon.com/images/G/31/IMG15/Irfan/GATEWAY/MSO/B07G5J5FYP._SY232_CB667322346_.jpg",
      },
      {
        title: "Washing Machines",
        img: "https://images-eu.ssl-images-amazon.com/images/G/31/IMG15/Irfan/GATEWAY/MSO/Appliances-QC-PC-186x116--B08CPQVLZT._SY232_CB667322346_.jpg",
      },
    ],
  },
  {
    id: 4,
    title: "Revamp",
    products: [
      {
        title: "Air Conditioners",
        img: "https://images-eu.ssl-images-amazon.com/images/G/31/IMG15/Irfan/GATEWAY/MSO/Appliances-QC-PC-372x232----B08RDL6H79._SY232_CB667322346_.jpg",
      },
      {
        title: "Refrigerators",
        img: "https://images-eu.ssl-images-amazon.com/images/G/31/IMG15/Irfan/GATEWAY/MSO/B08345R1ZW---372x232._SY232_CB667322346_.jpg",
      },
      {
        title: "Microwaves",
        img: "https://images-eu.ssl-images-amazon.com/images/G/31/IMG15/Irfan/GATEWAY/MSO/B07G5J5FYP._SY232_CB667322346_.jpg",
      },
      {
        title: "Washing Machines",
        img: "https://images-eu.ssl-images-amazon.com/images/G/31/IMG15/Irfan/GATEWAY/MSO/Appliances-QC-PC-186x116--B08CPQVLZT._SY232_CB667322346_.jpg",
      },
    ],
  },
];

const categories = [
  "Fresh",
  "Amazon MiniTV",
  "Sell",
  "Best Sellers",
  "Mobiles",
  "Todays Deals",
  "Prime",
  "Fashion",
  "Electronics",
];

const App = () => {
  const [searchtext, setSearchtext] = useState("");

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <HomePage
          productInfoCards={productInfoCards}
          categories={categories}
          searchtext={searchtext}
          setSearchtext={setSearchtext}
        />
      ),
    },
    {
      path: "/search",
      element: (
        <SearchPage
          searchtext={searchtext}
          setSearchtext={setSearchtext}
          categories={categories}
        />
      ),
    },
    {
      path:"/search/:id",
      element: <ProductInfo/>
    }
  ]);

  return <RouterProvider router={router} />;
};

root.render(<App />);

//useEffect
// 1. if dependency is not present ----> works everytime (on every re-rendering)
// 2. if dependency isempty array ([])------> only on intial render
// 3. if dependency is [a] ------> only when "a" changes + initial render
// 4. id dependency is [a,b] ----> only when (a or b changes) + initial render
