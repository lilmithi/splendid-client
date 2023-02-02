import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function LoginForm({ handleChange, handleLogin, loginError }) {
  const [myType, setMyType] = useState("password");

  const history = useHistory();
  function handleClick(e) {
    e.target.classList.toggle("fa-eye-slash");
    myType === "password" ? setMyType("text") : setMyType("password");
  }
  return (
    <div className="px-4">
      <div className="mx-auto w-2/3 h-[430px] max-h-[450px] flex overflow-hidden shadow-lg rounded">
        <div className="w-2/3 h-full p-2">
          <h2 className="text-center font-bold text-lg my-2 text-[#242565]">
            Welcome back
          </h2>
          <form
            className="flex flex-col my-4 py-4"
            onSubmit={(e) => handleLogin(e)}
          >
            <input
              type="text"
              placeholder="Username"
              id="client_name"
              title="username"
              className="w-52 h-12 border-b tracking-wider border-gray-400 pb-2 text-center bg-transparent mx-auto outline-none focus-within:border-b-[#F5167E] my-4"
              onChange={(e) => handleChange(e)}
            />
            <div className="mx-auto relative">
              <input
                type={myType}
                placeholder="Password"
                id="password"
                title="password"
                className="w-52 h-12 border-b tracking-wider border-gray-400 p-2 text-center bg-transparent mx-auto outline-none focus-within:border-b-[#F5167E] my-4"
                onChange={(e) => handleChange(e)}
              />
              <i
                className="fa-solid fa-eye fa-eye-slash absolute top-8 right-0 text-gray-500 cursor-pointer"
                id="eye"
                title="change visibility"
                onClick={(e) => handleClick(e)}
              ></i>
            </div>
            {loginError && (
              <p className="text-sm bg-red-200 text-red-500 mx-auto p-2 w-max">
                {loginError}
              </p>
            )}
            <button
              type="submit"
              className="bg-[#F5167E] w-48 mx-auto my-6 text-white rounded-full py-2"
            >
              Sign In
            </button>
          </form>
        </div>
        <div className="w-1/3 h-full relative overflow-hidden z-10">
          <img
            src="assets/loginImg.jpg"
            alt="user login pic"
            className="object-cover w-full h-full top-0 absolute brightness-75"
          />
          <div className="z-20 absolute top-0 left-0 text-white w-full h-full p-2 px-12 text-center">
            <h1 className="text-lg mt-6 mb-4">New Here?</h1>
            <p>Sign up to gain access to the site's full functionality!</p>
            <button
              className="my-28 outline outline-3 px-4 py-1 rounded-full font-bold uppercase"
              onClick={() => history.push("/userSignup")}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
