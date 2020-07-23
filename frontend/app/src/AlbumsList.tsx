import React, { useState, useEffect } from 'react';
import List from './components/List'
import Header from './components/Header'
import Artist from './Artist'
import { useQuery } from '@apollo/react-hooks';
import gql from "graphql-tag";
import queryString from 'query-string'
import { Route } from 'react-router-dom'

const GET_ALBUMS = gql`
  query albums($limit: Int!) {
      albums(limit: $limit) {
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

function AlbumsList() {

  // eslint-disable-next-line no-restricted-globals
  let limit = queryString.parse(location.search)

  const limiter = limit.limit ? Number(limit.limit) : 0

  const { data, loading, error } = useQuery(GET_ALBUMS, { variables: { limit: limiter } });
  
  if (loading) return(<p>Loading</p>)

  if (error) return(<p>Error</p>)

  return (
    <div className="App">

      <Header headerTitle={"Album List"} />

      <div className="body">
          {
          data ? 
          
          data.albums ? 
          

          <>

          <List entry={data.albums} />
          
          </>
          
            
          : <p>No data</p>
          : <p>No data</p>
          }
      </div>
      <Route path="/artist/:id" component={Artist} />
    </div>
  );
}

export default AlbumsList;
