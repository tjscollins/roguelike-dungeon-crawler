import React from 'react';
import ReactDOM from 'react-dom';

/*----------Redux----------*/
import {Provider} from 'react-redux';
import * as actions from 'actions';
import {configure} from 'configureStore';

/*----------Components----------*/
import Main from 'Main';

//Create Initial State
var dungeon = {
  allVisible: false,
  victory: false,
  levels: [],
  lava: {},
  water: {}
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
var store = configure({dungeon, character});
store.dispatch(actions.generateDungeonLevel(100, 100, 0));
store.dispatch(actions.placeCharacterStart(dungeon.levels[0]));

ReactDOM.render(
  <Provider store={store}>
  <Main/>
</Provider>, document.getElementById('app'));
