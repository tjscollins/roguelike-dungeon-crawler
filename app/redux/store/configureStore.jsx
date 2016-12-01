var redux = require('redux');
var {dungeonReducer, characterReducer} = require('reducers');
import thunk from 'redux-thunk';

export var configure = (initialState = {
  dungeon: {
    allVisible: false,
    victory: false,
    levels: []
  },
  character: {
    health: 20,
    maxHealth: 20,
    xp: 0,
    depth: 0,
    weapon: {
      name: 'Fists',
      dmg: '5'
    },
    position: [0, 0]
  }
}) => {
  var reducer = redux.combineReducers({dungeon: dungeonReducer, character: characterReducer});

  var store = redux.createStore(reducer, initialState, redux.compose(redux.applyMiddleware(thunk), window.devToolsExtension
    ? window.devToolsExtension()
    : f => f));

  return store;
};
