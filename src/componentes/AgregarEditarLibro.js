import React, { useState } from 'react'
import { Button, ModalHeader, Modal, ModalBody, ModalFooter, FormGroup, Input, Label } from 'reactstrap'

import axios from 'axios'
import { useStateValue } from '../StateProvider'
import { actionTypes } from '../reducer'

const AgregarEditarLibro = (props) => {

    const [libro, setLibro] = useState({ //defino objeto de tipo libro, que tiene los mismos datos con el que se creo en la BD
        id: props.libro.id,
        titulo: props.libro.titulo,
        autor: props.libro.autor,
        edicion: props.libro.edicion,
        descripcion: props.libro.descripcion,
        idImagen: props.libro.idImagen, //si el libro cargo imagen, va a tener un ID, sino va a ser null
        urlDescarga: props.libro.urlDescarga,
        privacidad: props.libro.privacidad,
        idUsuario: props.libro.idUsuario,
    })

    const [{ modalOperaciones, arrayLibros, idUsuarioLogueado }, dispatch] = useStateValue()

    const [file, setFile] = useState(null)

    const guardarArchivo = e => {
        setFile(e.target.files[0])
    }

    const [msjError, setMsjError] = useState("")

    const [modalError, setModalError] = useState(false)

    const modificarModalError = () => {
        setModalError(!modalError)
    }

    const validacionesDatos = () => {
        if (!libro.titulo.trim()) {
            setMsjError("El campo 'titulo' esta vacio!!")
            modificarModalError()
            return
        }
        else if (!libro.autor.trim()) {
            setMsjError("El campo 'autor' esta vacio!!")
            modificarModalError()
            return
        }
        else if (libro.edicion <= 0) {
            setMsjError("El campo 'edicion' esta vacio!!")
            modificarModalError()
            return
        }
        else if (!libro.descripcion.trim()) {
            setMsjError("El campo 'descripcion' esta vacio!!")
            modificarModalError()
            return
        }
        else if (!libro.privacidad.trim()) {
            setMsjError("El campo 'privacidad' esta vacio!!")
            modificarModalError()
            return
        }
        else {
            return true
        }
    }


    // capturar los datos en el evento change de los input, si ponemos a los input el mismo nombre de los campos con un solo evento, asignamos a todos los valores 
    const handleChange = e => {
        const { name, value } = e.target
        setLibro({ ...libro, [name]: value })
    }

    const modificarModalOperaciones = () => {
        dispatch({
            type: actionTypes.SET_MODAL_OPERACIONES,
            modalOperaciones: false
        })
    }

    const actualizarArray = async () => { //en esta funcion lleno el array con los datos de todos los libros que hay en la base de datos 
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

    const borrarLibro = async () => {
        await axios.delete(`http://localhost:9000/api/${libro.id}`)
            .then(response => {
                actualizarArray()
                modificarModalOperaciones()
            })
            .catch(error => {
                console.log(error)
            })
    }

    const borrarImagen = async () => { //esta se llama primero, ya que primero se tiene que borrar la imagen

        if (libro.idImagen == 0 || libro.idImagen == null) {
            borrarLibro() //si no tiene imagen, se llama a la funcion que borra el libro directamente.
        }
        else {
            await axios.delete(`http://localhost:9000/api/imagenes/${libro.idImagen}`)
                .then(res => {

                    borrarLibro()
                })
                .catch(error => {
                    console.log(error)
                })
        }


    }

    const enviarArchivo = async (idLibro) => { //solo se va a llamar si el state FILE tiene una imagen cargada, sino se sube el libro sin imagen tranquilamente

        //darle formato de imagen . FORMDATA es de javascript
        const formData = new FormData()
        formData.append('imagen', file) //este metodo es para agregar. formateamos el archivo cargado
        console.log(file)

        // AXIOS
        await axios.post(`http://localhost:9000/api/imagen/${idLibro}`, formData)
            .then(response => {
                actualizarArray()
                modificarModalOperaciones()
                //si me devuelve aca el id que se genero, sse lo agrego al objeto libro antes de subirlo 
            })
            .catch(error => {
                console.log(error)
            })


        setFile(null)
        //document.getElementById('fileInput').value = null //asi reseteamos el input de la imagen

    }

    const agregarLibro = async (libroSinIdImagen) => {


        await axios.post(`http://localhost:9000/api`, libroSinIdImagen)
            .then(response => {
                //alert(response.data.insertId)
                if (file) {
                    enviarArchivo(response.data.insertId)
                }
                else {
                    actualizarArray()
                    modificarModalOperaciones()
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    const editarLibro = async (libroSinIdImagen) => {


        await axios.put(`http://localhost:9000/api/${libro.id}`, libroSinIdImagen)
            .then(response => {

                actualizarArray()
                modificarModalOperaciones()
            })
            .catch(error => {
                console.log(error)
            })


    }

    const guardarDatos = () => {

        let validacion = validacionesDatos()

        if (validacion == true){
            // const vLibro= {imagen: formData,   pLibro: libro }  
            const libroSinIdImagen = {
                id: libro.id,
                titulo: libro.titulo,
                autor: libro.autor,
                edicion: libro.edicion,
                descripcion: libro.descripcion,
                urlDescarga: libro.urlDescarga,
                privacidad: libro.privacidad,
                idUsuario: idUsuarioLogueado
            }

            if (props.accion == "Crea") {
                agregarLibro(libroSinIdImagen)
            }
            else if (props.accion == "Edita") {
                editarLibro(libroSinIdImagen)
            }
        }
        else{
            return
        }


    }


    return (
        <div>
            {/* <h1>Inicio</h1>   CON ESTO DEMOSTRAS COMO ENTRA AL COMPONENTE, ABRE LA MODAL, Y CUANDO CERRAS LA MODAL SE DESAPARECE ESTE H1, OSEA SE VA DE ESTE COMPONENTE*/}
            {
                <Modal isOpen={modalOperaciones}>

                    {
                        props.accion == "Crea" || props.accion == "Edita" ?
                            (
                                <div>
                                    <ModalHeader>
                                        {props.accion} tu libro !!
                                    </ModalHeader>
                                    <ModalBody>
                                        <FormGroup>
                                            <Label> Titulo</Label>
                                            <Input type="text" className="form-control" placeholder="Nombre del libro" value={libro.titulo} name="titulo" onChange={handleChange} />
                                        </FormGroup>
                                        <FormGroup className="mt-3">
                                            <Label> Autor</Label>
                                            <Input type="text" className="form-control" placeholder="Autor del libro" value={libro.autor} name="autor" onChange={handleChange} />
                                        </FormGroup>
                                        <FormGroup className="mt-3">
                                            <Label> Edicion</Label>
                                            <Input type="number" className="form-control" placeholder="Edicion del libro" value={libro.edicion} name="edicion" onChange={handleChange} />
                                        </FormGroup>

                                        <FormGroup className="mt-3">
                                            <Label> Descripcion</Label>
                                            <textarea type="text" className="form-control" placeholder="Descripcion del libro" value={libro.descripcion} name="descripcion" onChange={handleChange} />
                                        </FormGroup>

                                        <FormGroup className="mt-3">
                                            <Label >Privacidad</Label>
                                            <select className="form-control" name="privacidad" value={libro.privacidad} onChange={handleChange}>
                                                <option disabled="">Seleccione una opcion</option>
                                                <option className="form-control" aria-label="Server" value="Publica">Publica</option>
                                                <option className="form-control" aria-label="Server" value="Privada">Privada</option>
                                            </select>
                                        </FormGroup>

                                        <FormGroup className="mt-3">
                                            <Label> Url descarga</Label>
                                            <Input type="text" value={libro.urlDescarga} name="urlDescarga" onChange={handleChange} className="form-control" placeholder="Link para descargar" />
                                        </FormGroup>

                                        <FormGroup className="mt-3">
                                            <Label> Imagen</Label>
                                            <Input id="fileInput" onChange={guardarArchivo} type="file" className="form-control" placeholder="Seleccione una imagen" />
                                        </FormGroup>

                                    </ModalBody>
                                    {
                                        modalError ?
                                            (
                                                <div className="alert alert-danger alert-dismissible mt-5" role="alert">
                                                    <strong>Error!</strong> {msjError}
                                                    <button type="button" className="btn btn-danger" data-dismiss="alert" aria-label="Close" onClick={modificarModalError}>
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>

                                            )
                                            :
                                            (
                                                <span></span>
                                            )

                                    }
                                    <ModalFooter>
                                        <Button color="primary" onClick={(e) => { guardarDatos(e) }} >Guardar libro</Button>
                                        <Button color="secondary" onClick={modificarModalOperaciones}> No </Button>
                                    </ModalFooter>

                                </div>
                            )
                            :
                            (
                                <div>
                                    <ModalHeader>
                                        Estas seguro de eliminar este libro?
                                    </ModalHeader>

                                    <ModalFooter>
                                        <Button color="primary" onClick={(e) => { borrarImagen(e) }} >Si</Button>
                                        <Button color="secondary" onClick={modificarModalOperaciones}> No </Button>
                                    </ModalFooter>
                                </div>
                            )
                    }

                </Modal>
            }
        </div>
    )
}

export default AgregarEditarLibro;