import React from "react";

function PurpleSearchBox() {
  return (
    <div className="flex justify-center items-center my-4 w-full">
      <form className="absolute bg-[#242565] max-w-2/3 h-40 gap-4 rounded-lg flex justify-around items-center pb-4 px-4">
        <div className="flex flex-col gap-4 items-center px-2">
          <label htmlFor="searchEvent" className="text-white">
            Search Event
          </label>
          <input
            type="text"
            id="searchEvent"
            placeholder="Sol Fest"
            className="bg-transparent outline-none border-b border-[#7778B0] text-white p-2 tracking-wider"
          />
        </div>
        <div className="flex flex-col gap-4 items-center">
          <label htmlFor="place" className="text-white">
            Place
          </label>
          <input
            type="text"
            id="place"
            placeholder="Nairobi"
            className="bg-transparent outline-none border-b border-[#7778B0] text-white p-2 tracking-wider"
          />
        </div>
        <div className="flex flex-col gap-4 items-center">
          <label htmlFor="time" className="text-white">
            Time
          </label>
          <input
            type="text"
            id="time"
            placeholder="Any Event"
            className="bg-transparent outline-none border-b border-[#7778B0] text-white p-2 tracking-wider"
          />
        </div>
      </form>
    </div>
  );
}

export default PurpleSearchBox;
