import React from 'react';
import '../assets/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './layout/TopNavbar'
import Footer from './layout/Footer'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Inquiry from './Inquiry/Inquiry';
import Offering from './Offering/Offering';
import Position from './Position';
import NoMatch from './NoMatch';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Inquiry />
        </Route>
        <Route path="/inquiry">
          <Inquiry />
        </Route>
        <Route path="/offering">
          <Offering />
        </Route>
        <Route path="/position">
          <Position />
        </Route>
        {/* <Route path="/:user">
          <User />
        </Route> */}
        <Route>
          <NoMatch />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
