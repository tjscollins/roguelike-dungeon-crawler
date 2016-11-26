var redux = require('redux');
var {mapReducer, characterReducer} = require('reducers');

export var configure = (initialState = {
  map: {
    levels: []
  }
}) => {
  var reducer = redux.combineReducers({map: mapReducer, character: characterReducer});

  var store = redux.createStore(reducer, initialState, redux.compose(window.devToolsExtension
    ? window.devToolsExtension()
    : f => f));

  return store;
};
