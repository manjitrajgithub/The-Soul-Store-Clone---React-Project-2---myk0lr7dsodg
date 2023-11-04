import { Link } from "react-router-dom";

const Product = ({ product }) => {
  const { displayImage, _id, name, price } = product;
  console.log(product);
  return (
    <div className="relative group px-20 sm:px-20 lg:px-10 md:px-10 flex justify-center">
      <img
        className="h-2/3 w-80 m-5 sm:h-72 md:h-2/3 lg:h-2/3 hover:cursor-pointer shadow-md shadow-zinc-500"
        src={displayImage}
        alt={name}
      />
      <div className="absolute bottom-0 w-80 text-center bg-black bg-opacity-70 text-white py-2 px-4 lg:px-4 opacity-0 transform translate-y-full transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="text-lg font-bold text-red-500">₹{price}</p>
      </div>
    </div>
  );
};
export default Product;
