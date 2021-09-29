import React, { Component } from "react";
import axios from "axios";
import { withAuth0 } from '@auth0/auth0-react';
import { Card, Container, Row, Col, Image, Modal } from 'react-bootstrap';
import '../CSS/Feed.css';
import { ThemeConsumer } from 'react-bootstrap/esm/ThemeProvider';
import { BsX, BsBoxArrowInUp, BsFullscreenExit, BsArrowsFullscreen } from "react-icons/bs";
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton, PinterestShareButton } from "react-share";
import { FacebookIcon, TwitterIcon, WhatsappIcon, PinterestIcon } from "react-share";

class Feed extends Component {
  constructor(props) {
    super(props)
    this.state = {
      likedArtsData: [...this.props.currentUserDB.likedArts],
      model: false,
      tempImgSrc: '',
      fullElement: {},
      show: false,
      isFeedReady: false,
    }
  }

  getImg = (element) => {
    this.setState({
      model: true,
      tempImgSrc: element.imageUrl,
      fullElement: element
    })
  }

  unlikeImage = (imageID) => {
    axios.delete(`${process.env.REACT_APP_BACKEND_SERVER}/unlike/${this.props.currentUserDB}?imageID=${imageID}`)
      .then(res => {
        this.setState({
          likedArtsData: res.data.likedArts
        })
      });
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  handleClose = () => {
    this.setState({
      show: false,
    })
  }

  handleShow = () => {
    this.setState({
      show: true,
    })
  }

  render() {
    return (
      <div className={'main-feed-component'}>
        <Container fluid="md">
          <Row md={3} className="g-3">
            <Col xs={4}><Image src={this.props.currentUserDB.pp} roundedCircle style={{'box-shadow': '2px 2px 0px 1px #ffffff'}}/></Col>
            <Col xs={12}>
              <h3>{this.props.currentUserDB.username}</h3>
              <p className='profileData'>Jordan, {this.state.likedArtsData.length} likes</p>
              <p className='profileData'></p>
            </Col>
          </Row>
        </Container>
        <div className={this.state.model ? 'model open' : 'model'}>
          <BsFullscreenExit className='closingIcon' onClick={() => this.setState({ model: false })} />
          <Row>
            <Col><img src={this.state.tempImgSrc} alt='' /></Col>
            <Col className='imageData'>
              <h3>{this.state.fullElement.title}</h3>
              <p>Artist: {this.state.fullElement.artistName}</p>
              <p>Date year: {this.state.fullElement.displaydate}</p>
              <p>Dimensions: {this.state.fullElement.dimensions}</p>
            </Col>
          </Row>
        </div>
        <div className='gallery'>
          {
            this.state.likedArtsData.map(elem => {
              return (
                <div className='picsDiv'>
                  <div className='pics'>
                    <img src={elem.imageUrl} onClick={() => this.getImg(elem)} style={{ width: '100%', 'border-radius': '3px' }} alt='hi' />
                  </div>
                  <BsX className='outsideDelete' size='23px' onClick={() => this.unlikeImage(elem._id)} />
                  <div className='svgButtons'>
                    <BsBoxArrowInUp className='shareImage' size='23px' onClick={this.handleShow} />

                    <Modal centered show={this.state.show} onHide={this.handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title style={{ margin: 'auto' }}>Share Image to Social Media!</Modal.Title>
                      </Modal.Header>
                      <Modal.Body style={{ margin: 'auto' }}>
                        <br />
                        <FacebookShareButton url={elem.imageUrl} >
                          <FacebookIcon size={30} round={true}></FacebookIcon>
                        </FacebookShareButton> &nbsp;&nbsp;
                        <TwitterShareButton url={elem.imageUrl} >
                          <TwitterIcon size={30} round={true}></TwitterIcon>
                        </TwitterShareButton> &nbsp;&nbsp;
                        <WhatsappShareButton url={elem.imageUrl} >
                          <WhatsappIcon size={30} round={true}></WhatsappIcon>
                        </WhatsappShareButton> &nbsp;&nbsp;
                        <PinterestShareButton url={elem.imageUrl} media={elem.imageUrl}>
                          <PinterestIcon size={30} round={true}></PinterestIcon>
                        </PinterestShareButton> &nbsp;&nbsp;<br /><br />
                      </Modal.Body>
                    </Modal>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}
export default withAuth0(Feed)
