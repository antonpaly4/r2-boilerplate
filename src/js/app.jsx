import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';


class App extends React.Component {

  render() {
    return (
      <div>{this.props.children}</div>
    )
  };
}

render((
  <Router history={browserHistory}>
    <Route name='app' path='/' component={App}>

    </Route>
  </Router>
), document.getElementById('app'));