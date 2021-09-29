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
      centuryRange: 0
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

  rangeValues = (inValue) => {
    switch (inValue) {
      case 0:
        inValue = 'All';
        break;
      case '2':
        inValue = '-1500';
        break;
      case '4':
        inValue = '1500-1600';
        break;
      case '6':
        inValue = '1600-1700';
        break;
      case '8':
        inValue = '1700-1800';
        break;
      case '10':
        inValue = '1800-1900';
        break;
      case '12':
        inValue = '1900-2000';
        break;
      case '14':
        inValue = '+2000';
        break;
      default:
        inValue = 'All';
        break;
    }
    return inValue;
  }

  rangeFilterArray = (arr) => {
    let search = this.rangeValues(this.state.centuryRange);
    if (search === '-1500') {
      arr = arr.filter(painting => {
        return painting.displaydate.startsWith('13') || painting.displaydate.includes('fifteenth');
      })
    } else if (search === '+2000') {
      arr = arr.filter(painting => {
        return painting.displaydate.startsWith('20');
      })
    } else if (search === 'All') {
      return this.state.galleryData;
    } else {
      arr = arr.filter(painting => {
        return painting.displaydate.startsWith(search.slice(0, 2));
      })
    }
    return arr;
  }

  render() {
    return (
      <>
        <div className='homePageDiv'>
          <h1 >Museums Gallery</h1>
          <p className="descriptionP">In this gallery, you can find artwork coming from three different well-known museums: Harvard Art Museums, Art Institute of Chicago, and Rijksstudio</p>
        </div>
        {/* Filer */}
        <div className="slidecontainer">
        <output className="rangeNumber">{this.rangeValues(this.state.centuryRange)}</output>
          <input className="slider" type="range" min="0" max="14" step="2" value={this.state.centuryRange}
            onChange={(e) => {
              this.setState({
                centuryRange: e.target.value
              });
              this.forceUpdate();
            }}
          />
        </div>
        {this.state.isGalleryReady ? <Container className='mainGalleryContainer' fluid="md">
          <Row xs={1} md={3} className="g-3">
            {this.rangeFilterArray(this.state.galleryData).map((item) => {
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
