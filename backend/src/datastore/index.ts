export class Datastore {
    public albums = []
    public artists = []
    constructor() {
        this.initialImport()
    }

    initialImport() {
        this.artists = [
            {
                id: 1,
                name: "Lamb of God"
            },
            {
                id: 2,
                name: "Motorhead"
            },
            {
                id: 3,
                name: "Jimi Hendrix"
            },
            {
                id: 4,
                name: "B.B. King"
            },
            {
                id: 5,
                name: "AC/DC"
            },
            {
                id: 6,
                name: "Guns N Roses"
            },
        ]
        this.albums = [
            {
                id: 1,
                album: "Wrath",
                artist: 1,
                price: "$12.99",
                date: 2009,
                image: "./images/wrath.jpg",
                favorite: true
            },
            {
                id: 2,
                album: "Ace of Spades",
                artist: 2,
                price: "$14.99",
                date: 1980,
                image: "./images/ace_of_spades.jpg",
                favorite: false
            },
            {
                id: 3,
                album: "Band of Gypsys",
                artist: 3,
                price: "$17.99",
                date: 1970,
                image: "./images/band_of_gypsys.jpg",
                favorite: false
            },
            {
                id: 4,
                album: "Guess Who",
                artist: 4,
                price: "$14.99",
                date: 1972,
                image: "./images/guess_who.jpg",
                favorite: false
            },
            {
                id: 5,
                album: "Back in Black",
                artist: 5,
                price: "$19.99",
                date: 1980,
                image: "./images/back_in_black.jpg",
                favorite: false
            },
            {
                id: 6,
                album: "Appetite for Destruction",
                artist: 6,
                price: "$12.99",
                date: 1987,
                image: "./images/appetite_for_destruction.jpg",
                favorite: false
            },
        ]
    }

    findById(id: number, collection: string) {
        switch (collection) {
            case 'albums':
                return this.albums.find(album => album.id == id)
            case 'artists': 
                return this.artists.find(artist => artist.id == id)
            default: 
                throw `${collection} collection does not exits`
        }
    }

    findByArtist(id: number) {
        return Array(this.albums.find( album => album.artist == id ))
    }

    update() {
        console.log(this.albums.indexOf(this.findById(1, 'albums')))
    }
}