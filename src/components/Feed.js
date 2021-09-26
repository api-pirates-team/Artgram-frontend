import React, { Component } from 'react'
import axios from "axios";
import Profile from './Profile';
import { withAuth0 ,auth0} from '@auth0/auth0-react';
import { Card,Button } from 'react-bootstrap';




class Feed extends Component {
constructor(props){
  super(props);
  this.state={
   userdata:[]
  }

}
getdata = async() => {
  await axios
    .get(`${process.env.REACT_APP_BACKEND_SERVER}/getuser?email=momosamak21@gmail.com`)
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

        {this.props.likesData.map(ele=>{
return( 
<Card style={{ width: "18rem", height:"450px" }}>
<Card.Img variant="top" src={ele.imageUrl} style={{height:"300px"}}/>
<Card.Body>
  <Card.Title>{ele.title}</Card.Title>
  <p>{ele.artistName}</p>
  <p>{ele.displaydate}</p>
  <p>{ele.dimensions}</p>
  <Button variant="danger" >like</Button>
  <Button variant="primary">Share</Button>
  <Card.Text></Card.Text>
</Card.Body>
</Card>
)
        })}
        
      </div>
    )
  }
}

export default withAuth0(Feed)
