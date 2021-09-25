import React, { Component } from "react";
import "../CSS/Header.css";
import { Navbar, Container, Nav, Dropdown } from "react-bootstrap";
import { BsList } from "react-icons/bs";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrolling: false,
    };
  }

  changeBackroung = () => {
    window.scrollY > 0
      ? this.setState({
          scrolling: true,
        })
      : this.setState({
          scrolling: false,
        });
  };

  componentDidMount = () => {
    window.addEventListener("scroll", this.changeBackroung);
  };

  render() {
    return (
      <Navbar className={this.state.scrolling ? "nav_active" : "nav"}>
        <Container className="container">
          <Navbar.Brand
            className={this.state.scrolling ? "brandName_active" : "brandName"}
            href="#home"
          >
            ArtGram
          </Navbar.Brand>
          <Nav>
            <Nav.Item>
              <Nav.Link
                href="/"
                className={
                  this.state.scrolling ? "navItems_active" : "navItems"
                }
              >
                Home
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                className={
                  this.state.scrolling ? "navItems_active" : "navItems"
                }
              >
                LogIn
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Dropdown>
                <Dropdown.Toggle
                  variant="none"
                  className={
                    this.state.scrolling ? "navItems_active" : "navItems"
                  }
                >
                  <BsList />
                </Dropdown.Toggle>

                <Dropdown.Menu className="dropMenu" right>
                  <Dropdown.Item href="/gallery" className="dropMenuItem">
                    Gallery
                  </Dropdown.Item>
                  <Dropdown.Item href="/feed" className="dropMenuItem">
                    Feed
                  </Dropdown.Item>
                  <Dropdown.Item href="/about_us" className="dropMenuItem">
                    About Us
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav.Item>
          </Nav>
        </Container>
      </Navbar>
    );
  }
}

export default Header;
