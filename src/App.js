import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Inicio from './componentes/Inicio'
import Navegador from './componentes/Navegador';
import MisLibros from './componentes/MisLibros';
import Libro from './componentes/Libro';
import LibrosPublicos from './componentes/LibrosPublicos';


import Register from './componentes/login/Register'
import Login from './componentes/login/Login'

import Footer from './componentes/Footer'

function App() {
  return (
    <div>

      <Router>

      <Navegador></Navegador>
      
      <Switch>

        <Route exact path="/">
          <Inicio></Inicio>
        </Route>

        <Route exact path="/misLibros">
          <MisLibros></MisLibros>
        </Route>

        <Route exact path="/librosPublicos">
          <LibrosPublicos></LibrosPublicos>
        </Route>
       
        <Route exact path="/register">
          <Register></Register>
        </Route>

        <Route exact path="/login">
          <Login></Login>
        </Route>

        <Route path="/libros/id/:id" component={Libro} /> {/* los : es la parte dinamica, se pone asi ----- lo creo de esta manera asi se pasa por las props el parametro del name, sino no se pasa */}
  

      </Switch>


      </Router>
      
    </div>
  );
}

export default App;
