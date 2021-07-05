import React, { useState } from 'react';
import { Formulario, Label, ContenedorTerminos, ContenedorBotonCentrado, Boton, MensajeExito, MensajeError } from './elementos/Formularios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import Input from './Input';
import {useHistory} from 'react-router-dom'
import { useStateValue } from '../../StateProvider'
import { actionTypes } from '../../reducer'
import axios from 'axios'
import bcryptjs from 'bcryptjs'
import Footer from '../Footer'

const Register = () => {
	const [usuario, cambiarUsuario] = useState({ campo: '', valido: null });
	const [nombre, cambiarNombre] = useState({ campo: '', valido: null });
	const [password, cambiarPassword] = useState({ campo: '', valido: null });
	const [password2, cambiarPassword2] = useState({ campo: '', valido: null });
	const [correo, cambiarCorreo] = useState({ campo: '', valido: null });
	const [telefono, cambiarTelefono] = useState({ campo: '', valido: null });
	const [terminos, cambiarTerminos] = useState(false);

    const [{ nombreUsuarioLogueado, idUsuarioLogueado }, dispatch] = useStateValue()


	const [formularioValido, cambiarFormularioValido] = useState(null);

	const expresiones = {
		usuario: /^[a-zA-Z0-9_-]{4,16}$/, // Letras, numeros, guion y guion_bajo
		nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
		password: /^.{8,20}$/, // 8 a 20 digitos.
		correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z-.]+$/,
		telefono: /^\d{7,14}$/ // 7 a 14 numeros.
	}

	const validarPassword2 = () => {
		if (password.campo.length > 0) {
			if (password.campo !== password2.campo) {
				cambiarPassword2((prevState) => {
					return { ...prevState, valido: 'false' }
				});
			} else {
				cambiarPassword2((prevState) => {
					return { ...prevState, valido: 'true' }
				});
			}
		}
	}

	const onChangeTerminos = (e) => {
		cambiarTerminos(e.target.checked);
	}

    const history = useHistory()


	const nuevoUsuario = async () => {

		let nuevoUsuario = {
			nombre: nombre.campo,
			password: await bcryptjs.hash(password.campo, 8),
			nombreUsuario: usuario.campo,
			email: correo.campo,
			telefono: telefono.campo
		}

		await axios.post('http://localhost:9000/api/agregarUsuario', nuevoUsuario)
			.then(res =>{

				dispatch({
					type: actionTypes.SET_ID_USUARIO_LOGUEADO,
					idUsuarioLogueado: res.data.insertId,
				})

				dispatch({
					type: actionTypes.SET_NOMBRE_USUARIO_LOGUEADO,
					nombreUsuarioLogueado: usuario.campo,
				})

				cambiarFormularioValido(true);
				cambiarUsuario({ campo: '', valido: '' });
				cambiarNombre({ campo: '', valido: null });
				cambiarPassword({ campo: '', valido: null });
				cambiarPassword2({ campo: '', valido: 'null' });
				cambiarCorreo({ campo: '', valido: null });
				cambiarTelefono({ campo: '', valido: null });

				history.push('/')
			})
			.catch(err =>
				console.log(err)
			)


	}


	const onSubmit = async (e) => {
		e.preventDefault();
		if ( usuario.valido === 'true' && nombre.valido === 'true' && password.valido === 'true' && password2.valido === 'true' && correo.valido === 'true' && telefono.valido === 'true' && terminos )
		{
			// valido que el 
			await axios.get(`http://localhost:9000/api/traerUsuario/${usuario.campo}`)
			.then(res => {
				console.log(res.data)
				if (res.data[0] == null){
					nuevoUsuario()
				}
				else{
					alert("El nombre de usuario ya existe! :(")
				}

			})
			.catch(err =>
				console.log(err)
			)


		} else {
			cambiarFormularioValido(false);
		}
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
							<ContenedorBotonCentrado><h3 style={{color: "green"}}>Registre su nueva cuenta</h3></ContenedorBotonCentrado>
							<Formulario action="" onSubmit={onSubmit}>
								<Input
									estado={usuario}
									cambiarEstado={cambiarUsuario}
									tipo="text"
									label="Usuario"
									placeholder="john123"
									name="nombreUsuario"
									leyendaError="El usuario tiene que ser de 4 a 16 dígitos y solo puede contener numeros, letras y guion bajo."
									expresionRegular={expresiones.usuario}
								/>
								<Input
									estado={nombre}
									cambiarEstado={cambiarNombre}
									tipo="text"
									label="Nombre"
									placeholder="John Doe"
									name="nombre"
									leyendaError="El nombre solo puede contener letras y espacios."
									expresionRegular={expresiones.nombre}
								/>
								<Input
									estado={password}
									cambiarEstado={cambiarPassword}
									tipo="password"
									label="Contraseña"
									name="password1"
									leyendaError="La contraseña tiene que ser de 8 a 20 dígitos."
									expresionRegular={expresiones.password}
								/>
								<Input
									estado={password2}
									cambiarEstado={cambiarPassword2}
									tipo="password"
									label="Repetir Contraseña"
									name="password2"
									leyendaError="Ambas contraseñas deben ser iguales."
									funcion={validarPassword2}
								/>
								<Input
									estado={correo}
									cambiarEstado={cambiarCorreo}
									tipo="email"
									label="Correo Electrónico"
									placeholder="john@correo.com"
									name="correo"
									leyendaError="El correo solo puede contener letras, numeros, puntos, guiones y guion bajo."
									expresionRegular={expresiones.correo}
								/>
								<Input
									estado={telefono}
									cambiarEstado={cambiarTelefono}
									tipo="text"
									label="Teléfono"
									placeholder="4491234567"
									name="telefono"
									leyendaError="El telefono solo puede contener numeros y el maximo son 14 dígitos."
									expresionRegular={expresiones.telefono}
								/>



								<ContenedorTerminos>
									<Label>
										<input
											type="checkbox"
											name="terminos"
											id="terminos"
											checked={terminos}
											onChange={onChangeTerminos}
										/>
										Acepto los Terminos y Condiciones
									</Label>
								</ContenedorTerminos>
								{formularioValido === false && <MensajeError>
									<p>
										<FontAwesomeIcon icon={faExclamationTriangle} />
										<b>Error:</b> Por favor rellena el formulario correctamente.
									</p>
								</MensajeError>}
								<ContenedorBotonCentrado>
									<Boton type="submit">Registrarme</Boton>
									{formularioValido === true && <MensajeExito>Formulario enviado exitosamente!</MensajeExito>}
								</ContenedorBotonCentrado>
							</Formulario>
						</div>

					)
				}
				
			</div>

            <div style={{marginTop: "380px"}}></div>

			<Footer></Footer>
		</div>
	);
}

export default Register;