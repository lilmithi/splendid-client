import React, { Suspense, useContext, useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { userContext } from "../../../../App";
import { url } from "../../../../constant";
import Spinner from "../../../Spinner";
const CommentPic = React.lazy(() => import("./CommentPic"));

function EventDetails() {
  const userDetails = useContext(userContext);
  const { eventId } = useParams();
  const [foundEvent, setFoundEvent] = useState(null);
  const [ticketType, setTicketType] = useState("select");
  const [comment, setComment] = useState("");
  const [postComment, setPostComment] = useState(false);
  const [commentError, setCommentError] = useState(null);
  const [errorProceed, setErrorProceed] = useState(false);
  const [eventComments, setEventComments] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);
  const [cost, setCost] = useState(0);
  const [units, setUnits] = useState(1);
  const [total, setTotal] = useState(0);
  const history = useHistory();

  useEffect(() => {
    fetch(`${url}/events/${eventId}`).then((resp) => {
      if (resp.ok) {
        resp.json().then((data) => setFoundEvent(data));
      }
    });
  }, [eventId]);

  useEffect(() => {
    fetch(`${url}/comments`).then((resp) => {
      if (resp.ok) {
        resp.json().then((data) => {
          data = data.filter((d) => parseInt(d.event_id) === parseInt(eventId));
          setEventComments(data);
        });
      } else {
        console.log("Comments fail");
      }
    });
    return () => {
      setIsDeleted(false);
    };
  }, [postComment, isDeleted, eventId]);

  useEffect(() => {
    if (ticketType === "regular") {
      setCost(foundEvent["ticket_regular"]);
    } else if (ticketType === "VIP") {
      setCost(foundEvent["ticket_vip"]);
    } else if (ticketType === "VVIP") {
      setCost(foundEvent["ticket_vvip"]);
    } else {
      setCost(0);
    }
    setTotal(cost * units);
  }, [ticketType, units, cost]);

  function handleProceed() {
    if (total <= 0) {
      setErrorProceed(true);
    } else {
      setErrorProceed(false);
      history.push(`/checkout/${eventId + "-" + total}`);
    }
  }

  function handleChange(e) {
    setComment(e.target.value);
  }

  function handleDelete(id) {
    fetch(`${url}/comments/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    }).then(setIsDeleted(true));
  }

  function handleComment(e) {
    e.preventDefault();
    setPostComment(true);
    if (userDetails) {
      fetch(`${url}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: comment,
          event_id: eventId,
          client_id: userDetails.id,
        }),
      }).then((resp) => {
        if (resp.ok) {
          e.target.reset();
          setComment("");
          setPostComment(false);
        } else {
          setPostComment(false);
          resp.json().then((data) => setCommentError(data.errors));
        }
        // setPostComment(false);
      });
    } else {
      setPostComment(false);
      setCommentError(["Please sign in to post a comment"]);
    }
  }

  return (
    <>
      {foundEvent ? (
        <div className="mt-4 flex flex-col items-center mb-12 justify-center">
          <div className="w-[80%] h-auto shadow-lg bg-white my-2 flex flex-col">
            <div className="h-[15%] border-b border-gray-300 mx-3 p-3 flex justify-between items-center">
              <h3 className="text-2xl flex-1 font-bold text-gray-800">
                {foundEvent.event_name}
              </h3>
              <a
                href="#payTable"
                className="border border-gray-300 px-4 py-3 bg-[#242565] text-white"
              >
                Buy Ticket
              </a>
            </div>
            <div className="p-4 h-[500px] flex md:flex-row gap-6 border-b flex-col">
              <img
                src={foundEvent.event_card_image}
                alt={foundEvent.event_name}
                className="w-[30rem] min-w-[250px] h-full max-h-[600px] object-cover "
              />
              <div className="flex flex-col relative">
                <div className="flex gap-6 items-center">
                  <div className="border bg-[#242565] flex flex-col p-8 items-center justify-center text-white">
                    <span>
                      {foundEvent.date && foundEvent.date.split(" ")[0]}
                    </span>
                    <span>
                      {foundEvent.date && foundEvent.date.split(" ")[2]}
                    </span>
                    <span>
                      {foundEvent.date &&
                        `${foundEvent.date.split(" ")[1]} ${
                          foundEvent.date.split(" ")[3]
                        }`}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <p>
                      <span className="font-semibold">Runs till: </span>
                      <span>{foundEvent.runs_till}</span>
                    </p>
                    <p>
                      <span className="font-semibold">Time: </span>
                      <span>{foundEvent.time}</span>
                    </p>
                    <p>
                      <span className="font-semibold">Location: </span>
                      <span>
                        {foundEvent.location &&
                          foundEvent.location.location_name}
                      </span>
                    </p>
                    <p>
                      <span className="font-semibold">Category: </span>
                      <span>{foundEvent.category}</span>
                    </p>
                  </div>
                </div>
                <div className="h-full flex flex-col justify-between overflow-y-auto">
                  <p className="mt-4 mb-6">{foundEvent.description}</p>
                  {foundEvent ? (
                    <h3 className="font-bold text-[#242565] text-center my-2">
                      Meet our Sponsors
                    </h3>
                  ) : (
                    ""
                  )}
                  <div className="text-center">
                    <div
                      className="grid mdPro:grid-cols-3 md:grid-cols-2 grid-cols-1 justify-items-center"
                      id="payTable"
                    >
                      {foundEvent.sponsors &&
                        foundEvent.sponsors.map((sponsor) => {
                          return (
                            <div className="col-span-1" key={sponsor.id}>
                              <img
                                src={sponsor.sponsor_image}
                                alt={sponsor.sponsor_name}
                                className="rounded-full w-24 h-24"
                              />
                              <p className="text-gray-500 py-1">
                                {sponsor.sponsor_name}
                              </p>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-2 my-2 text-center">
              <p>
                Get your tickets to
                <span> {foundEvent.event_name}</span>
              </p>

              <div className="relative overflow-x-auto my-4 rounded">
                <table className="w-full text-sm text-left text-gray-300 dark:text-gray-400">
                  <thead className="text-xs text-gray-200 uppercase bg-gray-700">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-center">
                        Ticket Type
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        Cost
                      </th>

                      <th scope="col" className="px-6 py-3 text-center">
                        Units
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-black">
                    <tr className="border-b">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center"
                      >
                        <select
                          id="ticketCollection"
                          className="text-black px-4 text-center"
                          onClick={(e) => setTicketType(e.target.value)}
                        >
                          <option value="">Select</option>
                          <option value="regular">Regular</option>
                          <option value="VIP">VIP</option>
                          <option value="VVIP">VVIP</option>
                        </select>
                      </th>
                      <td className="px-6 py-4 text-center">
                        <span>Ksh. </span>
                        <span id="cost">{cost}</span>
                      </td>
                      <td className="text-center">
                        <select
                          id="units"
                          className="px-2"
                          onClick={(e) => setUnits(e.target.value)}
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span>Ksh. </span>
                        <span>{total}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <button
                type="button"
                className="border bg-[#242565] text-white p-4 uppercase
              text-center tracking-wider"
                onClick={() => handleProceed()}
              >
                Proceed to pay
              </button>
              {errorProceed ? (
                <div className="bg-[#e69494] p-4 text-white my-2 text-left">
                  Please select a ticket type
                </div>
              ) : (
                ""
              )}
              <div className="comment-section p-4 text-left border-t mt-6">
                <h4 className="font-semibold text-lg text-gray-600">
                  <span>{eventComments && eventComments.length}</span>
                  <span> Comment(s)</span>
                </h4>
                <form onSubmit={(e) => handleComment(e)}>
                  <textarea
                    id="comment"
                    cols="30"
                    rows="10"
                    className="border border-gray-400 w-full rounded p-4 h-24"
                    onChange={(e) => handleChange(e)}
                    value={comment}
                    placeholder="Share your thoughts..."
                  ></textarea>
                  <button
                    type="submit"
                    className="p-2 rounded bg-[#242565] text-white"
                  >
                    Comment
                  </button>
                </form>
                <ul>
                  {commentError
                    ? commentError.map((err, index) => (
                        <li
                          className="my-2 bg-[#e69494] p-4 text-white "
                          key={index}
                        >
                          {err}
                        </li>
                      ))
                    : ""}
                </ul>
                <h4 className="my-4 text-gray-600 font-semibold">Comments</h4>
                <div className="text-gray-500">
                  {eventComments &&
                    eventComments.map((comment) => {
                      return (
                        <div className="border-b p-2 flex " key={comment.id}>
                          <div className="w-10 h-10 overflow-hidden">
                            {comment.client && (
                              <Suspense
                                fallback={
                                  <div className="w-full h-full object-cover rounded-full bg-gray-500"></div>
                                }
                              >
                                <CommentPic comment={comment} />
                              </Suspense>
                            )}
                          </div>
                          <div className="flex flex-col w-4/5 text-gray-600 font-light italic text-sm">
                            <p className="text-xs font-semibold ml-1">
                              {comment.client && comment.client.client_name}
                            </p>
                            <p className="text-gray-500 mx-3">
                              {comment.content}
                            </p>
                            {userDetails &&
                            comment.client_id === userDetails.id ? (
                              <button
                                type="button"
                                className="text-white bg-red-500 rounded px-2 w-max mt-2"
                                onClick={() => handleDelete(comment.id)}
                              >
                                Delete
                              </button>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full py-32 flex items-center justify-center">
          <Spinner />
        </div>
      )}
    </>
  );
}

export default EventDetails;
