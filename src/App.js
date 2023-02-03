import { createContext, useEffect, useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import Navbar from "./components/user/Navbar";
import About from "./components/user/pages/AboutPage/About";
import Events from "./components/user/pages/EventsPage/Events";
import Landing from "./components/user/pages/LandingPage/Landing";
import LoginForm from "./components/user/pages/LoginPage/LoginForm";
import Profile from "./components/user/pages/ProfilePage/Profile";
import SignupForm from "./components/user/pages/SignupPage/SignupForm";
import EventDetails from "./components/user/pages/EventsPage/EventDetails";
import Tickets from "./components/user/pages/TicketsPage/Tickets";
import Checkout from "./components/user/pages/CheckoutPage/Checkout";
import { url } from "./constant";

export const StatusContext = createContext();
export const userContext = createContext();
export const LogoutContext = createContext();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({});
  const [loginError, setLoginError] = useState(null);
  const history = useHistory();
  const [events, setEvents] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [sponsors, setSponsors] = useState(null);

  useEffect(() => {
    if (!user) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  }, [user]);

  useEffect(() => {
    fetch(`${url}/me`).then((resp) => {
      if (resp.ok) {
        resp.json().then((data) => setUser(data));
        console.log(user)
      } else {
        setUser(null);
      }
    });
    fetch(`${url}/events`).then((resp) => {
      if (resp.ok) {
        resp.json().then((data) => setEvents(data));
      } else {
        setEvents(null);
      }
    });
    fetch(`${url}/sponsors`).then((resp) => {
      if (resp.ok) {
        resp.json().then((data) => setSponsors(data));
      } else {
        setSponsors(null);
      }
    });
  }, []);

  function handleSearch(e) {
    setSearchValue(e.target.value.toLowerCase());
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  function handleLogin(e) {
    e.preventDefault();
    fetch(`${url}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(formData),
    }).then((resp) => {
      if (resp.ok) {
        resp.json().then((data) => setUser(data));
        e.target.reset();
        history.push("/");
      } else {
        resp.json().then((e) => setLoginError(e.errors[0]));
      }
    });
  }

  function handleLogout() {
    fetch(`${url}/logout`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({}),
    }).then((resp) => {
      if (resp.ok) {
        setUser(null);
        history.push("/");
      }
    });
  }

  function handleFilter(val) {
    setFilterValue(val);
  }

  return (
    <div>
      <Switch>
        <StatusContext.Provider value={isLoggedIn}>
          <userContext.Provider value={user}>
            <LogoutContext.Provider value={handleLogout}>
              <Route exact path="/events">
                <Navbar searchBar={true} handleSearch={handleSearch} />
                <Events
                  events={
                    events &&
                    events.filter(
                      (event) =>
                        event.event_name
                          .toLowerCase()
                          .includes(searchValue.toLowerCase()) &&
                        (event.category === filterValue || filterValue === "")
                    )
                  }
                  handleFilter={handleFilter}
                />
              </Route>
              <Route path="/events/:eventId">
                <Navbar />
                <EventDetails />
              </Route>
              <Route exact path="/checkout/:data">
                <Checkout />
              </Route>
              <Route exact path="/about">
                <Navbar />
                <About />
              </Route>
              <Route exact path="/tickets">
                <Navbar />
                <Tickets />
              </Route>
              <Route exact path="/userLogin">
                <Navbar />
                <LoginForm
                  handleLogin={handleLogin}
                  handleChange={handleChange}
                  loginError={loginError}
                />
              </Route>
              <Route exact path="/userSignup">
                <Navbar />
                <SignupForm />
              </Route>
              <Route exact path="/profile">
                <Navbar profile={true} />
                <Profile />
              </Route>
              <Route exact path="/">
                <Navbar landing={true} />
                <Landing events={events} sponsors={sponsors} />
              </Route>
            </LogoutContext.Provider>
          </userContext.Provider>
        </StatusContext.Provider>
      </Switch>
    </div>
  );
}

export default App;
