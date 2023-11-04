const Card = ({ item }) => {
  return (
    <div>
      <div className="h-40 w-40 ms-7 mb-20">
        <img src={item.order.items[0].product.displayImage} alt="pic" />
      </div>
      <div className="flex flex-col">
        <h1 className="text-lg m-5 text-black">
          Order Id:{" "}
          <span className="text-xs m-10 text-red-600">{item.order._id}</span>
        </h1>
        <h4 className="text-lg"> Total price: ₹{item.order.totalPrice}</h4>
      </div>
    </div>
  );
};
export default Card;
