import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";
import GalleryModal from "./GalleryModal";
import { withAuth0 } from "@auth0/auth0-react";
// import ButtonLikes from './Button';
import '../CSS/CardStyle.css'
import swal from 'sweetalert';
import { FacebookIcon, TwitterIcon, WhatsappIcon, PinterestIcon } from "react-share";

import { FcLike } from "react-icons/fc"
import { FcShare } from "react-icons/fc"
import { CgMoreO } from "react-icons/cg"

class GalleryCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idUser: "",
      showModal: false,
      count:0,
      show: false,

    };
  };
  handleShow = () => {
    this.setState({
      show: true,
    })
  };
  handleClose = () => {
    this.setState({
      show: false,
    })
  };
  incrementCount= () => {
    this.setState({
      count:this.state.count+1
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
    console.log(this.state.count );
    
    return (
      <>
        <Card class="Maincard" style={{ width: "18rem", height: "450px" }}>
          <Card.Img
          class="Maincard"
            variant="top"
            src={this.props.imageUrl}
            style={{ height: "300px" }}
          />
          <Card.Body class="Maincard">
            <Card.Title class="Maincard">{this.props.title}</Card.Title>
            <Button
              variant="none"
              onClick= 
              {() => {
                this.props.updateUserData(this.props.items);

                this.incrementCount()
                swal("Success!", "You added this art to your like list!", "success");
                
              }}
            > 
              <FcLike style={{fontSize:"30px"}}/>
            </Button>
            <Button  variant="none"><FcShare style={{fontSize:"30px"}} /></Button>
            <Button variant="none" onClick={this.modalHandle}>
              <CgMoreO style={{fontSize:"30px"}}/>
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
