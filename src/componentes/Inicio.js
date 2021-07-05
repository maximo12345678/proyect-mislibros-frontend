import React,{useState, useEffect} from 'react'

import imagenCelu from '../fotos/ux-design.png'
import fotolibro from '../fotos/fotolibro.png'

import Footer from './Footer'

const Inicio = () =>{


    return(
        <div>
            <div className="container">
                <span className="homeTitulo">Bienvenido</span>
                {/* <p className="texto">En esta pagina vamos a probar las APis creadas en <b>NODE.JS</b> y utilizando el framework <b>EXPRESS</b>. Consumiendo estas Apis vamos a estar interactuando con la base de datos creada en <b>MYSQL</b>.</p> */}
                <p className="texto">Pagina para que puedas <b>subir tus libros</b> y ver los que suban otras personas! Asi compartimos el <b>conocimiento</b> y recomendaciones!</p>
                <br></br>
                <br></br><br></br><br></br>

                <body >
                </body>


                <div className="columnasFotos">

                    <div >
                        <p className="texto2">Con una interfaz SUPER <b>facil</b> y <b>rapida</b> de usar, para que en segundos puedas publicar los libros que mas te gustan!!</p>
                        <img className="imagenLibro" src={fotolibro}></img>
                        <br></br><br></br><hr className="separacionImagenes"></hr><br></br>
                    </div>
                    
                    <div >
                        <p className="texto2">Tambien podras <b>utilizar</b> la pagina facilmente desde tu <b>celular</b>!!</p>
                        <img className="imagenCelu" src={imagenCelu}></img>
                    </div>

                </div>

                
            </div>

            <div style={{marginTop: "110px"}}></div>

            <Footer></Footer>


        </div>
    )
}

export default Inicio;