import React from "react";
import {Link} from 'react-router-dom'

function Header(){
    return(
        <div className="headerDiv">
            <h1 className="headerTitle">
                <Link to='/BandSearch' className='headerLink'>
                    Search for your favorite band
                </Link> 
            </h1>
            <h1 className="headerTitle">
                <Link to='/FavBands' className="headerLink">
                    Your favorite bands
                </Link>
            </h1>
            <h1 className="headerTitle">
                <Link to='/TopTracks' className="headerLink">
                    Top Tracks
                </Link>
            </h1>
        </div>
    )
}

export default Header 