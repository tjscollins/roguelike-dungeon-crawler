var React = require('react');
var ReactDOM = require('react-dom');
var {Provider} = require('react-redux');
// var {Route, Router, IndexRoute, hashHistory} = require('react-router');
var Main = require('Main');

var store = require('configureStore').configure();

//App css
// require('style!css!sass!applicationStyles');

//bootstrap
// require('bootstrap-webpack');

ReactDOM.render(
  <Provider store={store}>
      <Main/>
  </Provider>
, document.getElementById('app'));
