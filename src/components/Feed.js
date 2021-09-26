import React, { Component } from 'react'
import axios from "axios";
import Profile from './Profile';
import { withAuth0 ,auth0} from '@auth0/auth0-react';




class Feed extends Component {
constructor(props){
  super(props);
  this.state={
   userdata:[]
  }

}
getdata = async() => {
  await axios
    .get(`http://localhost:1177/getuser?email=momosamak21@gmail.com`)
    .then((res) => {
      this.setState({
        userdata: res.data,
      });
    });
};



  render() {
    this.getdata();
    return (
      <div>
        {/* {this.getdata} */}
        <img src={this.state.userdata.pp} alt={this.state.userdata.username} />
        <h1>{this.state.userdata.username}</h1>
        <h1>{this.state.userdata.email}</h1>
        
        {/* <Profile/> */}
        
      </div>
    )
  }
}

export default withAuth0(Feed)
