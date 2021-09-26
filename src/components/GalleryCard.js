import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";
import GalleryModal from "./GalleryModal";
import { withAuth0 } from '@auth0/auth0-react';


class GalleryCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idUser: '',
      showModal: false,
    };
  }
  modalHandle = () => {
    this.setState({
      showModal: true,
    });
  };
  closeModal = () => {
    this.setState({
      showModal: false,
    });
  };

  render() {
    return (
      <>
        <Card style={{ width: "18rem", height: "450px" }}>
          <Card.Img variant="top" src={this.props.imageUrl} style={{ height: "300px" }} />
          <Card.Body>
            <Card.Title>{this.props.title}</Card.Title>
            <Button variant="danger" onClick={() => { this.props.updateUserData(this.props.items) }}>like</Button>
            <Button variant="primary">Share</Button>
            <Button variant="warning" onClick={this.modalHandle}>
              More
            </Button>
            <Card.Text></Card.Text>
          </Card.Body>
        </Card>
        <GalleryModal
          closeModal={this.closeModal}
          showModal={this.state.showModal}
          imageUrl={this.props.imageUrl}
          title={this.props.title}
          displaydate={this.props.displaydate}
          artistName={this.props.artistName}
          dimensions={this.props.dimensions}
        />
      </>
    );
  }
}

export default withAuth0(GalleryCard);
