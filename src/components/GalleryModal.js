import React, { Component } from "react";
import { Modal, Image } from "react-bootstrap";

class GalleryModal extends Component {
  render() {
    return (
      <Modal
        size="lg"
        show={this.props.showModal}
        onHide={this.props.closeModal}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            {this.props.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Image style={{width:"100%",height:"100%"}} src={this.props.imageUrl} />
          <p>{this.props.displaydate}</p>
          <p>{this.props.artistName}</p>
          <p>{this.props.dimensions}</p>
        </Modal.Body>
      </Modal>
    );
  }
}

export default GalleryModal;
