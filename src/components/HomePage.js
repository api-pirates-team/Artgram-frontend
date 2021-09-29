import React, { Component } from 'react';
import ArtistGallery from './ArtistGallery';
import ArtistWork from './ArtistWork';
import { withAuth0 } from '@auth0/auth0-react';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            test: "",
        };
    };
    render() {
        return (
            <>
                <ArtistGallery updateUserData={this.props.updateUserData} />
                <ArtistWork currentUserDB={this.props.currentUserDB}/>
            </>
        )
    }
}

export default withAuth0(HomePage);
