import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useStateValue } from '../StateProvider'
import { actionTypes } from '../reducer'
import AgregarEditarLibro from './AgregarEditarLibro'
import { Link, useHistory } from 'react-router-dom'
import Footer from './Footer'


const MisLibros = () => {

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

    const [busqueda, setBusqueda] = useState("")

    const [accion, setAccion] = useState(null)

    const [{ modalOperaciones, arrayLibros, nombreUsuarioLogueado, idUsuarioLogueado }, dispatch] = useStateValue()

    useEffect(() => {
        traerLibros() // de algun hacer que cuando vuelve de ver detalle de libro, no actualize el array innecesariamente
    }, [])


    const traerLibros = async () => { //en esta funcion lleno el array con los datos de todos los libros que hay en la base de datos 
        //const listaLibros = await data.json() //lo guardo en un array
        await axios.get(`http://localhost:9000/api/${idUsuarioLogueado}`)
            .then(res => {
                console.log(res.data)
                dispatch({
                    type: actionTypes.ADD_NEW_ARRAY_LIBROS, //el tipo de accion que inyectamos en ala cada de datos es agregar al basket,
                    arrayLibros: res.data
                })
            })
            .catch(err => {
                console.log(err)
            })

    }


    const modificarModalOperaciones = () => {
        dispatch({
            type: actionTypes.SET_MODAL_OPERACIONES,
            modalOperaciones: true
        })
    }



    return (

        <div>
            <div className="container" >
                {
                    nombreUsuarioLogueado ?
                        (
                            <div>
                                <span className="homeTitulo">MIS LIBROS</span>
                                <br></br>
                                <p className="mt-4">
                                    <h4>Buscar</h4>
                                    <form className="d-flex">
                                        <input className="form-control me-2" type="Search" onChange={(e) => { setBusqueda(e.target.value) }} placeholder="Buscar por nombre del documento" aria-label="Search"></input>
                                    </form>
                                </p>
                                <br></br>

                                <span> {/*dentro de un span asi queda todo en la misma linea, el boton y el mensaje por si sos nuevo*/}
                                    <button onClick={(e) => ((modificarModalOperaciones(), setAccion("Crea"), setLibro({
                                        id: 0,
                                        titulo: "",
                                        autor: "",
                                        edicion: 0,
                                        descripcion: "",
                                        idImagen: 0,
                                        urlDescarga: "",
                                        privacidad: "",
                                        idUsuario: 0,
                                    })))} className="btn btn-success"><i class="fas fa-plus-circle"></i><b style={{ marginLeft: "4px" }}>Nuevo Libro</b></button>
                                    {arrayLibros[0] == null ? (<span className="indicacionCrear"><i class="fas fa-reply-all"></i> Publica tu primer libro!!</span>) : (<span></span>)}
                                </span>
                                <div className="bordeTabla">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <td className="texto">Titulo</td>
                                                <td className="texto">Autor</td>
                                                <td className="texto">Edicion</td>
                                                <td className="texto">Privacidad</td>
                                                <td className="texto">Operaciones</td>
                                            </tr>

                                        </thead>
                                        <tbody>
                                            {

                                                arrayLibros.filter(lib => lib.titulo.toLowerCase().includes(busqueda.toLowerCase())).map(filteredDocumento => ( //mapeo el array LIBROS, genero una fila o registro con cada libro que haya 
                                                    <tr key={filteredDocumento.id}>
                                                        <td style={{ fontFamily: "monospace" }}>{filteredDocumento.titulo}</td>
                                                        <td style={{ fontFamily: "monospace" }}>{filteredDocumento.autor}</td>
                                                        <td style={{ fontFamily: "monospace" }}>{filteredDocumento.edicion}</td>
                                                        <td style={{ fontFamily: "monospace" }}>{filteredDocumento.privacidad}</td>


                                                        <td>
                                                            <Link to={`/libros/id/${filteredDocumento.id}`}><button className="btn btn-warning"><i class="fas fa-info-circle"></i><b style={{ marginLeft: "4px" }}>Detalles</b></button></Link>
                                                            
                                                            <button style={{ marginLeft: "4px" }} onClick={(e) => ((setLibro(filteredDocumento)), modificarModalOperaciones(), setAccion("Edita"))} className="btn btn-primary "><i class="fas fa-edit"></i><b style={{ marginLeft: "4px" }}>Editar</b> </button> {/*siempre tiene que haber un parentesis que englobe todo lo que hagas dentro del ONCLICK sino se rompe todo*/}
                                                            
                                                            <button onClick={(e) => ((setLibro(filteredDocumento)), modificarModalOperaciones(), setAccion("Borra"))} className="btn btn-danger" ><i class="fas fa-trash-alt"></i><b style={{ marginLeft: "4px" }}>Borrar</b></button> {/*SI no pones lo del evento, se manda el parametro pero se buguea todo*/}
                                                        </td>
                                                    </tr>
                                                ))
                                            }


                                        
                                        </tbody>

                                    </table>
                                </div>


                                {
                                    modalOperaciones ?
                                        (
                                            <AgregarEditarLibro libro={libro} accion={accion}></AgregarEditarLibro>
                                        )
                                        :
                                        (
                                            <span></span>
                                        )
                                }
                            </div>
                        )
                        :
                        (   
                            <div>
                                <div className="alert alert-danger alert-dismissible mt-5" role="alert">
                                    <strong><h3>Error!</h3></strong> ¡¡¡No podes acceder a <b>'Mis Libros'</b> si no estas logueado!!!
                                    
                                </div>
                                <div style={{marginTop: "760px"}}></div>
                            </div>
                        )

                }


            </div>
            <div style={{marginTop: "540px"}}></div>

            <Footer></Footer>
        </div>
    )
}

export default MisLibros;



// {lib.titulo.split(" ").join("_")}