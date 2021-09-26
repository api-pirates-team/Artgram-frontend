import React, { Component } from "react";
import axios from "axios";
import GalleryCard from "../components/GalleryCard";
import { Row, Col, Container } from "react-bootstrap";

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      galleryData: [],
    };
  }

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
      <Container fluid="md" style={{margin:"100px auto"}}>
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
                  handleLike={this.props.handleLike}
                  items={item}
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
