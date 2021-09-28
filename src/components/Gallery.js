import React, { Component } from "react";
import axios from "axios";
import GalleryCard from "../components/GalleryCard";
import { Row, Col, Container } from "react-bootstrap";
import "../CSS/gallarymodal.css"

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      galleryData: [],
    };
  };
  
  componentDidMount = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_SERVER}/art/allart`)
      .then((res) => {
        this.setState({
          galleryData: res.data,
        });
      });
  };
  
  render() {
    return (
      <Container fluid="md" style={{ margin: "50px auto" }}>
        <h1 > Our Artest Gallery </h1>
        <Row xs={1} md={4} className="g-3">
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
      </Container>
    );
  }
}

export default Gallery;
