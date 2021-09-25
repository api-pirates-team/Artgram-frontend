import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./CSS/Body.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Gallery from "./components/Gallery";
import Feed from "./components/Feed";
import AboutUs from "./components/AboutUs";


class App extends Component {
  render() {
    return (
      <>
      <Header />
        <Router>
          
          <Switch>
            <Route exact path="/">
              <p style={{ height: "1000px", color: "white" }}>hello</p>
            </Route>
            <Route path="/gallery">
            <Gallery/>
            </Route>
            <Route path="/about_us">
              <AboutUs/>
            </Route>
            <Route path="/feed">
              <Feed/>
            </Route>
          </Switch>
          <Footer />
        </Router>
      </>
    );
  }
}

export default App;
