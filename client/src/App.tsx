import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/homepage/Home';
import FighterStatsTwo from "./components/fighterStatsPage/FighterStatsTwo"
import { RecoilRoot } from 'recoil';

const App: React.FunctionComponent = () => {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <React.Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/fighter/:id" component={FighterStatsTwo} exact />
          </Switch>
        </React.Suspense>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
