import { LitElement, css, html} from "lit";
import { map } from "lit/directives/map.js";

export class MyElement extends LitElement{ 
    static properties = {
      songs: {type: Array}
    };

  
    constructor() {
      super();
      this.song = []
      this.loadSong();
    }

    async loadSong() {
      const url = 'https://spotify23.p.rapidapi.com/artist_singles/?id=2w9zwq3AktTeYYMuhMjju8&offset=0&limit=10';
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '6dd82b226cmsh0ef7d9c5c6c533cp117684jsn444cf17bc680',
          'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
        }
      };
    
      try {
        const response = await fetch(url, options);
        const result = await response.json();
        this.songs = result.data.artist.discography.singles.items;
        this.requestUpdate();
    } catch (error) {
        console.error('Error fetching songs:', error);
    }
    }
  
    render() {
      return html`
      <div>
        ${Array.isArray(this.songs) && this.songs.length > 0 ? 
        this.songs.map(song => html`
        <div class="card">
        <div class="cards">
            <div class="cards_info">
                <div class="aling"><button  type="button"> <box-icon name='menu'></box-icon></button></div>
                <div class="img"><img src="${song.releases.items[0].coverArt.sources[0].url}"></div>
                <div class="Titule_and_artis">
                    <h3>${song.releases.items[0].name}</h3>
                </div>
                </div>
                <div class="minutes_and_date">
                <h5>${song.releases.items[0].date.year}</h5>
            </div>
        </div>
    </div>  `)

     : 
      html`<p>No hay canciones disponibles</p>`
    }
    </div>
`;
}

    static styles = css`
    .card {
      width: 300px;
      margin: 10px;
      padding: 0;
  }

  .cards{
      background: white;
      height: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      overflow: hidden; 
      margin-bottom: 10px
  }

  .cards h3{
    margin: 5px;
    font-size: 15px ;
  }

  .cards h5{
    margin: 0;
    color: rgb(124, 124, 124);
  }

  .cards button{
    background: none;
    border: none;
  }

  .card button:hover{
    cursor: pointer;
  }

  .cards .cards_info{
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .cards .cards_info .img{
    height: 50px;
    width: 50px
  }

  .cards .cards_info .img img{
    height: 50px;
    width: 50px;
    object-fit: cover;
  }

  .cards .minutes_and_date{
    padding-right: 10px
  }
    `
    _guardar(e){
        let cancion = this.name(e.target.value)
        return(cancion)
    }
}   
customElements.define('my-tracklist', MyElement);