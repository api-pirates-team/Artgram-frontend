import React, { Component } from 'react';
import { withAuth0 } from "@auth0/auth0-react";
import { Col, Button, Card, Row, Form } from 'react-bootstrap';
import { BsX, BsReplyFill } from "react-icons/bs";
import { AiTwotoneEdit, AiTwotoneDelete } from "react-icons/ai";
import axios from 'axios';

class OneWork extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            model: false,
            allComment: [{}],
            theComment: "",
            commentReady: false
        });
    }
    handleCommentInput = (event) => {
        this.setState({
            theComment: event.target.value
        })
    }
    handleCreateComment = (event) => {
        event.preventDefault();
        let object = {
            msg: this.state.theComment,
        };
        let config = {
            method: "PUT",
            baseURL: `${process.env.REACT_APP_BACKEND_SERVER}/add-comment/${this.props.workId}`,
            data: object
        }
        setTimeout(() => {
            axios(config).then((res) => {
                this.setState({
                    allComment: res.data,
                    commentReady: true
                })
            })
        }, 2550)
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
                    <BsX size={45} className='closingIcon' onClick={() => this.setState({ model: false })} />
                    <Col sm={4}><img className='artistImage' src={this.props.workImage} alt='hi' /></Col>
                    <Col sm={7}>
                        <Row><h3>Title: {this.props.workTitle}</h3></Row>
                        <Row className="svgButtons">
                            <AiTwotoneDelete size={23} style={{color:"white"}} onClick={() => this.props.handleDeleteWork(this.props.workId)} variant="danger">
                                Delete
                            </AiTwotoneDelete>
                            <AiTwotoneEdit size={23} style={{color:"white"}}
                                onClick={() => this.props.handleUpdate(this.props.workId, user.name, user.picture, this.props.workTitle, this.props.artistContactInfo, this.props.artistLocation, this.props.workDate, this.props.workDimensions, this.props.workImage)}>
                            </AiTwotoneEdit>
                        </Row>
                        <Row>
                            <p>By: {this.props.artistName}, {this.props.artistLocation}<br />
                                Artist Contact Info: {this.props.artistContactInfo}<br />
                                Painting Dimensions: {this.props.workDimensions}</p>
                            <small>Uploaded On {this.props.workDate}</small>
                        </Row>
                        <Row className="commentsForm">
                            <Form onSubmit={this.handleCreateComment}>
                                <Form.Control placeholder="add comment" onChange={this.handleCommentInput} />
                                <Button type="submit"> <BsReplyFill size={35} /> </Button>
                            </Form>
                        </Row>
                        <Row className="commentsArea1">
                            {this.state.commentReady && this.state.allComment.map((elem, index) => {
                                console.log(index, elem)
                                return <>
                                    <p className="commentsArea">{elem.msg ? elem.msg : "no cooment"}</p>
                                </>
                            })}
                        </Row>

                    </Col>
                </div>
            </>
        )
    }
}

export default withAuth0(OneWork);
