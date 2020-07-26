import React, { useState, useEffect } from 'react';
import List from './components/List'
import Header from './components/Header'
function AlbumsList(props: any) {

  const [albums, setAlbums] = useState([]);
  const [artists, setArtists] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(async () => {
    await fetch(
      `http://localhost:3004/artists/${props.match.params.id}`,
      {
        method: "GET"
      }
    )
      .then(res => res.json())
      .then(response => {
        setArtists(response);
        setIsLoading(false);
      })
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    fetch(
      `http://localhost:3004/albums?artistId=${props.match.params.id}`,
      {
        method: "GET"
      }
    )
      .then(res => res.json())
      .then(response => {
        setAlbums(response);
        console.log('ALBUMSSS')
        console.log(albums)
        setIsLoading(false);
      })
      .catch(error => console.log(error));
  }, [])

  function favoriteChange(value: any) {
    fetch(
    `http://localhost:3004/albums/${value.variables.id}`,
    {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(value.variables),
    }
  )
    .then(res => res.json())
    .then(response => {
      window.location.reload(false);
      console.log(response)
    })
    .catch(error => console.log(error));
  }

  if (isLoading) return(<div className="loader"></div>)

  //if (error) return(<p>Error</p>)

  return (
    <div className="App">

      <Header headerTitle={"Artist"} page="artist" />

      <div className="body">
      {
      albums.length > 0 ?
      
      <>
        <div>
          <List favoriteChange={favoriteChange} page="artist" albums={albums} artists={artists} />
        </div>
      </>
      
      : <p className="noData">No data</p>
      }
      </div>
    </div>
  );
}

export default AlbumsList;
