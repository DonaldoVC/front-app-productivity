import React, {createContext, useState} from "react";
import {HashRouter, Switch, Route} from "react-router-dom";

import './App.css';

import Home from './containers/Home'
import Header from "./containers/Header";
import {Beforeunload} from "react-beforeunload";

// context para saber cuando se cierra la página.
export const ClosePage = createContext(false);

function App() {
  // Valor enviado a context
  const [closing, setClosing] = useState(false);

  return (
    <Beforeunload onBeforeunload={() => setClosing(true)}>
      <ClosePage.Provider value={closing}>
        <HashRouter>
          <Header/>
          <Switch>
            <Route exact path="/" name="Home" render={props => <Home {...props}/>}/>
          </Switch>
        </HashRouter>
      </ClosePage.Provider>
    </Beforeunload>
  );
}

export default App;
