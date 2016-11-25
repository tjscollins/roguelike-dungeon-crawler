var React = require('react');
var ReactDOM = require('react-dom');
var {Provider} = require('react-redux');
// var {Route, Router, IndexRoute, hashHistory} = require('react-router');
var Main = require('Main');

var store = require('configureStore').configure();

//App css -- Handled by gulp now
// require('style!css!sass!applicationStyles');

//bootstrap -- Handled by gulp now
// require('bootstrap-webpack');

ReactDOM.render(
  <Provider store={store}>
      <Main/>
  </Provider>
, document.getElementById('app'));
