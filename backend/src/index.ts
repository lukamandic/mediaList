import { Datastore } from './datastore'
import Server from './server'

const datastore = new Datastore()
const server = new Server(2000)

server.addNewType(`
type Query {
  artist(id: Int!): Artist
  albums(limit: Int): [Album]
  favorite(id: Int!, favorite: Boolean!): Album!
}
type Album {
  id: Int
  album: String
  artist: ArtistNested
  price: String
  date: Int
  image: String
  favorite: Boolean
}
type Artist {
  id: Int
  name: String
  albums(id: Int!): [Album!]
}
type ArtistNested {
  id: Int
  name: String
}
`
)

server.addNewResolver({
    Query: {
        artist: (_, args) => {
            return datastore.findById(args.id, 'artists')
        },
        albums: (_, args) => {
            return args.limit ? datastore.albums.filter((x,i)=>{
                if(i<=(args.limit-1)) return true
            }) : datastore.albums
        },
        favorite: (_, args) => {
          const foundAlbum = datastore.findById(args.id, 'albums')

          const index = datastore.albums.findIndex((album) => {
            return album.id == foundAlbum.id 
          })

          console.log('FOOOUNND')
          console.log(datastore.albums[index])


          datastore.albums[index].favorite = args.favorite


          console.log(datastore)
          console.log('CHANGED')
          console.log(datastore.albums[index].favorite)

          return datastore.albums[index]
      }
    },
    Artist: {
      albums(_, args) {
        console.log(args)
        return datastore.findByArtist(args.id)
      }
    },
    ArtistNested: {
        id: parent => parent,
        name: parent => datastore.findById(parent, 'artists').name
    }
})

server.initializeServer()