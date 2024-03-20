import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import Item from "./Item";
import List from "./List";

const App = () => {
  return (
    <>
      <HashRouter>
        <Switch>
          <Route exact path="/" component={List}/>
          <Route exact path="/info/:id" component={Item}/>
        </Switch>
      </HashRouter>
    </>
  );
};

export default App;
