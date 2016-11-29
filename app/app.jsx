var React = require('react');
var ReactDOM = require('react-dom');
var {Provider} = require('react-redux');
// var {Route, Router, IndexRoute, hashHistory} = require('react-router');
import Main from 'Main';
var actions = require('actions');

//Create Initial State
var dungeon = {
  levels: []
};

var character = {
  health: 20,
  xp: 0,
  depth: 0,
  weapon: {
    name: 'Dead Fish',
    dmg: '25'
  },
  position: [0, 0]
};

var store = require('configureStore').configure({dungeon, character});

//Generate Dungeon
store.dispatch(actions.generateDungeonLevel(50, 60));

//Populate Dungeon
store.dispatch(actions.populateLevel(0));

//App css -- Handled by gulp now
// require('style!css!sass!applicationStyles');

//bootstrap -- Handled by gulp now
// require('bootstrap-webpack');

ReactDOM.render(
  <Provider store={store}>
  <Main/>
</Provider>, document.getElementById('app'));
