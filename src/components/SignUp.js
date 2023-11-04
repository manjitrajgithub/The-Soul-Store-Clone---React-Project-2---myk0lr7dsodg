import React, { useRef, useState } from "react";
import axios from "axios";
import { checkValidData } from "./CheckValidate";
import { Form, useNavigate } from "react-router-dom";
import { projectId } from "../utilities/constants";

const Signup = () => {
  const username = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const projectid = projectId;

  let headersList = {
    projectId: projectid,
    "Content-Type": "application/json",
  };

  let reqOptions = {
    url: "https://academics.newtonschool.co/api/v1/user/signup",
    method: "POST",
    headers: headersList,
  };

  const signup = async () => {
    try {
      let response = await axios.request(reqOptions);
      console.log(response.data.token);
      if (response.status === 201) {
        // console.log(response);

        alert("Successfully Signed Up");

        navigate("/login");
      }
    } catch (error) {
      const errMsg = error?.response?.data?.message;
      console.error(error, errMsg);
      if (errMsg === "User already exists") {
        alert("User already exists");
      } else {
        console.log("error");
      }
    }
  };

  const handleSignUp = async () => {
    const message = checkValidData(email.current.value, password.current.value);
    setError(message);
    if (message) return;
    const usernameValue = username.current.value;
    const emailValue = email.current.value;
    const passwordValue = password.current.value;
    const bodyContent = JSON.stringify({
      name: usernameValue,
      email: emailValue,
      password: passwordValue,
      appType: "ecommerce",
    });

    reqOptions.data = bodyContent;
    signup();
  };

  return (
    <div className="content">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-[250px] md:w-[350px] bg-red-600 my-20 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80 p-7  sm:w-[250px]"
      >
        <h1 className="font-bold text-3xl py-4 px-10 text-center">Sign Up</h1>
        <input
          type="text"
          placeholder="Username"
          ref={username}
          className="mr-7 mt-5 p-3 text-black w-full"
        />
        <input
          type="email"
          placeholder="Email Address"
          ref={email}
          className="mr-7 mt-5 p-3 text-black w-full"
        />
        <input
          type="password"
          placeholder="Password"
          ref={password}
          className="mr-7 mt-5 p-3 text-black w-full"
        />
        <p className="text-black">{error}</p>
        <button
          className="w-full mr-7 mt-5 p-3  bg-white text-red-600 rounded-lg"
          onClick={handleSignUp}
        >
          Sign up
        </button>
        <div className="p-5">
          <span>Already registered?</span>{" "}
          <button onClick={() => navigate("/login")} className="text-black">
            login
          </button>
        </div>
      </form>
    </div>
  );
};
export default Signup;
