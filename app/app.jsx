var React = require('react');
var ReactDOM = require('react-dom');
var {Provider} = require('react-redux');
// var {Route, Router, IndexRoute, hashHistory} = require('react-router');
import Main from 'Main';
var actions = require('actions');

//Create Initial State
var dungeon = {
  allVisible: false,
  victory: false,
  levels: []
};

var character = {
  health: 20,
  maxHealth: 20,
  xp: 0,
  depth: 0,
  weapon: {
    name: 'Fists',
    dmg: '5'
  },
  position: [0, 0]
};

var store = require('configureStore').configure({dungeon, character});

//Generate Dungeon
store.dispatch(actions.generateDungeonLevel(75, 60));

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
