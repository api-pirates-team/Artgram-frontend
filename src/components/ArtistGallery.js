import React, { Component } from 'react';
import axios from "axios";
import { Row, Col, Container } from "react-bootstrap";
import OneGalleryHome from './OneGalleryHome';
import { withAuth0 } from '@auth0/auth0-react';


class ArtistGallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            galleryHome: [],
        };
    };

    componentDidMount = () => {
        axios
            .get(`${process.env.REACT_APP_BACKEND_SERVER}/art/allart`)
            .then((res) => {
                this.setState({
                    galleryHome: res.data,
                });
            });
    };
    render() {
        return (
            <>
                <Container fluid="md" style={{ margin: "100px auto" }}>
                    <Row xs={1} md={4} className="g-3">
                        {this.state.galleryHome.slice(-20).map((item) => {
                            return (
                                <Col>
                                    <OneGalleryHome
                                        imageUrl={item.imageUrl}
                                        title={item.title}
                                        displaydate={item.displaydate}
                                        artistName={item.artistName}
                                        dimensions={item.dimensions}
                                        id={item._id}
                                        updateUserData={this.props.updateUserData}
                                        items={item}
                                    />
                                </Col>
                            );
                        })}
                    </Row>
                </Container>
            </>
        )
    }
}

export default withAuth0(ArtistGallery);
