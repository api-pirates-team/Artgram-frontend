import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./CSS/Body.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Gallery from "./components/Gallery";
import Feed from "./components/Feed";
import AboutUs from "./components/AboutUs";
import { withAuth0 } from '@auth0/auth0-react';
import Login from './components/Login';
import axios from "axios";
import Delayed from './components/Delayed';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      likedArtsData: [],
      currentUser: {
        username: '',
        email: '',
        pp: '',
        isArtists: false,
      },
      currentUserDB: {}
    }
  }

  componentDidMount = () => {
    setTimeout(async () => {
      await this.props.auth0.isAuthenticated && this.setState({
        currentUser: {
          username: this.props.auth0.user.name,
          email: this.props.auth0.user.email,
          pp: this.props.auth0.user.picture,
        }
      });
      console.log(this.state.currentUser);
    }, 5000);
  };

  updateUserData = async (data) => {
    axios.get(`https://artgram-backend.herokuapp.com/getuser?email=${this.state.currentUser.email}`).then(response => {
      this.setState({
        currentUserDB: response.data
      });
    });
    let config = {
      method: "PUT",
      baseURL: `https://artgram-backend.herokuapp.com/`,
      url: `update-likes/${this.state.currentUserDB._id}`,
      data: data
    };
    axios(config).then(res => {
      this.setState({
        likedArtsData: res.data.likedArts
      })
    })
  }
  render() {
    return (
      <>
        <Header />
        <Router>
          <Switch>
            <Route exact path="/">
              <p style={{ height: "1000px", color: "white" }}>hello</p>
            </Route>
            <Route exact path="/gallery">
              <Gallery
                updateUserData={this.updateUserData} currentUserDB={this.state.currentUserDB}
              />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/about_us">
              <AboutUs />
            </Route>
            <Route path="/feed">
              <Delayed waitBeforeShow={8000}>
                <Feed currentUserDB={this.state.currentUserDB} />
              </Delayed>
            </Route>
          </Switch>
          <Footer />
        </Router>
      </>
    );
  }
}

export default withAuth0(App);
