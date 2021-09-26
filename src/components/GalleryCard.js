import axios from "axios";
import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";
import GalleryModal from "./GalleryModal";

class GalleryCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
  updateUserData=(data)=>{
    let config=  {
      method: "PUT",
      baseURL: `${process.env.REACT_APP_BACKEND_SERVER}`,
      url: `/update-likes/614f54575eaf5c7e91a5b913`,
      data:data
      
}
console.log(data)
axios(config).then(res=>{
  this.props.handleLike(res.data.likedArts) ;
  console.log(res.data)
})

  }
  render() {
    return (
      <>
        <Card style={{ width: "18rem", height:"450px" }}>
          <Card.Img variant="top" src={this.props.imageUrl} style={{height:"300px"}}/>
          <Card.Body>
            <Card.Title>{this.props.title}</Card.Title>
            <Button variant="danger" onClick={()=>{this.updateUserData(this.props.items)}}>like</Button>
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

export default GalleryCard;
