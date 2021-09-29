import React, { Component } from "react";
import axios from "axios";
import GalleryCard from "../components/GalleryCard";
import { Row, Col, Container } from "react-bootstrap";
import "../CSS/gallarymodal.css";
import RingLoader from "react-spinners/RingLoader";
import SyncLoader from "react-spinners/SyncLoader";

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      galleryData: [],
      isGalleryReady: false,
    };
  };

  componentDidMount = () => {
    axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/art/allart`).then((res) => {
        this.setState({
          galleryData: res.data,
          isGalleryReady: true
        });
      });
  };

  render() {
    return (
      <>
        <div className='homePageDiv'>
          <h1 >Museums Gallery</h1>
          <p className="descriptionP">In this gallery, you can find artwork coming from three different well-known museums: Harvard Art Museums, Art Institute of Chicago, and Rijksstudio</p>
        </div>
        {this.state.isGalleryReady? <Container className='mainGalleryContainer' fluid="md">
        <Row xs={1} md={3} className="g-3">
          {this.state.galleryData.map((item) => {
            return (
              <Col>
                <GalleryCard
                  imageUrl={item.imageUrl}
                  title={item.title}
                  displaydate={item.displaydate}
                  artistName={item.artistName}
                  dimensions={item.dimensions}
                  id={item._id}
                  updateUserData={this.props.updateUserData}
                  items={item}
                  likesCounter={item.likesCounter}
                />
              </Col>
            );
          })}
        </Row>
      </Container> : <div className="loadingDiv">
            <h1 style={{ color: "white", marginBottom: "50px" }}>
            spinnerLoading <SyncLoader color="white" />
            </h1>
            <RingLoader size="250" color="white" />{" "}
          </div>}
        
      </>
    );
  }
}

export default Gallery;
