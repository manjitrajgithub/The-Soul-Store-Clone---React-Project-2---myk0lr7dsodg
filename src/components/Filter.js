import axios from "axios";
import { projectId } from "../utilities/constants";
import { useState, useEffect } from "react";
import Product from "./Product";
import { Link } from "react-router-dom";

const Filter = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [selectedField, setSelectedField] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [options, setOptions] = useState([]);
  const [filter, setFilter] = useState([]);
  const [click, setClick] = useState(false);

  const fieldOptions = {
    price: ["899", "429", "449", "849", "399", "649", "419", "599", "699"],
    brand: [
      "OFFICIAL HARRY POTTER MERCHANDISE",
      "Bewakoof®",
      "OFFICIAL RICK AND MORTY MERCHANDISE",
      "OFFICIAL DISNEY MERCHANDISE",
      "BEWAKOOF X STREETWEAR",
      "OFFICIAL NARUTO MERCHANDISE",
      "OFFICIAL MINIONS MERCHANDISE",
      "OFFICIAL DC COMICS MERCHANDISE",
      "OFFICIAL MARVEL MERCHANDISE",
      "OFFICIAL TOM & JERRY MERCHANDISE",
    ],
    color: ["BLACK", "GREEN", "BROWN", "BLUE", "WHITE", "NAVY"],
  };
  useEffect(() => {
    const fetchAllProducts = async () => {
      const response = await axios.get(
        "https://academics.newtonschool.co/api/v1/ecommerce/clothes/products",
        {
          headers: {
            projectId: projectId,
          },
        }
      );
      console.log(response.data.data);
      setAllProducts(response.data.data);
    };
    fetchAllProducts();
  }, []);

  const handleFieldChange = (e) => {
    const field = e.target.value;
    setSelectedField(field);
    setSelectedOption("");
    setOptions(fieldOptions[field] || []);
  };

  const handleOptionChange = (e) => {
    const option = e.target.value;
    setSelectedOption(option);
  };
  const handlefilter = () => {
    console.log(selectedField);
    const fetchData = async () => {
      const response = await axios.get(
        `https://academics.newtonschool.co/api/v1/ecommerce/clothes/products?filter={"${selectedField}":"${selectedOption}"}`,
        {
          headers: {
            projectId: projectId,
          },
        }
      );
      console.log(response.data.data);
      setFilter(response.data.data);
      setClick(true);
    };
    fetchData();
  };

  return (
    <div>
      <div className="flex justify-center">
        <label className="font-bold">Select a Field:</label>
        <select value={selectedField} onChange={handleFieldChange}>
          <option value="">Select a Field</option>
          <option value="price">Price</option>
          <option value="brand">Brand</option>
          <option value="color">Color</option>
        </select>

        {selectedField && (
          <div>
            <label className="font-bold">Select an Option:</label>
            <select value={selectedOption} onChange={handleOptionChange}>
              <option value="">Select an Option</option>
              {options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {selectedField && selectedOption && (
        <p>
          You selected Field: {selectedField}, Option: {selectedOption}
        </p>
      )}
      <div
        onClick={handlefilter}
        className="bg-red-600 p-2 m-5  rounded-md text-white cursor-pointer "
      >
        <h1 className="text-center font-semibold">Apply</h1>
      </div>
      {click ? (
        <div className="flex flex-wrap">
          {filter.map((filterd, index) => (
            <Link to="/main">
              <Product key={index} product={filterd} />
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap">
          {allProducts.map((product, index) => (
            <Link key={product._id} to={"/productinfo/" + product._id}>
              <Product key={index} product={product} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Filter;
