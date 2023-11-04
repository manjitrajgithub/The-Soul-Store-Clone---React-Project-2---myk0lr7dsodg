import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { projectId } from "../utilities/constants";
import { EachOrder_API } from "../utilities/constants";
import axios from "axios";
import Product from "./Product";

const EachOrder = () => {
  const { orderId } = useParams();
  console.log(orderId);

  const [eachItem, setEachItem] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const userToken = useSelector((state) => state.auth.user);
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(orderId);
        const response = await axios.get(EachOrder_API + orderId, {
          headers: {
            projectID: projectId,
            Authorization: `Bearer ${userToken}`,
          },
        });

        console.log(response.data.data);
        setEachItem(response.data.data);
        setLoading(false);
      } catch (error) {
        // setError(error.message);
        console.log(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {error ? (
        <p>{error}</p>
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
          <div className="container mx-auto flex flex-wrap p-3 justify-center">
            <h1 className="text-2xl">Order details:</h1>
            <div className="w-full sm:w-1/2 md:w-2/3 lg:w-1/2 xl:w-1/2 p-10">
              <h1 className="text-4xl sm:text-3xl md:text-3xl font-serif p-2">
                {eachItem.items[0].product.name}
              </h1>
              <div className="h-50 w-70">
                <img src={eachItem.items[0].product.displayImage} alt="image" />
              </div>
              <h2 className="text-2xl font-semibold p-3">
                Brand:{eachItem.items[0].product.brand}
              </h2>
              <h2 className="text-2xl font-semibold p-3">
                Quantity: {eachItem.items[0].quantity}
              </h2>
              <h2 className="text-2xl font-semibold p-3 text-red-600">
                Total price: ₹{eachItem.totalPrice}
              </h2>
              <h2 className="text-2xl font-semibold p-3 text-red-600">
                Order status: {eachItem.status}
              </h2>
              <div className="my-4 p-3">
                <span className="text-lg font-bold ">Product Details:</span>{" "}
                <div
                  dangerouslySetInnerHTML={{
                    __html: eachItem.items[0].product.description,
                  }}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default EachOrder;
