import React, { useContext, useEffect, useState } from "react";
import Footer from "../../Footer";
import Spinner from "../../../Spinner";
import EventCard from "./EventCard";
import { userContext } from "../../../../App";

function Events({ events, handleFilter }) {
  const userDetails = useContext(userContext);
  const [selectedVal, setSelectedVal] = useState("");
  useEffect(() => {
    handleFilter(selectedVal);
  }, [selectedVal]);
  return (
    <>
      {!events ? (
        <div className="flex justify-center h-[calc(100vh-15rem)] items-center">
          <Spinner />
        </div>
      ) : (
        <div className="main-wrapper px-4 flex flex-col bg-gray-200 min-h-[calc(100vh-5rem)]">
          <div className="flex justify-end my-4 gap-4" id="filterForm">
            <label htmlFor="filter">Filter by: </label>
            <select
              id="filter"
              onChange={(e) => {
                return setSelectedVal(e.target.value);
              }}
              className="text-center"
              defaultValue=""
            >
              <optgroup label="Category">
                <option value="">None</option>
                <option value="Festivals">Festivals</option>
                <option value="Music">Music</option>
                <option value="Corporate">Corporate</option>
                <option value="Educational">Educational</option>
                <option value="Art">Art</option>
              </optgroup>
            </select>
          </div>
          <div className="grid my-4 mdPro:grid-cols-3 mdMore:grid-cols-2 justify-items-center gap-y-8 gap-x-6">
            {events.map((event) => (
              <EventCard event={event} key={event.id} />
            ))}
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}

export default Events;
