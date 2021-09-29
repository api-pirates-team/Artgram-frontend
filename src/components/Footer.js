import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import {
  FaFacebook,
  FaInstagramSquare,
  FaGithub,
  FaEnvelope,
  FaWhatsapp,
} from "react-icons/fa";
import "../CSS/Footer.css";

class Footer extends Component {
  render() {
    return (
      <footer>
        <Row>
          <Col className="col">
            <h3>Contact Us</h3>
            <div id="colOneDiv">
              <Row>
                <Col>
                  <FaFacebook className="icons" />
                </Col>
                <Col>
                  <FaInstagramSquare className="icons" />
                </Col>
              </Row>
              <Row>
                <Col>
                <a href='https://mail.google.com/'><FaEnvelope className="icons" /></a>
                </Col>
              </Row>
              <Row>
                <Col>
                  <a href='https://github.com/api-pirates-team'><FaGithub className="icons"/></a>
                </Col>
                <Col>
                  <FaWhatsapp className="icons" />
                </Col>
              </Row>
            </div>
          </Col>
          <Col className="col">
            <h3>About Us</h3>
            <p>Led by junior Full Stack Developers, we are an art social media
            platform where you get to deal directly with artists and art lovers</p>
          </Col>
          <Col className="col">
            <h3>Resources</h3>
            <p className="resourcesP"> ▸ Harvard Art Museums API <br/> ▸ Art Institute of Chicago API <br/> ▸ Rijksstudio API</p>
          </Col>
        </Row>
        <div id="copyRightDiv">
          <p id="copyRight">All Right Reserved 2021 &copy; API Pirates</p>
        </div>
      </footer>
    );
  }
}

export default Footer;
