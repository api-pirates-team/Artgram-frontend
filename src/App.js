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



class App extends Component {
  constructor(props){
super(props)
this.state={
  likesData:[]
}
}
handleLike=(likesData)=>{
this.setState={
likesData:likesData
}

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
              <Gallery handleLike={this.handleLike}/> 
            </Route>
            <Route path="/login">
              <Login/>
            </Route>
            <Route path="/about_us">
              <AboutUs/>
            </Route>
            <Route path="/feed">
              <Feed likesData={this.state.likesData}/>
            </Route>
          </Switch>
          <Footer />
        </Router>
      </>
    );
  }
}

export default withAuth0(App);
