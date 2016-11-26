var redux = require('redux');
var {mapReducer} = require('reducers');

export var configure = (initialState = {
  map: {
    levels: []
  }
}) => {
  var reducer = redux.combineReducers({map: mapReducer});

  var store = redux.createStore(reducer, initialState, redux.compose(window.devToolsExtension
    ? window.devToolsExtension()
    : f => f));

  return store;
};
