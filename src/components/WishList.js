import React, { useEffect, useState } from "react";
import axios from "axios";
import { projectId } from "../utilities/constants";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const WishList = () => {
  const [wishList, setWishList] = useState([]);
  const [remove, setRemove] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const userToken = useSelector((state) => state.auth.user);

  useEffect(() => {
    const apiUrl =
      "https://academics.newtonschool.co/api/v1/ecommerce/wishlist";

    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl, {
          headers: {
            projectID: projectId,
            Authorization: `Bearer ${userToken}`,
          },
        });
        console.log(response.data.data);
        setWishList(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching wishlist items:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [remove]);
  const handleRemoveFromCart = async (productID) => {
    setRemove(true);
    console.log(productID);
    const apiUrl = `https://academics.newtonschool.co/api/v1/ecommerce/wishlist/${productID}`;
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
  const handleDeleteAll = async () => {
    setRemove(true);
    const apiUrl =
      "https://academics.newtonschool.co/api/v1/ecommerce/wishlist/";
    try {
      const response = await axios.delete(apiUrl, {
        headers: {
          projectID: projectId,
          Authorization: `Bearer ${userToken}`,
        },
      });
      console.log(response.data);
      setRemove(false);
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  return (
    <div>
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
        <>
          <h1 className="p-5 text-center text-5xl">WISH LIST</h1>
          <div>
            {wishList.items.length === 0 ? (
              <>
                <p className="pt-20 text-center text-lg">
                  Your WISHLIST is empty.
                </p>
                <div className="flex justify-center h-80 ">
                  <img
                    src="https://media2.giphy.com/media/hpdxVSq32dhQUdmiJC/giphy.gif?cid=6c09b952dqfzk92rd30tzco4w17ugwt02lw97dt0qeub5eh0&ep=v1_stickers_related&rid=giphy.gif&ct=s"
                    alt="wishlist gif"
                  />
                </div>
              </>
            ) : (
              <div>
                <button
                  onClick={() => handleDeleteAll()}
                  className="bg-red-600 text-white m-5 p-3 rounded-md w-50 h-10 "
                >
                  Delete All
                </button>
                <ul>
                  {wishList.items.map((item, index) => (
                    <div className="flex flex-col p-3">
                      <Link
                        to={"/productinfo/" + item.products._id}
                        key={index}
                      >
                        <div className="flex justify-center">
                          <img
                            src={item.products.displayImage}
                            alt="pic"
                            className="h-50 w-64  shadow-zinc-500 shadow-md"
                          />
                        </div>
                      </Link>
                      <div className="flex justify-center">
                        <button
                          onClick={() =>
                            handleRemoveFromCart(item.products._id)
                          }
                          className="bg-red-600 text-white m-5 p-3 rounded-md w-50 h-10 "
                        >
                          Remove from wishlist
                        </button>
                      </div>
                    </div>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default WishList;
