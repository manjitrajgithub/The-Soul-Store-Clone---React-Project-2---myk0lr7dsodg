// Cart.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import { projectId } from "../utilities/constants";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Card from "./Card";
import DualNavbar from "./DualNavbar";
function Cart() {
  const [cartItems, setCartItems] = useState({ items: [] });
  const [remove, setRemove] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const userToken = useSelector((state) => state.auth.user);

  const handleDeleteAll = async () => {
    try {
      const apiUrl = "https://academics.newtonschool.co/api/v1/ecommerce/cart";
      await axios.delete(apiUrl, {
        headers: {
          projectID: projectId,
          Authorization: `Bearer ${userToken}`,
        },
      });

      // After successful deletion, you can clear the cart in your state.
      setCartItems({ items: [] });
    } catch (error) {
      console.error("Error deleting all items from the cart:", error);
    }
  };

  useEffect(() => {
    const apiUrl = "https://academics.newtonschool.co/api/v1/ecommerce/cart";
    setRemove(true);
    async function fetchCartItems() {
      try {
        const response = await axios.get(apiUrl, {
          headers: {
            projectID: projectId,
            Authorization: `Bearer ${userToken}`,
          },
        });
        console.log(response.data.data);
        setCartItems(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cart items:", error);
        setError(error.message);
        setLoading(false);
      }
    }

    fetchCartItems();
  }, [remove]);
  // -------------delete item from cart--------------

  const handleRemoveFromCart = async (productID) => {
    setRemove(true);

    console.log(productID);
    const apiUrl = `https://academics.newtonschool.co/api/v1/ecommerce/cart/${productID}`;
    try {
      const response = await axios.delete(apiUrl, {
        headers: {
          projectID: projectId,
          Authorization: `Bearer ${userToken}`,
        },
      });
      console.log(response.data.data);

      setRemove(false);
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  return (
    <div>
      <h1 className="p-5 text-center text-5xl">Shopping Cart</h1>
      {error ? (
        <p>{error.message}</p>
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
          {cartItems.items.length === 0 ? (
            <>
              <p className="pt-20 text-center text-lg">Your cart is empty.</p>
              <div className="flex justify-center h-80 ">
                <img
                  src="https://cdn.dribbble.com/users/887568/screenshots/3172047/ufo.gif"
                  alt="UFO"
                />
              </div>
            </>
          ) : (
            <div>
              <button
                onClick={handleDeleteAll}
                className="rounded-md bg-red-600 text-white p-3 m-5"
              >
                DeleteAll
              </button>
              <ul>
                {cartItems.items.map((item, index) => (
                  <div className="flex p-3 justify-evenly flex-wrap">
                    <div className="flex flex-col">
                      <Link to={"/productinfo/" + item.product._id} key={index}>
                        <div className="flex justify-center">
                          <img
                            src={item.product.displayImage}
                            alt="pic"
                            className="h-50 w-64 shadow-zinc-500 shadow-md"
                          />
                        </div>
                      </Link>
                      <h2 className="text-center font-serif">
                        Quantity: <span>{item.quantity}</span>
                      </h2>
                      <button
                        onClick={() => handleRemoveFromCart(item.product._id)}
                        className="rounded-md bg-red-600 text-white p-3 m-5"
                      >
                        Remove from Cart
                      </button>
                    </div>
                  </div>
                ))}
                <div className=" bg-red-500 text-white text-center p-5 m-10 font-serif text-3xl">
                  SubTotal:
                  <span className="text-black text-2xl p-5">
                    ₹ {cartItems.totalPrice}
                  </span>
                </div>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Cart;


