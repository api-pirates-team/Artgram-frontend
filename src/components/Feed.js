import React, { Component } from 'react'
import axios from "axios";
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
    });console.log(this.state.userdata);
};



  render() {
    this.getdata();
    return (
      <div>
        {/* {this.getdata} */}
        <h1>{this.state.userdata.email}</h1>

       
        
      </div>
    )
  }
}

export default withAuth0(Feed)
