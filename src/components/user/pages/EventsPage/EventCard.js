import React from "react";
import { Link } from "react-router-dom";

function EventCard({ event }) {
  return (
    <div className="upcoming-card relative md:w-3/4 max-w-[400px] h-[400px] col-span-1 rounded-xl shadow-lg overflow-hidden cursor-default bg-white">
      <img
        src={event.event_card_image}
        alt={event.event_name}
        className="w-full object-cover h-1/2 object-top"
      />
      <span
        className={`absolute top-2 left-2 opacity-[.9] px-2 py-1 rounded-full ${
          event.category === "Music" ? "bg-orange-500" : ""
        } ${event.category === "Festivals" ? "bg-yellow-500" : ""} ${
          event.category === "Art" ? "bg-pink-500" : ""
        } ${event.category === "Corporate" ? "bg-slate-500" : ""} ${
          event.category === "Tech" ? "bg-blue-500" : ""
        } ${event.category === "Sport" ? "bg-green-500" : ""} ${
          event.category === "Educational" ? "bg-red-500" : ""
        } text-white`}
      >
        {event.category}
      </span>

      <div className="flex flex-col justify-between h-1/2">
        <div className="flex justify-between space-x-2 border py-2 h-2/3">
          <div className="upcoming-card-date flex flex-col items-center text-sm py-1 px-2 gap-1">
            <span className="text-[#686af3] font-bold text-lg">
              {event.date.split(" ")[1]}
            </span>
            <span className="font-bold text-xl">
              {event.date.split(" ")[2]}
            </span>
          </div>
          <div className="upcoming-card-content flex flex-col text-sm py-1">
            <p className="font-bold text-md">{event.event_name}</p>
            <p className="font-bold">{event.location.location_name}</p>
            <p className="p-1 text-gray-500">
              {event.description.length > 100
                ? `${event.description.slice(0, 100)}...`
                : event.description}
            </p>
          </div>
        </div>
        <div className="card-footer bg-[#242565] flex justify-between items-center h-1/3 text-white px-4">
          <div className="footer-available flex flex-col">
            <p>Tickets Available:</p>
            <p>{event.available_tickets}</p>
          </div>

          <Link
            to={`/events/${event.id}`}
            className="bg-[#F5167E] rounded hover:scale-[1.03] transition duration-[1s] ease-in-out p-2 max-h-12 flex items-center text-center"
          >
            View Event
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
