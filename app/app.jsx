var React = require('react');
var ReactDOM = require('react-dom');
var {Provider} = require('react-redux');

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

//Generate 1st Level of Dungeon
store.dispatch(actions.generateDungeonLevel(100, 100, 0));
store.dispatch(actions.placeCharacterStart(store.getState().dungeon.levels[0]));

ReactDOM.render(
  <Provider store={store}>
  <Main/>
</Provider>, document.getElementById('app'));
