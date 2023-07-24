import { useState, useEffect } from 'react'
import axios from "axios"
import sp from "../src/assets/sp.svg"
import './App.css'

function App() {
  const [personajes,setPersonajes]=useState([])
  const [pagina,setPagina]=useState(1)
  const [busqueda, setBusqueda]=useState("")

  useEffect(()=>{
    const obtenerPersonajes = async() =>{
      const respuesta = await axios.get(`https://spapi.dev/api/characters?page=${pagina}`)
      setPersonajes(respuesta.data.data)
    }
    obtenerPersonajes()
  }, [pagina])

  let personajesFiltrados = personajes.filter((personaje)=>
  personaje.name.toLowerCase().includes(busqueda.toLowerCase()))

  return (
    <>
      <div className="Intro">
        <img src={sp} alt="" />
        <h1>api demo</h1>
      </div>
      <div className="Buttons">
        <button class="waves-effect waves-light btn-large" onClick={()=>setPagina(pagina-1)} disabled={pagina==1 ? "disabled" : ""}>prev</button>
        <button class="waves-effect waves-light btn-large" onClick={()=>setPagina(pagina+1)} disabled={pagina==20 ? "disabled" : ""}>next</button>
      </div>
      <div className="container">
        <div className="Search">
          <input type="search" value={busqueda} onChange={(e)=>setBusqueda(e.target.value)} placeholder="Search Characters (by page)"/>
        </div>
        <div className="row">
          <div className="col s12">
            {personajesFiltrados.map(personaje=>(<div class="card" key={personaje.id}>
              <div className="card-content">
                <span className="card-title activator grey-text text-darken-4">{personaje.name}<i class="material-icons right">open</i></span>
                <div className="character-url">
                  <p><b>URL:</b></p>
                  <a href={personaje.url}>{personaje.url}</a>
                </div>
              </div>
              <div className="card-reveal">
                <span className="card-title grey-text text-darken-4">{personaje.name}<i class="material-icons right">close</i></span>
                <div className="card-reveal-content">
                  <p><b>AGE:</b> {personaje.age===null ? "???" : `${personaje.age}`}</p>
                  <p><b>SEX:</b> {personaje.sex}</p>
                  <p><b>RELIGION:</b> {personaje.religion===null ? "None/Unknown" : `${personaje.religion}`}</p>
                </div>
              </div>
            </div>))}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
