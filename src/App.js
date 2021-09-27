import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./CSS/Body.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Gallery from "./components/Gallery";
import Feed from "./components/Feed";
import AboutUs from "./components/AboutUs";
import { withAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import HomePage from "./components/HomePage";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likedArtsData: [],
    };
  }

  updateUserData = (data) => {
    // let configuser = {
    //   method: "GET",
    //   baseUrl: `https://artgram-backend.herokuapp.com`,
    //   url: `/getuser?email=hassanhamdandev@gamil.com`
    // }
    // axios(configuser).then(response => {
    //   this.setState({
    //     idUser: response.data._id
    //   })
    // })
    let config = {
      method: "PUT",
      baseURL: `${process.env.REACT_APP_BACKEND_SERVER}`,
      url: `/update-likes/6150e1478c5eca8bc44cf16b`,
      data: data,
    };
    axios(config).then((res) => {
      this.setState({
        likedArtsData: res.data.likedArts,
      });
      // console.log(res.data.likedArts);
    });
  };

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.likedArtsData !== nextState.likedArtsData;
  }

  render() {
    return (
      <>
        <Header />
        <Router>
          <Switch>
            <Route exact path="/">
              <HomePage />
              <p style={{ height: "1000px", color: "white" }}>hello</p>

            </Route>
            <Route exact path="/gallery">
              <Gallery updateUserData={this.updateUserData} />
            </Route>
            {/* <Route path="/login">
              { <Login />}
            </Route> */}
            <Route path="/about_us">
              <AboutUs />
            </Route>
            <Route path="/feed">
              <Feed
                likedArtsData={this.state.likedArtsData}
              // likesData={this.state.likesData}
              />
            </Route>
          </Switch>
          <Footer />
        </Router>
      </>
    );
  }
}

export default withAuth0(App);
