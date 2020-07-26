import React from 'react'
import { Link } from 'react-router-dom'

export default function ArtistLink(props: any) {
    console.log(props)
    return(
        <div>
            <Link to={`/artist/${props.artist}`}>{props.artist.title}</Link> 
        </div>
    )
}