import React, { Component } from 'react';
import axios from "axios";
import { Col, Container, Row, Button, Modal, Form, Spinner } from 'react-bootstrap';
import { withAuth0 } from "@auth0/auth0-react";
import OneWork from './OneWork';
import "../CSS/ArtistGallery.css";
import { BsToggleOn, BsToggleOff } from "react-icons/bs";

class ArtistWork extends Component {
    constructor(props) {
        super(props);
        this.state = {
            artWork: [{}],
            workId: "",
            artistName: "",
            artistpp: "",
            workTitle: "",
            artistContactInfo: "",
            artistLocation: "",
            workDate: "",
            workDimensions: "",
            workImage: "",
            isCreateOpen: false,
            isUpdateOpen: false,
            addingSpinner: false
        }
    }

    openCreateModal = () => this.setState({ isCreateOpen: true });
    closeCreateModal = () => this.setState({ isCreateOpen: false });
    openUpdateModal = () => this.setState({ isUpdateOpen: true });
    closeUpdateModal = () => this.setState({ isUpdateOpen: false });

    componentDidMount = () => {
        axios.get(`https://artgram-backend.herokuapp.com/get-work`).then(res => {
            this.setState({
                artWork: res.data,
            });
        })
    }
    handleworkArtistName = (event) => {
        this.setState({
            artistName: event.target.value
        })
    }
    handleArtistpp = (event) => {
        this.setState({
            artistpp: event.target.value
        })
    }
    handleworkTitle = (event) => {
        this.setState({
            workTitle: event.target.value
        })
    }
    handleartistContactInfo = (event) => {
        this.setState({
            artistContactInfo: event.target.value
        })
    }
    handleartistLocation = (event) => {
        this.setState({
            artistLocation: event.target.value
        })
    }
    handleworkDate = (event) => {
        this.setState({
            workDate: event.target.value
        })
    }
    handleworkDimensions = (event) => {
        this.setState({
            workDimensions: event.target.value
        })
    }
    handleworkImage = (event) => {
        this.setState({
            workImage: event.target.value
        })
    }
    handleCreateWork = (event) => {
        event.preventDefault();
        this.setState({
            addingSpinner: true,
        })
        let config = {
            method: "POST",
            baseURL: `https://artgram-backend.herokuapp.com/add-work`,
            data: {
                "artistName": this.props.auth0.user.name,
                "artistpp": this.props.auth0.picture,
                "workTitle": this.state.workTitle,
                "artistContactInfo": this.state.artistContactInfo,
                "artistLocation": this.state.artistLocation,
                "workDate": this.state.workDate,
                "workDimensions": this.state.workDimensions,
                "workImage": this.state.workImage
            }
        };
        axios(config).then(response => {
            this.setState({
                artWork: [...this.state.artWork, response.data]
            });
        });
        setTimeout(() => {
            this.forceUpdate();
            this.setState({
                addingSpinner: false,
                isCreateOpen: false
            })
        }, 1000)
    }
    handleDeleteWork = (id) => {
        let config = {
            method: "DELETE",
            baseURL: `https://artgram-backend.herokuapp.com/delete-work/${id}`
        };
        axios(config).then(response => {
            this.setState({
                artWork: response.data
            });
        });
    }
    handleUpdate = (workId, artistName, artistpp, workTitle, artistContactInfo, artistLocation, workDate, workDimensions, workImage) => {
        this.setState({
            workId: workId,
            artistName: artistName,
            artistpp: artistpp,
            workTitle: workTitle,
            artistContactInfo: artistContactInfo,
            artistLocation: artistLocation,
            workDate: workDate,
            workDimensions: workDimensions,
            workImage: workImage,
            isUpdateOpen: true
        })
    }
    handleUpdateSubmit = (workId) => {
        let config = {
            method: "PUT",
            baseURL: `https://artgram-backend.herokuapp.com/update-work/${workId}`,
            data: {
                artistName: this.props.auth0.user.name,
                artistpp: this.props.auth0.picture,
                workTitle: this.state.workTitle,
                artistContactInfo: this.state.artistContactInfo,
                artistLocation: this.state.artistLocation,
                workDate: this.state.workDate,
                workDimensions: this.state.workDimensions,
                workImage: this.state.workImage
            }
        };
        axios(config).then(response => {
            this.setState({
                artWork: response.data,
                isUpdateOpen: false
            });
        });
        setTimeout(() => {
            this.forceUpdate();
        }, 1000);
    }
    render() {
        const { user, isAuthenticated } = this.props.auth0;
        return (
            <>
                {isAuthenticated && <>
                    <Modal
                        show={this.state.isCreateOpen}
                        onHide={this.closeCreateModal}
                        backdrop="static"
                        keyboard={false}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                    >
                        <Form onSubmit={this.handleCreateWork}>
                            <Modal.Header closeButton>
                                <Modal.Title>Add Your Work</Modal.Title>
                            </Modal.Header>
                            {this.state.addingSpinner ? <div class="d-flex justify-content-center" style={{marginTop: "40px", marginBottom: "40px"}}>
                                <div class="spinner-border" role="status"></div>
                            </div> : <Modal.Body>
                                <Row xs={1} md={3} className="g-3">
                                    <Col>
                                        <Form.Control value={user.name} onChange={this.handleworkArtistName} />
                                    </Col>
                                    <Col>
                                        <Form.Control placeholder="Your Work Title" onChange={this.handleworkTitle} />
                                    </Col>
                                    <Col>
                                        <Form.Control placeholder="Your Contact Info" onChange={this.handleartistContactInfo} />
                                    </Col>
                                    <Col>
                                        <Form.Control placeholder="Your Work Location" onChange={this.handleartistLocation} />
                                    </Col>
                                    <Col>
                                        <Form.Control placeholder="The Work Date" onChange={this.handleworkDate} />
                                    </Col>
                                    <Col>
                                        <Form.Control placeholder="The Work Dimensions" onChange={this.handleworkDimensions} />
                                    </Col>
                                    <Col>
                                        <Form.Control value={user.picture} onChange={this.handleArtistpp} hidden />
                                    </Col>
                                </Row>
                                <br />
                                <Row>
                                    <Col>
                                        <Form.Group controlId="formFile" className="mb-3">
                                            <Form.Label>Upload Your Art Image</Form.Label>
                                            <Form.Control onChange={this.handleworkImage} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Modal.Body>}
                            <Modal.Footer>
                                <Button variant="secondary" onClick={this.closeCreateModal}>
                                    Close
                                </Button>
                                <Button type="submit" style={{ backgroundColor: '#00fff291' }}>Post</Button>
                            </Modal.Footer>
                        </Form>
                    </Modal>
                    <Modal
                        show={this.state.isUpdateOpen}
                        onHide={this.closeUpdateModal}
                        backdrop="static"
                        keyboard={false}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Update Your Work</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form >
                                <Row xs={1} md={3} className="g-3">
                                    <Col>
                                        <Form.Control value={user.name} onChange={this.handleworkArtistName} />
                                    </Col>
                                    <Col>
                                        <Form.Control value={this.state.workTitle} onChange={this.handleworkTitle} />
                                    </Col>
                                    <Col>
                                        <Form.Control value={this.state.artistContactInfo} onChange={this.handleartistContactInfo} />
                                    </Col>
                                    <Col>
                                        <Form.Control value={this.state.artistLocation} onChange={this.handleartistLocation} />
                                    </Col>
                                    <Col>
                                        <Form.Control value={this.state.workDate} onChange={this.handleworkDate} />
                                    </Col>
                                    <Col>
                                        <Form.Control value={this.state.workDimensions} onChange={this.handleworkDimensions} />
                                    </Col>
                                    <Col>
                                        <Form.Control value={user.picture} onChange={this.handleArtistpp} hidden />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group controlId="formFile" className="mb-3">
                                            <Form.Label>Upload Your Art Image</Form.Label>
                                            <Form.Control value={this.state.workImage} onChange={this.handleworkImage} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.closeUpdateModal}>
                                Close
                            </Button>
                            <Button onClick={() => this.handleUpdateSubmit(this.state.workId)} variant="primary">Update</Button>
                        </Modal.Footer>
                    </Modal>
                    <br />
                    <Container className='artistsGallery'>
                        <Row className='worksContainer'>
                            <Col xs={1}>{this.state.isArtist ? <BsToggleOn onClick={() => { this.setState({ isArtist: false }) }} size={35} style={{ color: 'white' }} /> : <BsToggleOff onClick={() => { this.setState({ isArtist: true }) }} size={35} style={{ color: 'white' }}>artists view off</BsToggleOff>}</Col>
                            <Col xs={10}><h3 className='worksContainerHeader'>Your Works</h3></Col>
                            <Col xs={1}>{this.state.isArtist && <Button onClick={this.openCreateModal} variant="none" className="add"><span>Add</span>
                            </Button>}</Col>
                        </Row>
                        <Row xs={1} md={3} className="g-3">
                            {this.state.artWork.map((elem, index) => {
                                return <OneWork
                                    key={index}
                                    artistName={elem.artistName}
                                    artistpp={elem.artistpp}
                                    workTitle={elem.workTitle}
                                    artistContactInfo={elem.artistContactInfo}
                                    artistLocation={elem.artistLocation}
                                    workDate={elem.workDate}
                                    workDimensions={elem.workDimensions}
                                    workImage={elem.workImage}
                                    workId={elem._id}
                                    openUpdateModal={this.openUpdateModal}
                                    handleDeleteWork={this.handleDeleteWork}
                                    handleUpdate={this.handleUpdate}
                                    handleworkArtistName={this.handleworkArtistName}
                                    handleArtistpp={this.handleArtistpp}
                                    handleworkTitle={this.handleworkTitle}
                                    handleartistContactInfo={this.handleartistContactInfo}
                                    handleartistLocation={this.handleartistLocation}
                                    handleworkDate={this.handleworkDate}
                                    handleworkDimensions={this.handleworkDimensions}
                                    handleworkImage={this.handleworkImage}
                                />
                            })}
                        </Row>
                    </Container>
                </>
                }
            </>
        )
    }
}

export default withAuth0(ArtistWork);
