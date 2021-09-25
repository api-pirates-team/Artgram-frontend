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
                  <FaEnvelope className="icons" />
                </Col>
              </Row>
              <Row>
                <Col>
                  <FaGithub className="icons" />
                </Col>
                <Col>
                  <FaWhatsapp className="icons" />
                </Col>
              </Row>
            </div>
          </Col>
          <Col className="col">
            <h3>About Us</h3>
          </Col>
          <Col className="col">
            <h3>Resources</h3>
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
