import React, { useContext } from "react";
import { userContext } from "../../../../App";

function Profile() {
  const userDetails = useContext(userContext);
  return (
    <div className="flex w-full z-0">
      <div className="profile-sidebar h-[calc(100vh-5rem)] bg-gray-500 w-1/4 flex p-6 flex-col items-center gap-6">
        <h3 className="text-lg text-white uppercase">My Profile</h3>
        <div className="h-64 w-64 border-2 border-green-500 rounded-full overflow-hidden">
          <img
            src={
              userDetails
                ? userDetails.client_image
                : "assets/default-profile-pic.png"
            }
            alt="profile pic"
            className="w-full h-full object-cover hover:opacity-90 transition duration-1000 ease-in-out"
          />
        </div>
        <h2 className="text-white font-semibold tracking-wide">
          {userDetails ? userDetails.client_name : ""}
        </h2>
        <button
          type="button"
          className="p-4 text-white bg-green-500 rounded-md hover:bg-green-600 transition duration-1000 ease-in-out"
        >
          Edit Profile
        </button>
      </div>
      <div className="profile-main w-3/4 h-[calc(100vh-5rem)] flex flex-col p-6 gap-12 items-center">
        <h1 className="text-lg font-bold uppercase text-[#242565]">
          Personal Information
        </h1>
        <div className="flex gap-12 w-2/3">
          <h3 className="text-left w-1/2">Username</h3>
          <p className="">{userDetails ? userDetails.client_name : ""}</p>
        </div>
        <div className="flex gap-12 w-2/3">
          <h3 className="text-left w-1/2">Email</h3>
          <p>{userDetails ? userDetails.email : ""}</p>
        </div>
        <div className="flex gap-12 w-2/3">
          <h3 className="text-left w-1/2">Tickets</h3>
          <p>{userDetails ? userDetails.tickets.length : ""}</p>
        </div>
        <div className="flex gap-12 w-2/3">
          <h3 className="text-left w-1/2">Comments</h3>
          <p>{userDetails ? userDetails.comments.length : ""}</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
