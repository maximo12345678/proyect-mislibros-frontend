import React from 'react'
import { Link } from 'react-router-dom'

import '../styles.css'

import { useStateValue } from '../StateProvider'
import { actionTypes } from '../reducer'
import { useHistory } from 'react-router-dom'

//import menu from '../fotos/menu.png'


const Navegador = () => {


    const [{ nombreUsuarioLogueado, idUsuarioLogueado }, dispatch] = useStateValue()

    const history = useHistory()

    const cerrarSesion = () => {
        dispatch({
            type: actionTypes.SET_ID_USUARIO_LOGUEADO,
            idUsuarioLogueado: 0,
        })

        dispatch({
            type: actionTypes.SET_NOMBRE_USUARIO_LOGUEADO,
            nombreUsuarioLogueado: null,
        })

        history.push('/')
    }


    const openMenu = () => {

        // Necesitamos capturar el evento del icono de menu. EN el segundo modificamos la clase del boton para saber cuando esta activo, entonces lo modificamos en css
        //document.querySelector('.menu-btn').addEventListener('click', () => { --> esto lo sacamos, ya que apenas se aprieta el boton, modificamos las 2 clases abajo directamente.
            document.querySelector('.menu').classList.toggle('show'); //toggle, hace aparecer a SHOW si no esta, y lo desaparece si esta
            document.querySelector('.menu-btn').classList.toggle('clik'); //toggle, hace aparecer a SHOW si no esta, y lo desaparece si esta
        //});

    }



    return (
        <div>
            <nav className="navegador">

                <Link to="/"><img src="logo192.png" className="navegador-icono"></img></Link>

                <div className="saludoUsuario">Hola {nombreUsuarioLogueado ? (nombreUsuarioLogueado + "!!") : (" invitado!!")}</div>


                {
                    nombreUsuarioLogueado ?
                        (

                            <ul className="menu">
                                <li>
                                    <a><Link to="/">Inicio</Link></a>
                                </li>
                                <li>
                                    <a><Link to="/librosPublicos">Libros publicos</Link></a>
                                </li>
                                <li>
                                    <a><Link to="/misLibros">Mis Libros</Link></a>
                                </li>
                                <li>
                                    <button className="btn btn-success" onClick={cerrarSesion}> <i class="far fa-times-circle"></i><b style={{ marginLeft: "4px" }}>Cerrar sesion</b></button>
                                </li>
                            </ul>
                        )
                        :
                        (
                            <ul className="menu">
                                <li>
                                    <a><Link to="/">Inicio</Link></a>
                                </li>
                                <li>
                                    <a><Link to="/librosPublicos">Libros publicos</Link></a>
                                </li>
                                <li>
                                    <a><Link to="/register">Registrar</Link></a>
                                </li>
                                <li>
                                    <a><Link to="/login">Entrar</Link></a>
                                </li>
                            </ul>
                        )
                }

                {/*lo hice asi porque si ponia un DIV con la clase dentro del boton, me quedaba el boton dibujado en le nav al costado y se podia apretar. lo solucione asi y listo. le pongo el color del navegador porque sino le pone el color blando por defecto de un boton, y le saque el borde feo tambien.*/}
                <button style={{ border: "none" , backgroundColor: "rgb(189, 178, 178)"}} className="menu-btn" onClick={openMenu}> 
                    {/* <img src={menu}></img> */}
                    <i  class="fas fa-ellipsis-v"></i><i class="fas fa-bars"></i>
                </button>

            </nav>
        </div>
    )
}

export default Navegador;