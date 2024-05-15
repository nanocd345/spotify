import { LitElement, css, html } from 'lit'
import "./components/GetData.js"

export class MyElement extends LitElement {
  static get properties() {
    return {
      wiki: { type: Array },
    }
  }

  constructor() {
    super();
    this.wiki=[];	
    this.addEventListener('ApiData',(e)=>{
      this._dataFormat(e.detail)
    })
  }
  _dataFormat(data) {

    let music = [];
    if (data) {
      data.forEach((track) => {
        console.log(track);
        const releaseYear = new Date(track.album.release_date).getFullYear();
        music.push({
          img: track.album.images[1].url,
          name: track.name,
          singer: track.artists[0].name,
          age: releaseYear,
          popularity: track.popularity
        });
      });
      music.sort((a, b) => b.popularity - a.popularity);
    }
    this.wiki = music;
  }
  render() {
    return html`
    <get-data></get-data>   
      <div class="container">
        ${this.dateTEmplate}
      </div> 

    `
  }
  get dateTEmplate(){
    return html`
      ${this.wiki.map(music=>html`
        <div class="card">
          <img src="${music.img}">
          <p>${music.name}</p>
          <short>${music.singer}, ${music.age}</short>
      `)}
    `
  }
  



  static get styles() {
    return css`
      :host{
        display:block;
      }
      .container {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        height: 44vh;
        width: 20vw;
        overflow-y: scroll;
        //background: red;
      }
      .container::-webkit-scrollbar{
        display: none;
      }
      .card{
        height: 200px;
        width: 180px;
        // background: blue;
        margin: 5px;
        border-radius: 10px;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
        display:flex;
        flex-direction: column;
        align-items: flex-start;
        gap:1px;
      }
      .card img{
        height: 140px;
        width: 170px;
        border-radius: 10px;
        margin: 5px;
        border: 1px solid gray;
        -webkit-box-shadow: 2px 8px 19px -11px rgba(0,0,0,0.47);
-moz-box-shadow: 2px 8px 19px -11px rgba(0,0,0,0.47);
box-shadow: 2px 8px 19px -11px rgba(0,0,0,0.47);
      }
      .card short,
      .card p{
        padding-left: 10px;
        height: 20px;
        margin-block-start: 0em;
        margin-block-end: 0em;
        margin-inline-start: 0px;
      }
      .card p{
        font-size: 20px;
        overflow: hidden;
      }
      
      .card short{
        color: gray;
        font-size: 17px;
      }
    `
  }
}
window.customElements.define('my-element', MyElement)