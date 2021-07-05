import React, { useState } from 'react';
import { Formulario, Label, ContenedorTerminos, ContenedorBotonCentrado, Boton, MensajeExito, MensajeError, Input } from './elementos/Formularios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
//import Input from './Input';
import {useHistory} from 'react-router-dom'
import { useStateValue } from '../../StateProvider'
import { actionTypes } from '../../reducer'
import axios from 'axios'
import bcryptjs from 'bcryptjs'//para encriptar la password
import Footer from '../Footer'

const Login = () => {
	const [usuario, setUsuario] = useState("");
	const [password, setPassword] = useState("");

    const [{ nombreUsuarioLogueado, idUsuarioLogueado }, dispatch] = useStateValue()

	const [formularioValido, cambiarFormularioValido] = useState(null);

    const history = useHistory()


	const iniciarSesion = async (e) => {

		e.preventDefault();

		await axios.get(`http://localhost:9000/api/traerUsuario/${usuario}`)
			.then(res =>{

				if (res.data[0] == null){
					alert("El nombre de usuario no existe")
					return
				}
				else {
					let comparar = bcryptjs.compareSync(password, res.data[0].password)
					if (comparar == true){
						dispatch({
							type: actionTypes.SET_ID_USUARIO_LOGUEADO,
							idUsuarioLogueado: res.data[0].id,
						})
		
						dispatch({
							type: actionTypes.SET_NOMBRE_USUARIO_LOGUEADO,
							nombreUsuarioLogueado: res.data[0].nombreUsuario,
						})
		
						cambiarFormularioValido(true);
						setUsuario("")
						setPassword("")
						history.push('/misLibros')
					}
					else{
						alert("Contraseña incorrecta")
						return
					}

				}

			})
			.catch(err =>
				console.log(err)
			)
	}

	return (
		<div>
			<div className="container">
				{
					nombreUsuarioLogueado ? 
					(
						<div>¡¡¡¡No se puede registrar si ya esta logueado!!!!</div>
					)
					:
					(	
						<div style={{border: "0.5px solid", marginTop: "30px"}}>
							<ContenedorBotonCentrado><h3 style={{color: "green"}}>Inicie sesion con sus datos</h3>
							<Formulario>
								<Input type="text" placeholder="Nombre de usuario" onChange={(e)=>(setUsuario(e.target.value))}></Input>
							
								<Input type="password" placeholder="Contraseña" onChange={(e)=>(setPassword(e.target.value))}></Input>


								{formularioValido === false && <MensajeError>
									<p>
										<FontAwesomeIcon icon={faExclamationTriangle} />
										<b>Error:</b> Por favor rellena el formulario correctamente.
									</p>
								</MensajeError>}
								<ContenedorBotonCentrado>
									<Boton onClick={(e)=>(iniciarSesion(e))} type="submit">Iniciar</Boton>
									{formularioValido === true && <MensajeExito>Formulario enviado exitosamente!</MensajeExito>}
								</ContenedorBotonCentrado>
							</Formulario>
							</ContenedorBotonCentrado>
						</div>

					)
				}
				
			</div>
            <div style={{marginTop: "700px"}}></div>

			<Footer></Footer>
		</div>
	);
}

export default Login;