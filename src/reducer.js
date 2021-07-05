export const initialState = {//para que se pueda consumir en index.js
    modalOperaciones: false, 
    arrayLibros: [],
    //////////////////////
    nombreUsuarioLogueado: null,
    idUsuarioLogueado: 0

}



export const actionTypes = {
    SET_MODAL_OPERACIONES: "SET_MODAL_OPERACIONES",
    ADD_NEW_ARRAY_LIBROS: "ADD_NEW_ARRAY_LIBROS",
    SET_NOMBRE_USUARIO_LOGUEADO: "SET_NOMBRE_USUARIO_LOGUEADO",
    SET_ID_USUARIO_LOGUEADO: "SET_ID_USUARIO_LOGUEADO",
}



const reducer = (state, action) => {
    console.log(action)
    switch (action.type) {

        /////////////////////////////////////////////////////

        case "SET_MODAL_OPERACIONES":
            return {
                ...state,
                modalOperaciones: action.modalOperaciones
            }


        case "ADD_NEW_ARRAY_LIBROS":
            return{
                ...state,
                arrayLibros: action.arrayLibros
            }

            
        /////////////////////////////////////////////////////

        case "SET_NOMBRE_USUARIO_LOGUEADO":
            return{
                ...state,
                nombreUsuarioLogueado: action.nombreUsuarioLogueado
            }

        case "SET_ID_USUARIO_LOGUEADO":
            return{
                ...state,
                idUsuarioLogueado: action.idUsuarioLogueado
            }

        /////////////////////////////////////////////////////


        default: return state; //en caso de default solo retornamos el state
    }

}

export default reducer;

