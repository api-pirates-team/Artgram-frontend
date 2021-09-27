import React, { Component } from 'react'
import ArtistGallery from './ArtistGallery'
import ArtistWork from './ArtistWork'

class HomePage extends Component {

    
    render() {
        return (
            <>
                <ArtistWork />
                <ArtistGallery />
            </>
        )
    }
}

export default HomePage
