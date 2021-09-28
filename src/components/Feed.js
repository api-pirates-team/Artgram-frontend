import React, { Component } from "react";
import axios from "axios";
import { withAuth0 } from '@auth0/auth0-react';
import { Card, Container, Row, Col, Image, Modal } from 'react-bootstrap';
import '../CSS/Feed.css';
import { ThemeConsumer } from 'react-bootstrap/esm/ThemeProvider';
import { BsX } from "react-icons/bs";
import { FcDislike, FcShare } from "react-icons/fc";
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton, PinterestShareButton } from "react-share";
import { FacebookIcon, TwitterIcon, WhatsappIcon, PinterestIcon } from "react-share";


class Feed extends Component {
  constructor(props) {
    super(props)
    this.state = {
      likedArtsData: [],
      currentUser: {
        username: '',
        email: '',
        pp: '',
        isArtists: false,
      },
      currentUserDB: {},
      model: false,
      tempImgSrc: '',
      fullElement: {},
      show: false,
    }
  }

  componentDidMount = () => {
    setTimeout(async () => {
      await this.props.auth0.isAuthenticated && this.setState({
        currentUser: {
          username: this.props.auth0.user.name,
          email: this.props.auth0.user.email,
          pp: this.props.auth0.user.picture,
        },
      });
      axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/getuser?email=${this.state.currentUser.email}`).then(response => {

        this.setState({
          currentUserDB: response.data,
          likedArtsData: response.data.likedArts
        });

        console.log('hi');
      })
    }, 3000);

  };

  getImg = (element) => {
    this.setState({
      model: true,
      tempImgSrc: element.imageUrl,
      fullElement: element
    })
  }

  unlikeImage = (imageID) => {
    axios.delete(`${process.env.REACT_APP_BACKEND_SERVER}/unlike/${this.state.currentUserDB._id}?imageID=${imageID}`)
      .then(res => {
        this.setState({
          likedArtsData: res.data.likedArts
        })
      });
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  randomNum = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
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
            <Col xs={4}><Image src={this.state.currentUser.pp} roundedCircle /></Col>
            <Col xs={12}>
              <h3>{this.state.currentUser.username}</h3>
              <br />
              <p>{this.state.likedArtsData.length} likes &nbsp;&nbsp;&nbsp;
                {this.randomNum(0, 500)} followers &nbsp;&nbsp;&nbsp;
                {this.randomNum(0, 1000)} following</p>
            </Col>
          </Row>
        </Container>
        <div className={this.state.model ? 'model open' : 'model'}>
          <BsX className='closingIcon' onClick={() => this.setState({ model: false })} />
          <Row>
            <Col><img src={this.state.tempImgSrc} alt='' /></Col>
            <Col className='imageData'>
              <h3>{this.state.fullElement.title}</h3>
              <p>Artist: {this.state.fullElement.artistName}</p>
              <p>Date year: {this.state.fullElement.displaydate}</p>
              <p>Dimensions: {this.state.fullElement.dimensions}</p>
              <FcDislike size='23px' onClick={() => this.unlikeImage(this.state.fullElement._id)} />
            </Col>
          </Row>
        </div>
        <div className='gallery'>
          {
            this.state.likedArtsData.map(elem => {
              return (
                <div className='picsDiv'>
                  <div className='pics' onClick={() => this.getImg(elem)}>
                    <img src={elem.imageUrl} style={{ width: '100%' }} alt='hi' />
                  </div>
                  <div className='svgButtons'>
                    <FcDislike size='23px' onClick={() => this.unlikeImage(elem._id)} />
                    &nbsp;&nbsp;
                    <FcShare size='23px' onClick={this.handleShow} />

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
