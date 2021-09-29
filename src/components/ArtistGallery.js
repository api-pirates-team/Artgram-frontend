import React, { Component } from "react";
import axios from "axios";
import { Container, Carousel } from "react-bootstrap";
import { withAuth0 } from "@auth0/auth0-react";
import "../CSS/ArtistGallery.css";
import Swal from 'sweetalert2';

class ArtistGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      galleryHome: [],
      carouselObjects: [{url:'https://ids.lib.harvard.edu/ids/view/48294879', title: 'Place d\'Enfer, Paris'},
      {url: 'https://ids.lib.harvard.edu/ids/view/17694681', title: 'Landscape with Peasants'}, 
      {url: 'https://ids.lib.harvard.edu/ids/view/17804502', title: 'A View Near Medfield'}, 
      {url: 'https://lh3.googleusercontent.com/KA2hIo0BlMDmyQDEC3ixvp9WHgcyJnlAvWtVcZmExh9ocPoZdQGRJh7bZjE2Mx2OGC0Zi3QGHGP0LlmuFgRlIYs36Sgn5G2OD-0MaTo=s0', title: 'Italiaans landschap met tekenaar'}, 
      {url: 'https://www.artic.edu/iiif/2/e4df4d4a-4cfb-5be8-3728-0d0bf1b44751/full/843,/0/default.jpg', title: 'The Red Room, Etretat'},
      {url: 'https://ids.lib.harvard.edu/ids/view/43182125', title: 'The Hermitage, Effect of Snow'}],
  }
}

  componentDidMount = () => {
    // axios
    //   .get(`${process.env.REACT_APP_BACKEND_SERVER}/art/allart`)
    //   .then((res) => {
    //     this.setState({
    //       galleryHome: res.data,
    //     });
    //   });
  };

  seeMore = () => {
    if (!this.props.auth0.isAuthenticated) {
      Swal.fire({
        icon: 'error',
        title: 'Sorry, But You Can\'t Explore The Full Gallery Unless You Were Logged In :)',
      })
    }
  }

  render() {
    return (
      <>
        <Container style={{ width: "80%", marginBottom: "100px" }}>
          <h2 id="h2">Museums Gallery Collection</h2>
          <Carousel fade style={{ zIndex: "0" }}>
            {/* {this.state.galleryHome.slice(-15, 105).map((item) => {
              return (
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={item.imageUrl}
                    alt="First slide"
                    style={{ height: "600px", width: "80%" }}
                  />
                  <Carousel.Caption>
                    <h3>{item.title}</h3>
                    <a href={this.props.auth0.isAuthenticated && "/gallery"}><button onClick={this.seeMore} id="seeMore">See More</button></a>
                  </Carousel.Caption>
                </Carousel.Item>
              ); */}
              {this.state.carouselObjects.map((item) => {
              return (
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={item.url}
                    alt="First slide"
                    style={{ height: "600px", width: "80%", objectFit:"cover" }}
                  />
                  <Carousel.Caption>
                    <h3>{item.title}</h3>
                    <a href={this.props.auth0.isAuthenticated && "/gallery"}><button onClick={this.seeMore} id="seeMore">See More</button></a>
                  </Carousel.Caption>
                </Carousel.Item>
              )}
            )}
          </Carousel>
        </Container>

      </>
    );
  }
}

export default withAuth0(ArtistGallery);
