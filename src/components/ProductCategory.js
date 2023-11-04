import { Link } from "react-router-dom";
import Product from "./Product";
const ProductCategory = ({ products, title }) => {
  return (
    <div>
      <h3 className="font-medium text-4xl text-center p-9 m-9">{title}</h3>
      <div className="flex flex-wrap justify-evenly">
        {products.map((product) => (
          <Link to={"/main"}>
            <Product key={product._id} product={product} />
          </Link>
        ))}
      </div>
    </div>
  );
};
export default ProductCategory;
