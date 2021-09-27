import React, { Component } from 'react';
import { withAuth0 } from "@auth0/auth0-react";
import { Col, Button, Card, ListGroup, ListGroupItem, } from 'react-bootstrap';

class OneWork extends Component {
    render() {
        const { user } = this.props.auth0;
        return (
            <>
                <Col>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={this.props.workImage} />
                        <Card.Body>
                            <Card.Title>{this.props.workTitle}</Card.Title>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem>{this.props.artistName}</ListGroupItem>
                            <ListGroupItem>
                                <Button
                                    onClick={() => this.props.handleDeleteWork(this.props.workId)} variant="danger"
                                >
                                    Delete
                                </Button>
                                <Button
                                    onClick={() => this.props.handleUpdate(this.props.workId, user.name, user.picture, this.props.workTitle, this.props.artistContactInfo, this.props.artistLocation, this.props.workDate, this.props.workDimensions, this.props.workImage)} variant="info"
                                >
                                    Update
                                </Button>
                            </ListGroupItem>
                        </ListGroup>
                    </Card>
                </Col>
            </>
        )
    }
}

export default withAuth0(OneWork);
