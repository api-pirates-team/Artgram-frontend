import React, { Component } from "react";
import { Col, Row, Card } from "react-bootstrap";
import "../CSS/AboutUs.css";
import wesam from "../img/wesam.jpg";
import hasnaa from "../img/hasnaa.jfif";
import hassan from "../img/hassan.jpg";
import mahmoud from "../img/mahmoud.png";
import samaki from "../img/samaki.png";
import { FaGithub } from "react-icons/fa";

class AboutUs extends Component {
  render() {
    return (
      <>
        <div id="firstDiv">
          <h1>Who We Are !</h1>
          <p> Art Lovers and Passionate Developers </p>
        </div>
        <div id="containerDiv">
          <div id="secondDiv">
            Led by junior Full Stack Developers, we are an art social media
            platform where you get to deal directly with artists and art lovers
          </div>
          <h2>Our Team</h2>
          <Row xs={1} md={6} className="g-3" id="aboutUSRow" target="_blank"> 
            {/* ************************* Hasnaa *************************************** */}
            <Col style={{ width: "20%" }}>
              <Card className="aboutUsCard">
                <Card.Img className="cardImg" variant="top" src={hasnaa} />
                <Card.Body>
                  <Card.Title className="title">
                    Hasnaa Al-Habahbeh <br /> <p>Full Stack Web Developer</p>
                  </Card.Title>
                  <Card.Text className="aboutUsCardText">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <a href="https://github.com/hasnaa38" target="_blank">
                    <FaGithub className="gitHub" />{" "}
                  </a>
                </Card.Body>
              </Card>
            </Col>
            {/* ************************* Hassan *************************************** */}
            <Col style={{ width: "20%" }}>
              <Card className="aboutUsCard">
                <Card.Img className="cardImg" variant="top" src={hassan} />
                <Card.Body>
                  <Card.Title className="title">
                    Hassan Hamdan <br /> <p>Full Stack Web Developer</p>{" "}
                  </Card.Title>
                  <Card.Text className="aboutUsCardText">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <a href="https://github.com/HassanHamdanDev" target="_blank">
                    <FaGithub className="gitHub" />{" "}
                  </a>
                </Card.Body>
              </Card>
            </Col>
            {/* ************************* Mahmoud *************************************** */}
            <Col style={{ width: "20%" }}>
              <Card className="aboutUsCard">
                <Card.Img className="cardImg" variant="top" src={mahmoud} />
                <Card.Body>
                  <Card.Title className="title">
                    Mahmoud Hamdan <br /> <p>Full Stack Web Developer</p>
                  </Card.Title>
                  <Card.Text className="aboutUsCardText">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <a href="https://github.com/Mahmoud-M-Hamdan" target="_blank">
                    <FaGithub className="gitHub" />{" "}
                  </a>
                </Card.Body>
              </Card>
            </Col>
            {/* ************************* Wesam *************************************** */}
            <Col style={{ width: "20%" }}>
              <Card className="aboutUsCard">
                <Card.Img className="cardImg" variant="top" src={wesam} />
                <Card.Body>
                  <Card.Title className="title">
                    Wesam Alqawasmeh <br /> <p>Full Stack Web Developer</p>
                  </Card.Title>
                  <Card.Text className="aboutUsCardText">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <a href="https://github.com/Wesam-Alqawasmeh" target="_blank">
                    <FaGithub className="gitHub" />{" "}
                  </a>
                </Card.Body>
              </Card>
            </Col>
            {/* ************************* Mohammed Samaki *************************************** */}
            <Col style={{ width: "20%" }}>
              <Card className="aboutUsCard">
                <Card.Img className="cardImg" variant="top" src={samaki} />
                <Card.Body>
                  <Card.Title className="title">
                    Mohammed Alsamaki <br /> <p>Full Stack Web Developer</p>
                  </Card.Title>
                  <Card.Text className="aboutUsCardText">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <a href="https://github.com/mohammedalsamki" target="_blank">
                    <FaGithub className="gitHub" />{" "}
                  </a>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default AboutUs;
