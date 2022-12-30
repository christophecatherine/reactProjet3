import React from 'react';
import PaysManager from "./containers/PaysManager/PaysManager";
import Unpays from './containers/UnPays/UnPays';
import { BrowserRouter, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
// import Erreur from "./components/Erreur/Erreur";
// import Erreur404 from "./components/Erreur/Erreur404/Erreur404";
import "./App.css";
// import NavBar2 from "./components/NavBar/NavBar2";

function App() {
  return (
    <BrowserRouter>
      <NavBar />      
        {/* <Route path='/pays' component={NavBar} />
        <Route path='/admin' component={NavBar2} /> */}
        <Route path='/' render={() => <h1>Page d'accueil</h1>} />
        <Route path='/pays' exact component={PaysManager} />
        <Route path='/pays/:id' render={(props) => <Unpays nomPays={props.match.params.id} {...props} />} />
        {/* <Route path='/admin' exact render={() => <h1>Page d'administration</h1>} /> */}
        {/* <Route render={() => <Erreur><Erreur404 /></Erreur>} /> */}
    </BrowserRouter>
  );
}

export default App;
