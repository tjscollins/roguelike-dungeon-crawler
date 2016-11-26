var React = require('react');
var ReactDOM = require('react-dom');
var {Provider} = require('react-redux');
// var {Route, Router, IndexRoute, hashHistory} = require('react-router');
var Main = require('Main');
var Roguelike = require('Roguelike');

//Generate Dungeon
var map = {
  levels: [Roguelike.randomLevel(30, 30, true)]
};

var character = {
  health: 100,
  xp: 0,
  depth: 0,
  weapon: {
    name: 'Dead Fish',
    dmg: '25'
  }
};

var store = require('configureStore').configure({map, character});

//App css -- Handled by gulp now
// require('style!css!sass!applicationStyles');

//bootstrap -- Handled by gulp now
// require('bootstrap-webpack');

ReactDOM.render(
  <Provider store={store}>
  <Main/>
</Provider>, document.getElementById('app'));
