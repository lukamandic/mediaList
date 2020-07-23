import React from 'react';
import { Link, Route } from 'react-router-dom'
import { useLazyQuery } from "@apollo/react-hooks"
import gql from "graphql-tag";

const FAVORITE = gql`
query Favorite($id: Int!, $favorite: Boolean!) {
    favorite(id: $id, favorite: $favorite) {
        id
        album
        artist {
          id
          name
        }
        price
        date
        image
        favorite
      }
    }
`

function List(props: any) {

    const [
        favoriteEdit, 
        { data, loading }
      ] = useLazyQuery(FAVORITE);

    console.log(props)
    const entry = props.entry ? props.entry : null

    if (data) console.log(data)

    return (
        <div>
            {
                entry.map((e: any) => {
                    return (
                    <div className="list" key={e.id}>
                        <img className="albumImg" src={e.image} />

                        <div className="artistAlbum">
                            <p className="album">{e.album}</p><br />
                            <Link to={`/artist/${e.artist.id}`} >{e.artist.name}</Link> 
                        </div>

                        <div className="released">
                            <p className="releasedText">Released: </p>
                            <p>{e.date}</p>
                        </div>
                        <p className="price">{e.price}</p>

                        {
                        
                            e.favorite ? <button onClick={() => favoriteEdit({variables: {id: e.id, favorite: false}})} className="removeFavorite">Remove favorite</button> 
                                : 
                            <button onClick={() => favoriteEdit({variables: {id: e.id, favorite: true}})} className="addFavorite">Mark as Favorite</button>
                        
                        }

                     </div>
                    )
                })
                
            }
        </div>
    )
}

export default List