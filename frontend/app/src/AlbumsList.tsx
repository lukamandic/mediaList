import React, { useState, useEffect } from 'react';
import List from './components/List'
import Header from './components/Header'
import Artist from './Artist'
import { useQuery } from '@apollo/react-hooks';
import gql from "graphql-tag";
import queryString from 'query-string'
import { Route } from 'react-router-dom'
import axios from 'axios'

function AlbumsList() {

  // eslint-disable-next-line no-restricted-globals
  let limit = queryString.parse(location.search)

  const [albums, setAlbums] = useState([]);
  const [artists, setArtists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [value, setValue] = useState('');

    function handleChange(newValue: any) {
      setIsLoading(true)
      newValue.preventDefault()
      setValue(newValue.target.value);
      let query
      value != '' ? query = `http://localhost:3004/albums?q=${value}` : query ='http://localhost:3004/albums'
      fetch(
        query,
        {
          method: "GET"
        }
      )
        .then(res => res.json())
        .then(response => {
          setAlbums(response);
          setTimeout(() => setIsLoading(false), 150)
        })
        .catch(error => console.log(error));
    }

  const limiter = limit.limit ? Number(limit.limit) : 0
  console.log(`http://localhost:3004/albums?limit=${limiter}`)

  useEffect(() => {
    fetch(
      `http://localhost:3004/artists`,
      {
        method: "GET"
      }
    )
      .then(res => res.json())
      .then(response => {
        setArtists(response);
      })
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    let query
    limiter > 0 ? query = `http://localhost:3004/albums?limit=${limiter}` : query ='http://localhost:3004/albums'
    fetch(
      query,
      {
        method: "GET"
      }
    )
      .then(res => res.json())
      .then(response => {
        setAlbums(response);
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

      <Header value={value} onChange={handleChange} page="albums" headerTitle={"Album List"} />

      <div className="body">
          {
          
          albums ? 
          

          <>

          <List favoriteChange={favoriteChange} page="albums" albums={limit.limit ? albums.slice(0, Number(limit.limit)) : albums} artists={artists} />
          
          </>
          
            
          : <p className="noData">No data</p>
          }
      </div>
      <Route path="/artist/:id" component={Artist} />
    </div>
  );
}

export default AlbumsList;
