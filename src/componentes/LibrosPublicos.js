import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useStateValue } from '../StateProvider'
import { actionTypes } from '../reducer'
import { Link, useHistory } from 'react-router-dom'
import Footer from './Footer'


const LibrosPublicos = () => {

    const [libro, setLibro] = useState({ //defino objeto de tipo libro, que tiene los mismos datos con el que se creo en la BD
        id: 0,
        titulo: "",
        autor: "",
        edicion: 0,
        descripcion: "",
        idImagen: 0,
        urlDescarga: "",
        privacidad: "",
        idUsuario: 0,
    })
    
    const [arrayDeLibros, setArrayDeLibros] = useState([libro])


    useEffect(() => {
        traerLibros() // de algun hacer que cuando vuelve de ver detalle de libro, no actualize el array innecesariamente
    }, [])


    const traerLibros = async () => { //en esta funcion lleno el array con los datos de todos los libros que hay en la base de datos 
        //const listaLibros = await data.json() //lo guardo en un array
        await axios.get(`http://localhost:9000/api/librosPublicos`)
            .then(res =>{
                console.log(res)
                setArrayDeLibros( res.data)
            })
            .catch(err => {
                console.log(err)
            })

    }





    return (
        <div>
            <div className="container" >
                <span className="homeTitulo">LIBROS PUBLICOS</span>
                <br></br>
                <br></br>
                <br></br>
                <div className="bordeTabla">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <td className="texto">Titulo</td>
                                <td className="texto">Autor</td>
                                <td className="texto">Edicion</td>
                                <td className="texto">Operaciones</td>
                            </tr>

                        </thead>
                        <tbody>
                            {
                                arrayDeLibros.map((lib) => //mapeo el array LIBROS, genero una fila o registro con cada libro que haya 
                                    <tr key={lib.id}>
                                        <td style={{ fontFamily: "monospace" }}>{lib.titulo}</td>
                                        <td style={{ fontFamily: "monospace" }}>{lib.autor}</td>
                                        <td style={{ fontFamily: "monospace" }}>{lib.edicion}</td>

                                        <td>
                                        <Link to={`/libros/id/${lib.id}`}><button className="btn btn-warning"><i class="fas fa-info-circle"></i><b style={{marginLeft: "4px"}}>Detalles</b></button></Link> 
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>


            <div style={{marginTop: "610px"}}></div>
            <Footer></Footer>
        </div>
    )
}

export default LibrosPublicos;







