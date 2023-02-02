import React, { Suspense } from "react";
import Footer from "../../Footer";
import HeaderText from "./HeaderText";
import LandingBrands from "./LandingBrands";
import LandingMakeOwn from "./LandingMakeOwn";
import LandingSponsors from "./LandingSponsors";
import PurpleSearchBox from "./PurpleSearchBox";
import UpcomingEvents from "./UpcomingEvents";
const HeaderPic = React.lazy(() => import("./HeaderPic"));

function Landing({ events, sponsors }) {
  const landingEvents = events ? events.filter((event, i) => i <= 2) : null;

  return (
    <>
      <div className="w-full h-screen bg-black">
        <Suspense fallback={<></>}>
          <HeaderPic />
        </Suspense>
      </div>
      <HeaderText />
      <PurpleSearchBox />
      <UpcomingEvents events={landingEvents} />
      <LandingSponsors sponsors={sponsors} />
      <LandingMakeOwn/>
      <LandingBrands/>
      <Footer/>
    </>
  );
}

export default Landing;
