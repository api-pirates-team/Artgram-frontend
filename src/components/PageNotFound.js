import React, { Component } from 'react';
import {MdError } from "react-icons/md";
import {FaRobot } from "react-icons/fa";
import "../CSS/PageNotFound.css";

class PageNotFound extends Component {
    render() {
        return (
            <div className="pageNotFound">
                <FaRobot  style={{color:"white", fontSize:"250px", marginBottom:"20px"}}/>
                <h1>Page Not Found 404 <MdError style={{color:"white", fontSize:"60px"}}/></h1>
            </div>
        )
    }
}

export default PageNotFound
