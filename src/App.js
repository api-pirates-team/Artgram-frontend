import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./CSS/Body.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Gallery from "./components/Gallery";
import Feed from "./components/Feed";
import AboutUs from "./components/AboutUs";
import axios from "axios";
import HomePage from "./components/HomePage";
import { withAuth0 } from "@auth0/auth0-react";
import RingLoader from "react-spinners/RingLoader";
import SyncLoader from "react-spinners/SyncLoader";
import PageNotFound from "./components/PageNotFound";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likedArtsData: [],
      currentUser: {
        username: "",
        email: "",
        pp: "",
        isArtists: false,
      },
      currentUserDB: {},
      authFinishedFlag: false,
      gotUserFlag: false,
      spinnerLoading: true
    };
  }

  componentDidMount = async () => {
      setTimeout(async () => {
        await this.props.auth0.isAuthenticated && this.setState({
          currentUser: {
            username: this.props.auth0.user.name,
            email: this.props.auth0.user.email,
            pp: this.props.auth0.user.picture,
          },
          authFinishedFlag: true,
        });
        if(this.state.authFinishedFlag) {
          console.log('we have the user data Auth');
          await axios.get( `${process.env.REACT_APP_BACKEND_SERVER}/getuser?email=${this.state.currentUser.email}`)
          .then((response) => {
          this.setState({
            currentUserDB: response.data,
            gotUserFlag: true,
            spinnerLoading: false,
          });
          console.log('we have the user data from the DB')
        });}
        if(!this.state.authFinishedFlag) {
          this.setState({
            spinnerLoading: false,
          })
        }
      }, 4000)
  }

  updateUserData = async (data) => {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_SERVER}/getuser?email=${this.state.currentUser.email}`
      )
      .then((response) => {
        this.setState({
          currentUserDB: response.data,
        });
      });
      let config = {
        method: "PUT",
        baseURL: `${process.env.REACT_APP_BACKEND_SERVER}`,
        url: `/update-likes/${this.state.currentUserDB._id}`,
        data: data,
      };
      axios(config).then((res) => {
        this.setState({
          likedArtsData: res.data.likedArts,
        });
      });
    }
    

  render() {
    return (
      <>
        {this.state.spinnerLoading ? (
          <div className="loadingDiv">
            <h1 style={{ color: "white", marginBottom: "50px" }}>
            Loading <SyncLoader color="white" />
            </h1>
            <RingLoader size="250" color="white" />{" "}
          </div>
        ) : (
          <>
            <Header gotUserFlag={this.props.gotUserFlag}/>
            <Router>
              <Switch>
                <Route exact path="/">
                  <div className="homePageDiv">
                    <h1>Create Your Collection Of Arts</h1>
                    <p>
                      Explore, like, collect, and share your favorite artwork!
                    </p>
                    <br />
                    <h2>
                      " The aim of art is not to represent the outward
                      appearance of things, but their inward significance "
                    </h2>
                  </div>
                  <HomePage currentUserDB={this.state.currentUserDB} updateUserData={this.updateUserData} gotUserFlag={this.state.gotUserFlag}/>
                </Route>
                <Route exact path="/gallery">
                {this.state.gotUserFlag &&
                  <Gallery
                    updateUserData={this.updateUserData}
                    currentUserDB={this.state.currentUserDB}
                    
                  /> }
                </Route>
                <Route path="/about_us">
                  <AboutUs />
                </Route>
                <Route path="/feed">
                {this.state.gotUserFlag &&
                  <Feed currentUserDB={this.state.currentUserDB} updateUserData={this.updateUserData} />
                }
                </Route>
                <Route>
                  <PageNotFound />
                </Route>
              </Switch>
              <Footer />
            </Router>
          </>
        )}
      </>
    );
  }
}

export default withAuth0(App);
