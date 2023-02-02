import React from "react";
import { Link } from "react-router-dom";

function UpcomingEvents({ events }) {
  return (
    <div className="mt-32 mb-4 mx-8">
      <h3 className="text-[#242565] text-2xl font-bold">Upcoming Events</h3>

      {events ? (
        <div className="upcoming-container my-4 grid md:grid-cols-3 justify-items-center gap-8 grid-cols-1">
          {events.map((event) => {
            return (
              <Link
                to={`/events/${event.id}`}
                key={event.id}
                className="upcoming-card md:w-3/4 max-w-2xl bg-white h-80 col-span-1 rounded-2xl overflow-hidden shadow-lg hover:scale-[1.02] transition duration-[2s] ease-in-out"
              >
                <img
                  src={event.event_card_image}
                  alt={event.event_name}
                  className="w-full object-cover h-1/2 object-top"
                />
                <div className="flex justify-between space-x-2">
                  <div className="upcoming-card-date flex flex-col items-center text-sm py-2 px-2 gap-1">
                    <span className="text-[#686af3] font-bold text-lg">
                      {event.date.split(" ")[1]}
                    </span>
                    <span className="font-bold text-xl">
                      {event.date.split(" ")[2]}
                    </span>
                  </div>
                  <div className="upcoming-card-content flex flex-col text-sm h-full py-2">
                    <p className="font-bold text-md">{event.event_name}</p>
                    <p className="font-bold mt-1">
                      {event.location.location_name}
                    </p>
                    <p className="p-1 text-gray-500">
                      {event.description.length > 123
                        ? `${event.description.slice(0, 124)}...`
                        : event.description}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="w-full my-4 flex justify-center items-center">
          Loading...
        </div>
      )}
    </div>
  );
}
export default UpcomingEvents;
