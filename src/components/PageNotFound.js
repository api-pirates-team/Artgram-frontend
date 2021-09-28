import React, { Component } from 'react';
import {MdError } from "react-icons/md";
import "../CSS/PageNotFound.css";

class PageNotFound extends Component {
    render() {
        return (
            <div className="pageNotFound">
                <MdError style={{color:"white", fontSize:"100px"}}/>
                <h1>Page Not Found 404</h1>
            </div>
        )
    }
}

export default PageNotFound
