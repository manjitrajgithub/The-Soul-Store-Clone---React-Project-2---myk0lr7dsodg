import axios from "axios";
import { useEffect, useState } from "react";
import ProductCategory from "./ProductCategory";
import { Product_API } from "../utilities/constants";
import { projectId } from "../utilities/constants";
import FetchApi from "./FetchApi";
import { Link } from "react-router-dom";
import Slider from "./Slider";
const HeroBanner = () => {
  const { data, loading, error } = FetchApi();
  console.log("Top Rated" === "TOP RATED");

  const categoryFilters = [
    { tag: "TOP RATED", title: "TOP RATED" },
    { tag: "New Arrival", title: "NEW ARRIVAL" },
    { tag: "Featured", title: "FEATURED" },
    { tag: "best Seller", title: "BEST SELLER" },
  ];
  const slides = [
    "https://images.bewakoof.com/t1080/men-get-schwifty-oversized-graphic-printed-t-shirt-605045-1693306313-1.jpg",
    "https://images.bewakoof.com/t1080/men-s-beige-mickey-graphic-printed-oversizedt-shirt-516646-1667912529-1.jpg",

    "https://images.bewakoof.com/t1080/men-s-black-skater-donald-graphic-printed-oversized-t-shirt-602561-1688380293-1.jpg",

    "https://images.bewakoof.com/t1080/men-stoned-rick-morty-oversized-graphic-printed-t-shirt-605102-1693306351-1.jpg",

    "https://images.bewakoof.com/t1080/men-s-black-itachi-uchiha-genjutsu-graphic-printed-oversized-t-shirt-605541-1690552600-1.jpg",
  ];

  return (
    <div>
      {error ? (
        <p>Error: {error.message}</p>
      ) : loading ? (
        <div className="pt-20 text-center text-lg">
          Loading...
          <div className="flex justify-center h-80 text-red-600">
            <img
              src="https://usagif.com/wp-content/uploads/loading-78.gif"
              alt="loading gif"
            />
          </div>
        </div>
      ) : (
        <div>
          <Link to="/main">
            <Slider slides={slides} />
          </Link>
          {categoryFilters.map((filter, index) => (
            <ProductCategory
              key={index}
              products={data.filter(
                (data) =>
                  data.sellerTag.toLowerCase() === filter.tag.toLowerCase()
              )}
              title={filter.title}
            />
          ))}
        
        </div>
      )}
      <h2 className="bg-red-600 text-white p-3 text-3xl text-center">
        HOMEGROWN INDIAN BRAND
      </h2>
      <h1 className="text-5xl text-center p-10">
        Over 6 Million Happy Customers
      </h1>
    </div>
  );
};
export default HeroBanner;
