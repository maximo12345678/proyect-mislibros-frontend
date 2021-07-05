import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useStateValue } from '../StateProvider'
import { actionTypes } from '../reducer'
import AgregarEditarLibro from './AgregarEditarLibro'
import { Link, useHistory } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import GetAppIcon from '@material-ui/icons/GetApp';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import imagenFondo from '../fotos/fondogod.png'
import Footer from './Footer'

const useStyles = makeStyles((theme) => ({


    root: {
        maxWidth: 345,
        boxShadow: "0px 0px 12px",

    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));



const Libro = (props) => {//en este caso, en la props recibo en "props.match.params.id" el valor del id dinamico segun que libro sea
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    
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
    })//iba a ser un array porque lo que traigo de la API es un array de objetos, en este caso solo 1 objeto porque el id es unico, pero tiene que ser un array. pero poniendo DATA en llaves no es necesario

    const [urlImagen, setUrlImagen] = useState("")

    const traerImagen = async () =>{

        await axios.get(`http://localhost:9000/api/unaImagen/${props.match.params.id}`)
        .then(res =>  
            setUrlImagen(`http://localhost:9000/${res.data[0].id}-maxiyanez.png`)
            //console.log(res.data[0].id)
        ) 
        .catch(err => {
          console.log(err)
        })
    }
    


    const traerLibro = async () => {
        const { data } = await axios.get(`http://localhost:9000/api/unLibro/${props.match.params.id}`) //al poner data entre llaves viene como un array de objetos y por ejemplo poniendo data[0].titulo se puede acceder.
        //en este caso se que siempre viene 1 solo libro porque el id es unico, entonces se lo asigno directamente a un objeto libro definido arriba y lo muestro en el return
        setLibro({
            id: data[0].id,
            titulo: data[0].titulo,
            autor: data[0].autor,
            edicion: data[0].edicion,
            descripcion: data[0].descripcion,
            idImagen: data[0].idImagen,
            urlDescarga: data[0].urlDescarga,
            privacidad: data[0].privacidad,
            idUsuario: data[0].idUsuario,
        })
    }


    
    useEffect(() => {
        traerImagen()
        traerLibro()
    }, [])


    const history = useHistory()

    const volverAtras = () =>{
        //redirijimos a la anterior ruta que se abrio antes de ver el detalle de este libro, ya que puede estar o no logueado, y verlo desde publicos o mis libros
        history.push('/' + props.history.goBack())  //https://qastack.mx/programming/30915173/react-router-go-back-a-page-how-do-you-configure-history
    }



    return (
        <div>
            <div className="container" >
                
                <button onClick={volverAtras} style={{border: "none", backgroundColor: "white"}}>
                    <IconButton className="botonVolver" aria-label="go to back">
                            <ArrowBackIcon />
                    </IconButton>
                </button>
            
                
                <div className="row">
                    <div className="col">
                        <Card className={classes.root}>
                            <CardHeader

                                title={libro.titulo}
                                subheader={`Autor: ${libro.autor}`}
                            />
                            <center><img src={urlImagen} style={{width: "300px", height: "500px"}}></img></center>
                            {/* <CardMedia
                                className={classes.media}
                                //image={urlImagen}
                                title="Paella dish"
                            /> */}
                            <CardContent>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Edicion: {libro.edicion}
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                                <IconButton aria-label="add to favorites">
                                    <FavoriteIcon />
                                </IconButton>
                                <a href={libro.urlDescarga}  target=" _blank">
                                <IconButton aria-label="download" title="Descargar libro">
                                        <GetAppIcon />
                                    </IconButton>
                                </a>

                                <IconButton
                                    className={clsx(classes.expand, {
                                        [classes.expandOpen]: expanded,
                                    })}
                                    onClick={handleExpandClick}
                                    aria-expanded={expanded}
                                    aria-label="show more"
                                >
                                    <ExpandMoreIcon />
                                </IconButton>
                            </CardActions>
                            <Collapse in={expanded} timeout="auto" unmountOnExit>
                                <CardContent>
                                    <Typography paragraph>Descripcion:</Typography>
                                    <Typography paragraph>
                                        {libro.descripcion}
                                    </Typography>
                                </CardContent>
                            </Collapse>
                        </Card>
                    </div>

                    <div className="col">


                        <h3>Aca van a ir valoraciones con estrellitas, comentarios del libro o links para mas info.</h3>
                        <br></br><br></br><br></br>
                        {/* <div className="valoracion">

                            <button onClick={(e) => alert("Estrellla 1")}>
                                <i className="fas fa-star"></i>
                            </button>

                            <button onClick={(e) => alert("Estrellla 2")}>
                                <i className="fas fa-star"></i>
                            </button>
    
                            <button onClick={(e) => alert("Estrellla 3")}>
                                <i className="fas fa-star"></i>
                            </button>

                            
                            <button onClick={(e) => alert("Estrellla 4")}>
                                <i className="fas fa-star"></i>
                            </button>

                            
                            <button onClick={(e) => alert("Estrellla 5")}>
                                <i className="fas fa-star"></i>
                            </button>

                        </div> */}

                    </div>
                </div>
            

            </div>
            <div style={{marginTop: "150px"}}></div>

            <Footer></Footer>
            
        </div>
    )
}

export default Libro;





