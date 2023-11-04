import { useState, useEffect } from "react";
import { Product_API } from "../utilities/constants";
import { projectId } from "../utilities/constants";
import axios from "axios";
const FetchApi = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(Product_API, {
          headers: {
            projectId: projectId,
          },
        });

        // Handle successful response
        console.log(response.data.data);
        setData(response.data.data);
        setLoading(false);
      } catch (error) {
        // Handle error
        console.error(error);
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return { data, loading, error };
};
export default FetchApi;
