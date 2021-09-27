import React, { Component } from "react";
import axios from "axios";
import { withAuth0 } from "@auth0/auth0-react";
import { Card, Button } from "react-bootstrap";

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userdata: [],
      renderFlag: false,
    };
  }

  componentDidMount = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_BACKEND_SERVER}/getuser?email=hassanhamdandev@gmail.com`
      )
      .then((res) => {
        this.setState({
          userdata: res.data,
        });
        setTimeout(() => {
          this.setState({
            renderFlag: true,
          });
        }, 2500);
        console.log(this.state.userdata);
      });
  };

  render() {
    return (
      this.state.renderFlag && (
        <div>
          {this.state.userdata.likedArts.map((elem) => {
            return (
              <Card style={{ width: "18rem", height: "450px" }}>
                <Card.Img
                  variant="top"
                  src={elem.imageUrl}
                  style={{ height: "300px" }}
                />
                <Card.Body>
                  <Card.Title>{elem.title}</Card.Title>
                  <p>{elem.artistName}</p>
                  <p>{elem.displaydate}</p>
                  <p>{elem.dimensions}</p>
                  <Button variant="danger">like</Button>
                  <Button variant="primary">Share</Button>
                  <Card.Text></Card.Text>
                </Card.Body>
              </Card>
            );
          })}
          {/* {this.getdata}
          <img src={this.state.userdata.pp} alt={this.state.userdata.username} />
        <h1>{this.state.userdata.username}</h1>
        <h1>{this.state.userdata.email}</h1>
          <Profile/> */}
        </div>
      )
    );
  }
}

export default withAuth0(Feed);
