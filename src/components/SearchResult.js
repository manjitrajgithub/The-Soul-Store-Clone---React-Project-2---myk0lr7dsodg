import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { projectId } from "../utilities/constants";
import { useEffect, useState } from "react";
import Product from "./Product";

const SearchResult = () => {
  const { search } = useParams();
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      console.log(search);
      const response = await axios.get(
        `https://academics.newtonschool.co/api/v1/ecommerce/clothes/products?search={"name":"${search}"}`,
        {
          headers: {
            projectId: projectId,
          },
        }
      );
      console.log(response.data.data);
      setSearchResult(response.data.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      {searchResult.map((search) => (
        <Link key={search._id} to={"/productinfo/" + search._id}>
          <Product product={search} />
        </Link>
      ))}
    </div>
  );
};
export default SearchResult;
