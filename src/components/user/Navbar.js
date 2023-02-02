import React, { useContext } from "react";
import { useHistory, NavLink } from "react-router-dom";
import { LogoutContext, StatusContext, userContext } from "../../App";

function Navbar({ landing, searchBar, profile, handleSearch, checkout }) {
  const isLoggedIn = useContext(StatusContext);
  const userDetails = useContext(userContext);
  const logout = useContext(LogoutContext);
  const history = useHistory();
  return (
    <div
      className={`w-full h-20 ${
        landing
          ? "bg-transparent absolute flex justify-end items-center p-4 z-50"
          : "bg-[#242565] justify-between shadow-md flex items-center p-4 z-50 sticky top-0"
      }  ${profile ? "mb-0" : ""}`}
    >
      {!landing && (
        <div className="nav-title text-lg text-white tracking-wide">
          <NavLink exact to="/" className="font-bold">
            Splendid Events
          </NavLink>
        </div>
      )}
      {searchBar && (
        <form>
          <input
            type="search"
            placeholder="Search..."
            className="rounded-full p-2 w-72 bg-gray-300 text-[#242565] px-4"
            onChange={(e) => handleSearch(e)}
          />
        </form>
      )}
      <div className="flex gap-8">
        <ul className="text-white flex items-center p-2 gap-4">
          <NavLink exact to="/events">
            Schedule
          </NavLink>
          <NavLink exact to="/tickets" className="text-center">
            My Tickets
          </NavLink>
        </ul>
        {isLoggedIn ? (
          <ul className="flex gap-6 items-center p-2">
            <NavLink
              exact
              to="/profile"
              className="w-12 h-12 rounded-full overflow-hidden border border-green-500"
            >
              <img
                src={
                  userDetails
                    ? userDetails.client_image
                    : "assets/default-profile-pic.png"
                }
                alt="user pic"
                title="profile"
                className="object-cover w-full h-full"
              />
            </NavLink>
            <button
              type="button"
              className="py-2 px-4 bg-red-500 text-white"
              onClick={() => logout()}
            >
              Logout
            </button>
          </ul>
        ) : (
          <ul className="flex gap-8 items-center p-2">
            <button
              className="py-2 px-4 rounded-full bg-[#F5167E] hover:bg-[#e4217c] text-white transition duration-[0.75s] ease-in-out"
              onClick={() => history.push("/adminLogin")}
            >
              Admin Login
            </button>
            <button
              className="py-2 px-4 rounded-full bg-[#F5167E] hover:bg-[#e4217c] text-white transition duration-[0.75s] ease-in-out"
              onClick={() => history.push("/userLogin")}
            >
              Sign In
            </button>
          </ul>
        )}
      </div>
    </div>
  );
}

export default Navbar;
