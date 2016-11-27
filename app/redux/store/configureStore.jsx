var redux = require('redux');
var {dungeonReducer, characterReducer} = require('reducers');

export var configure = (initialState = {
  dungeon: {
    levels: []
  },
  character: {
    health: 100,
    xp: 0,
    depth: 0,
    weapon: {
      name: 'Dead Fish',
      dmg: '25'
    },
    position: [0, 0]
  }
}) => {
  var reducer = redux.combineReducers({dungeon: dungeonReducer, character: characterReducer});

  var store = redux.createStore(reducer, initialState, redux.compose(window.devToolsExtension
    ? window.devToolsExtension()
    : f => f));

  return store;
};
