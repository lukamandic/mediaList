import React from 'react';
import List from './components/List'
import Header from './components/Header'
import { useQuery } from '@apollo/react-hooks';
import gql from "graphql-tag";

const GET_ARTIST = gql`
  query Artist($id: Int!) {
      artist(id: $id) {
        id
        name
        albums(id: $id) {
          artist {
            id
            name
          }
          id
          album
          image
        }
      }
    }
` 

function AlbumsList(props: any) {

  console.log(props)

  const { data, loading, error } = useQuery(GET_ARTIST, { variables: { id: Number(props.match.params.id) } })

  console.log(data)
  console.log(error)

  if (loading)  return(<p>Loading</p>)

  if (error) return(<p>Error</p>)

  return (
    <div className="App">


      <Header headerTitle={data.artist.name} />
      <div className="body">
      {
      data ?
       
      data.artist.albums ? 
      
      <>
        <div>
          <List entry={data.artist.albums} />
        </div>
      </>
      
      : <p>No data</p>
      : <p>No data</p>
      }
      </div>
    </div>
  );
}

export default AlbumsList;
