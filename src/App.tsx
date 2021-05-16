import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';
import Gomoku from './layouts/gomoku';
import WelcomeScreen from './layouts/welcome-screen';
import { GOMOKU_PATH, HOME_PATH } from './common/constants';

interface AppProps {
  history: History;
}

function App(props: AppProps) {
  return (
    <ConnectedRouter history={props.history}>
      <Switch>
        <Route path={`${GOMOKU_PATH}/:id`} component={Gomoku} />
        <Route path={HOME_PATH} component={WelcomeScreen} />
      </Switch>
    </ConnectedRouter>
  );
}

export default App;
