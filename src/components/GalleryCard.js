import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";
import GalleryModal from "./GalleryModal";
import { withAuth0 } from "@auth0/auth0-react";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";

class GalleryCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idUser: "",
      showModal: false,
      count:0,
      likeClicked: false,
    };
  };

  incrementCount= () => {
    this.setState({
      count:this.state.count+1,
      likeClicked: true
    })
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
      {/* <button type="button" onclick="this.disabled = 'disabled';">Click Me!</button> */}
        <Card style={{ width: "18rem", height: "450px" }}>
          <Card.Img
            variant="top"
            src={this.props.imageUrl}
            style={{ height: "300px" }}
          />
          <Card.Body>
            <Card.Title>{this.props.title}</Card.Title>
            {this.state.likeClicked ? <FcLike size='30px'></FcLike> : <FcLikePlaceholder size='30px'
              onClick= 
              {() => {
                this.props.updateUserData(this.props.items);
                console.log(this.props.updateUserData);
                this.incrementCount()
                }}></FcLikePlaceholder>}
            
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

