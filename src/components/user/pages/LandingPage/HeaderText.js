import React from "react";
import { useHistory } from "react-router-dom";

function HeaderText() {
  const history = useHistory();
  return (
    <div className="flex items-start justify-between absolute top-44 w-4/5 ml-32 h-64 gap-10 p-4 text-white">
      <h1 className="text-6xl w-1/3 font-semibold leading-[4rem]">
        Splendid Events
      </h1>
      <div className="flex flex-col items-center">
        <h3 className="text-3xl">Your one-stop site for exclusive events</h3>
        <p className="w-3/4 p-2">
          Look no further! With an all new look and feel designed to give you
          the best user experience while at the same time meeting and going
          beyond your expectations.
        </p>
        <div className="flex space-x-4 my-4 w-3/4">
          <button
            type="button"
            className="ml-4 rounded-full py-2 px-4 bg-[#F5167E] hover:bg-[#d4156e] transition duration-[2.75s] ease-in-out"
            onClick={() => history.push("/events")}
          >
            View Events
          </button>
          <button
            type="button"
            className="ml-4 border rounded-full py-2 px-4"
            onClick={() => history.push("/about")}
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}

export default HeaderText;
