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
    };
  }

  componentDidMount = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_SERVER}/art/allart`)
      .then((res) => {
        this.setState({
          galleryHome: res.data,
        });
      });
  };

  seeMore = () => {
     if (!this.props.auth0.isAuthenticated) {
        Swal.fire({
            icon: 'error',
            title: 'Oops... LogIn please',
          })
     }
  }

  render() {
    return (
      <>
        
          <Container style={{ width:"80%", marginBottom:"100px"}}>
              <h2 id="h2">Sample Of Our Museums Gallery</h2>
            <Carousel fade style={{ zIndex:"0"}}>
              {this.state.galleryHome.slice(-8).map((item) => {
                return (
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src={item.imageUrl}
                      alt="First slide"
                      style={{height:"600px", width:"80%"}}
                    />
                    <Carousel.Caption>
                      <h3>{item.title}</h3>
                      <a href={this.props.auth0.isAuthenticated && "/gallery"}><button onClick={this.seeMore} id="seeMore">See More</button></a>
                    </Carousel.Caption>
                  </Carousel.Item>
                );
              })}
            </Carousel>
            </Container>
       
      </>
    );
  }
}

export default withAuth0(ArtistGallery);
