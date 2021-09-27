import React, { Component } from 'react'
import axios from "axios";
import { withAuth0 } from '@auth0/auth0-react';
import { Card, Button } from 'react-bootstrap';

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renderFlag: false,
    }
  }

  componentDidMount = () => {
      console.log('Working');
      console.log(this.props.currentUserDB)
    }

  render() {

    return (
      <div>
        {/* {
          this.props.currentUserDB.likedArts.map(elem => {
            return <Card style={{ width: "18rem", height: "450px" }}>
              <Card.Img variant="top" src={elem.imageUrl} style={{ height: "300px" }} />
              <Card.Body>
                <Card.Title>{elem.title}</Card.Title>
                <p>{elem.artistName}</p>
                <p>{elem.displaydate}</p>
                <p>{elem.dimensions}</p>
                <Button variant="danger" >like</Button>
                <Button variant="primary">Share</Button>
                <Card.Text></Card.Text>
              </Card.Body>
            </Card>
          })
        } */}
      </div>
    )
  }
}

export default withAuth0(Feed)
