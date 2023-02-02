import React from "react";
// import Spinner from "../../Spinner";

function LandingSponsors({ sponsors }) {
  return (
    <>
      <h3 className="text-[#242565] text-2xl font-bold text-center my-8">
        Sponsors
      </h3>
      {sponsors? (
        <div className="landing-sponsors-container my-4 grid md:grid-cols-3 justify-items-center gap-8 grid-cols-1">
          {sponsors.map((sponsor) => {
            return (
              <div
                className="landing-sponsor col-span-1 md:w-3/4 max-w-2xl h-80"
                key={sponsor.id}
              >
                <img
                  src={sponsor.sponsor_image}
                  alt={sponsor.sponsor_name}
                  className="w-full object-cover h-3/4"
                />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex justify-center items-center">Loading...</div>
      )}
    </>
  );
}

export default LandingSponsors;
