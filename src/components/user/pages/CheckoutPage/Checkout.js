import React, { useEffect, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { NavLink, useParams } from "react-router-dom";
import Page404 from "../Page404/Page404";

function Checkout() {
  const { data } = useParams();
  const [event, setEvent] = useState({});
  const eventId = data.slice(0, data.indexOf("-"));
  const [is404, setIs404] = useState(false);
  const total = data.slice(data.indexOf("-") + 1);
  useEffect(() => {
    fetch(`/events/${parseInt(eventId)}`).then((resp) => {
      if (resp.ok) {
        setIs404(false);
        const response = resp.json();
        setEvent(() => response.then((data) => setEvent(data)));
      } else {
        setIs404(true);
      }
    });
  }, [data, eventId]);

  return (
    <>
      {is404 === false ? (
        <div className="w-full h-full relative">
          <NavLink
            exact
            to="/"
            className="fixed top-0 left-0 p-4 bg-blue-600 text-white"
          >
            Back Home
          </NavLink>
          <div className="border w-96 mx-auto shadow-lg px-2 mt-2 bg-blue-700 rounded-md">
            <h3 className="my-1 text-center text-lg text-white font-bold ">
              PayPal Checkout
            </h3>
            <div className="h-64 mx-auto mb-2 rounded overflow-hidden">
              <img
                src={event.event_card_image}
                alt={event.event_name}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="bg-gray-100 p-4 my-4 flex gap-4 justify-between items-center text-gray-800 font-bold text-lg tracking-wider shadow-lg uppercase">
              <span>Event:</span>{" "}
              <span className="italic flex-1">{event.event_name}</span>
            </div>
            <div className="bg-gray-100 p-4 my-4 flex px-8 gap-2 justify-between items-center text-gray-800 font-bold text-lg tracking-wider shadow-lg uppercase">
              <span>Total:</span> <span>KSH. {total}</span>
            </div>
            <PayPalScriptProvider
              options={{
                "client-id":
                  "AfrVJ7j2pZ-Ua19vYZPdP04UJNhvB-7EztfNAYHCiWVvI5h_B14nH1AOrh2pfGeuBmSoo8ndtqm3qhEx",
              }}
            >
              <PayPalButtons
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: { value: total },
                      },
                    ],
                  });
                }}
                onApprove={async (data, actions) => {
                  const details = await actions.order.capture();
                  // This function shows a transaction success message to your buyer.
                  alert(
                    "Transaction completed by " + details.payer.name.given_name
                  );
                }}
              />
            </PayPalScriptProvider>
          </div>
        </div>
      ) : (
        <Page404 />
      )}
    </>
  );
}

export default Checkout;
