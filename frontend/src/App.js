// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotBrowser from "./components/SpotsBrowser";
import SpotDetails from "./components/SpotDetails";
import CurrentUser from "./components/CurrentUserSpots";
import EditSpot from "./components/EditSpot";
import CreateSpot from "./components/CreateSpot";

import CreateSpotPlease from "./components/CreateSpot";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
          <SpotBrowser/>
          </Route>
         <Route exact path="/signup">
            <SignupFormPage/>
          </Route>
          <Route exact path="/spots/new">
            <CreateSpotPlease/>
          </Route>
          <Route exact path="/spots/current">
            <CurrentUser />
          </Route>
          <Route exact path = "/spots/:spotId">
            <SpotDetails/>
          </Route>
          <Route exact path = "/spots/:spotId/edit">
            <EditSpot/>
          </Route>
        </Switch>
      )}
      {!isLoaded && (
        <Switch>
          <Route exact path="/">
            Unable to retrieve spots. Please try again shortly. Thank you!
          </Route>
        <Route exact path="/spots/:spotId">
          Unable to retrieve details. Please try again shortly. Thank you!
        </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
