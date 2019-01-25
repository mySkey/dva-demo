import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import dynamic from 'dva/dynamic';

function RouterConfig({ history, app }) {
  const routes = [
    { path: '/', name: 'home', component: ()=>import('./routes/home/IndexPage') },
    { path: '/detail', name: 'detail', component: () => import('./routes/detail/Detail') },
  ]
  return (
    <Router history={history}>
      <Switch>
        {
          routes.map(({path, name, component}) => {
            return(
              <Route path={path} key={name} exact component={dynamic({ app, models:[], component })} />
            )
          })
        }
      </Switch>
    </Router>
  );
}

export default RouterConfig;
