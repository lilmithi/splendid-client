import React from 'react'

function LandingMakeOwn() {
  return (
    <div className="landing-center bg-gray-300 h-36 relative">
      <img
        src="assets/landingsitting.png"
        alt="landing sitting pic"
        className="w-80 object-cover absolute top-[-25%] left-0"
      />
      <div className="center-content flex flex-col items-center justify-center h-full">
        <h3 className="font-bold text-lg">Define your own Event</h3>
        <small className="text-gray-500 w-64 py-2">
          Once Logged in, you now have the ability to create your dream event.
          Give it a try 🙂
        </small>
        <button
          type="button"
          className="border bg-[#F5167E] rounded-full w-max py-2 px-4 text-white"
        >
          Create Events
        </button>
      </div>
    </div>
  );
}

export default LandingMakeOwn