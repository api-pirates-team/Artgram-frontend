import React, { Component } from 'react';
import { withAuth0 } from "@auth0/auth0-react";
import { Col, Button, Card, ListGroup, ListGroupItem, Form } from 'react-bootstrap';
import { BsX } from "react-icons/bs";
import { AiTwotoneEdit, AiTwotoneDelete } from "react-icons/ai";
import axios from 'axios';

class OneWork extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            model: false,
            allComment: [],
            theComment: ""
        });
    }
    handleCommentInput = (event) => {
        this.setState({
            theComment: event.target.value
        })
    }
    handleCreateComment = (event) => {
        event.preventDefault();
        let config = {
            method: "POST",
            baseUrl: `${process.env.REACT_APP_BACKEND_SERVER}/add-comment/${this.props.workId}`,
            data: { comment: this.state.theComment }
        }
        setTimeout(() => {
            axios(config).then((res) => {
                console.log(res.data)
                this.setState({
                    allComment: res.data
                })
                console.log(this.state.allComment)
            })
        }, 2550)
        // window.location.reload();
    }

    render() {
        const { user } = this.props.auth0;
        return (
            <>
                <Col>
                    <Card className='myCard' style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={this.props.workImage} style={{ "height": "400px", "object-fit": "cover", }} onClick={() => this.setState({ model: true })} />
                    </Card>
                </Col>
                <div className={this.state.model ? 'model open' : 'model'}>
                    <BsX className='closingIcon' onClick={() => this.setState({ model: false })} />
                    <div className='insideModel'>
                        <h3>{this.props.workTitle}</h3>
                        <AiTwotoneDelete className='insideDSVG' size={25} onClick={() => this.props.handleDeleteWork(this.props.workId)} variant="danger">
                            Delete
                        </AiTwotoneDelete>
                        <AiTwotoneEdit className='insideESVG' size={25}
                            onClick={() => this.props.handleUpdate(this.props.workId, user.name, user.picture, this.props.workTitle, this.props.artistContactInfo, this.props.artistLocation, this.props.workDate, this.props.workDimensions, this.props.workImage)}>
                        </AiTwotoneEdit>
                        <section className='sectionForEdit'>
                            <img className='artistImage' src={this.props.workImage} alt='hi' />
                            <div className='imageData'>
                                <p>By: {this.props.artistName}, {this.props.artistLocation}</p>
                                <p>Artist Contact Info: {this.props.artistContactInfo}</p>
                                <p>Painting Dimensions: {this.props.workDimensions}</p>
                                <small>Uploaded On {this.props.workDate}</small>
                            </div>
                        </section>
                        <section>
                            {this.state.allComment.length > 0 && this.state.allComment.map(elem => {
                                return <Card>
                                    <Card.Body>{elem.comment}</Card.Body>
                                </Card>
                            })}
                        </section>
                        {/* <section>
                            <Form onSubmit={this.handleCreateComment}>
                                <Form.Control placeholder="add comment" onChange={this.handleCommentInput} />
                                <Button type="submit" > Comment </Button>
                            </Form>

                        </section> */}

                    </div>
                </div>
            </>
        )
    }
}

export default withAuth0(OneWork);
