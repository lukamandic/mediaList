import React from 'react';
import { Link, Route } from 'react-router-dom'
import { useLazyQuery } from "@apollo/react-hooks"
import gql from "graphql-tag";
import ArtistLink from './ArtistLink'

function List(props: any) {

    function dateFormat(date: string): number {
        const formatedDate = new Date(date)

        return formatedDate.getFullYear()
    }

    function favoriteEdit(event: any) {
        props.favoriteChange(event);
    }

    function foundArtist(id: number): any {
        return artists.find((artist: any) => artist.id == id)
    }

    /*function favoriteEdit(variables: any) {
        console.log(variables.variables)
        fetch(
            `http://localhost:3004/albums/${variables.variables.id}`,
            {
              method: "PUT",
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(variables.variables),
            }
          )
            .then(res => res.json())
            .then(response => {
              //setAlbums(response);
              //setIsLoading(false);
              console.log(response)
            })
            .catch(error => console.log(error));
    }*/

    //console.log(props)
    const albums = props.albums ? props.albums : null
    const artists = props.artists ? props.artists : null

    //if (data) console.log(data)

    return (
        <div>
            {
                albums.length > 0 ?
                albums.map((e: any) => {
                    return (
                    <div className="list" key={e.id}>
                        <img alt="album cover" className="albumImg" src={e.imageUrl} />

                        <div className="artistAlbum">
                            <p className="album">{e.title}</p><br />

                            {   
                                props.page == "artist" ? <ArtistLink artist={props.artists} /> : <Link to={`/artist/${e.artistId}`}>{foundArtist(e.artistId).title}</Link> 
                            }

                            
                        </div>

                        <div className="released">
                            <p className="releasedText">Released: </p>
                            <p>{dateFormat(e.releaseDate)}</p>
                        </div>
                        <p className="price">{e.price}</p>

                        {
                        
                            e.favorite ? <button onClick={() => favoriteEdit({variables: {id: e.id, imageUrl: e.imageUrl, title: e.title, releaseDate: e.releaseDate, artistId: e.artistId, price: e.price, favorite: false}})} className="removeFavorite">Remove favorite</button> 
                                : 
                            <button onClick={() => favoriteEdit({variables: {id: e.id, imageUrl: e.imageUrl, title: e.title, releaseDate: e.releaseDate, artistId: e.artistId,  price: e.price, favorite: true}})} className="addFavorite">Mark as Favorite</button>
                        
                        }

                     </div>
                    )
                }) : <p className="noData">We do not have any data for you :(</p>
                
            }
        </div>
    )
}

export default List