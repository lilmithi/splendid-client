import React from "react";

function LandingBrands() {
  return (
    <div className="join-brands flex flex-col items-center mb-6">
      <h3 className="text-[#242565] text-2xl font-bold text-center my-12">
        Join these brands
      </h3>
      <p className="w-[50%] text-center mb-2 text-gray-500">
        We've had the pleasure of working with industry-defining brands. These
        are just some of them.
      </p>
      <img src="assets/jointhesebrands.png" alt="brands pic" />
    </div>
  );
}

export default LandingBrands;
