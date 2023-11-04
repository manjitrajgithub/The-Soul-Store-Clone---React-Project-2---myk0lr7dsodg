import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { projectId } from "../utilities/constants";
import axios from "axios";
import { Link } from "react-router-dom";

const OrderList = () => {
  const [orderList, setOrderList] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const userToken = useSelector((state) => state.auth.user);

  useEffect(() => {
    const apiUrl = "https://academics.newtonschool.co/api/v1/ecommerce/order/";

    async function FetchData() {
      try {
        const response = await axios.get(apiUrl, {
          headers: {
            projectID: projectId,
            Authorization: `Bearer ${userToken}`,
          },
        });
        console.log(response.data.data);
        setOrderList(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cart items:", error);
        setError(error.message);
        setLoading(false);
      }
    }

    FetchData();
  }, []);
  return (
    <div className="p-5 text-center text-5xl">
      <h1>Ordered List</h1>
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
          {orderList.length === 0 ? (
            <>
              <p className="pt-20 text-center text-lg">No Orders yet!</p>
              <div className="flex justify-center h-80 ">
                <img
                  src="https://media2.giphy.com/media/hpdxVSq32dhQUdmiJC/giphy.gif?cid=6c09b952dqfzk92rd30tzco4w17ugwt02lw97dt0qeub5eh0&ep=v1_stickers_related&rid=giphy.gif&ct=s"
                  alt="wishlist gif"
                />
              </div>
            </>
          ) : (
            <div>
              <ul className="flex flex-wrap ">
                {orderList.map((item) => (
                  <div className="flex justify-evenly">
                    <Link
                      key={item.order._id}
                      to={"/eachorder/" + item.order._id}
                    >
                      <div className="h-40 w-40 ms-7 mb-20">
                        <img
                          src={item.order.items[0].product.displayImage}
                          alt="pic"
                          className="h-50 w-64  shadow-zinc-500 shadow-md"
                        />
                      </div>
                    </Link>
                    <div className="flex flex-col">
                      <h1 className="text-lg m-5 text-black">
                        Order Id:
                        <span className="text-xs text-red-600">
                          {item.order._id}
                        </span>
                      </h1>
                      <h4 className="text-lg">
                        Total price: ₹{item.order.totalPrice}
                      </h4>
                    </div>
                  </div>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderList;
