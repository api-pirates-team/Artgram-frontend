import React, { Component } from "react";
import { Modal, Image } from "react-bootstrap";
import "../CSS/gallarymodal.css"

class GalleryModal extends Component {
  render() {
    return (
      <Modal
      className= "Modal"
      id="mainmodal"
        size="lg"
        show={this.props.showModal}
        onHide={this.props.closeModal}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header className= "Modal" closeButton>
          <Modal.Title className= "Modal" id="example-modal-sizes-title-lg">
            {this.props.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className= "Modal">
          <Image
          className= "ModalImg"
            style={{ width: "100%", height: "100%" }}
            src={this.props.imageUrl}
          /> <br/>
          <br/>
          <p>Display Date : {this.props.displaydate}</p>
          <p> Artist Name : {this.props.artistName}</p>
          <p>Art Dimensions : {this.props.dimensions}</p>
        </Modal.Body>
      </Modal>
    );
  }
}

export default GalleryModal;
