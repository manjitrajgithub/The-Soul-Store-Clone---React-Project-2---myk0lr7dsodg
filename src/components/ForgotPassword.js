import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { projectId } from "../utilities/constants";
import axios from "axios";

const ForgotPassword = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  let headersList = {
    projectId: projectId,
    "Content-Type": "application/json",
  };
  let reqOptions = {
    url: "https://academics.newtonschool.co/api/v1/user/forgotPassword",
    method: "POST",
    headers: headersList,
  };
  const forgotPassword = async () => {
    try {
      let response = await axios.request(reqOptions);
      console.log(response);
      if (response.status === 200) {
        console.log(response);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleLogin = () => {
    const bodyContent = JSON.stringify({
      name: username,
      email: email,
      password: newPassword,
      appType: "ecommerce",
    });
    reqOptions.data = bodyContent;
    forgotPassword();
  };
  return (
    <div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-full md:w-3/12 p-12 bg-red-600 my-20 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80"
      >
        <input
          className="m-5 p-5 text-black"
          type="name"
          placeholder="Username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          className="m-5 p-5 text-black"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="m-5 p-5 text-black"
          type="password"
          placeholder="Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="m-5 p-5 bg-white text-red-600 rounded-lg  ml-24"
        >
          Login
        </button>
      </form>
    </div>
  );
};
export default ForgotPassword;
