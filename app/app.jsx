var React = require('react');
var ReactDOM = require('react-dom');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');

var Main = require('Main');

//App css
require('style!css!sass!applicationStyles');

//bootstrap
require('bootstrap-webpack');

ReactDOM.render(
  <Main/>, document.getElementById('app'));
