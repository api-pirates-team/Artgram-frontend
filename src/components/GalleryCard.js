import React, { Component } from "react";
import axios from "axios";
import { Card, Button, Row, Col } from "react-bootstrap";
import { BsX } from "react-icons/bs";
import { withAuth0 } from "@auth0/auth0-react";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import '../CSS/CardStyle.css'
import swal from 'sweetalert';
import { CgMoreAlt } from "react-icons/cg";

class GalleryCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idUser: "",
      showModal: false,
      count: this.props.likesCounter,
      likeClicked: false,
      show: false,
      model: false,
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

  incrementCount = () => {
    this.setState({ likeClicked: true });
    axios.put(`${process.env.REACT_APP_BACKEND_SERVER}/liked-item/${this.props.id}`, { "like?": "yes" }).then(res => {
      this.setState({ count: res.data.newLikes + 1 });
      console.log(this.state.count)
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
        <Card class="Maincard" style={{margin:'auto', width: "18rem", height: "450px" }}>
          <Card.Img
            class="Maincard"
            variant="top"
            src={this.props.imageUrl}
            style={{ height: "300px" }}
          />
          <Card.Body class="Maincard">
            <Card.Title class="Maincard" style={{ 'margin-top': '10px', 'font-weight': '600', 'font-size': '18px', }}>{this.props.title}</Card.Title>
            <small>{this.state.count} likes</small><br /><br />
            <div className="svgsHolder">
              {this.state.likeClicked ? <Button variant="none"><FcLike style={{ fontSize: "25px" }} /></Button> : <Button
                variant="none"
                onClick=
                {() => {
                  this.props.updateUserData(this.props.items);
                  console.log(this.props.updateUserData);
                  this.incrementCount()
                  swal("Success!", "You've added this piece to your feed!", "success");
                }}><FcLikePlaceholder style={{ fontSize: "25px" }} /></Button>}
              <Button variant="none" onClick={() => this.setState({ model: true })}>
                <CgMoreAlt style={{ fontSize: "25px", color: "white" }} />
              </Button>
            </div>
            <Card.Text></Card.Text>
          </Card.Body>
        </Card>

        <div className={this.state.model ? 'model open' : 'model'}>
          <BsX className='closingIcon' onClick={() => this.setState({ model: false })} />
          <Row>
            <Col><img src={this.props.imageUrl} alt='' /></Col>
            <Col className='imageData'>
              <h3>{this.props.title}</h3>
              <p>{this.state.count} likes</p>
              <p>Artist: {this.props.artistName}</p>
              <p>Date year: {this.props.displaydate}</p>
              <p>Dimensions: {this.props.dimensions}</p>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default withAuth0(GalleryCard);

