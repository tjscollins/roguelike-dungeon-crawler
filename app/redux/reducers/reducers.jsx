var Roguelike = require('Roguelike');

export var mapReducer = (state = {}, action) => {
  switch (action.type) {
    case 'GENERATE_DUNGEON_LEVEL':
      return {
        ...state,
        levels: [
          ...state.levels,
          Roguelike.randomLevel(action.cols, action.rows, true)
        ]
      };
    default:
      return state;
  }
};

export var characterReducer = (state = {}, action) => {
  switch (action.type) {
    case 'EAT_HP_POTION':
      return state;
    default:
      return state;
  }
};
