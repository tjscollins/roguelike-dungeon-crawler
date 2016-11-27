var Roguelike = require('Roguelike');

export var dungeonReducer = (state = {}, action) => {
  switch (action.type) {
    case 'GENERATE_DUNGEON_LEVEL':
      return {
        ...state,
        levels: [
          ...state.levels,
          Roguelike.randomLevel(action.cols, action.rows, true)
        ]
      };
    case 'POPULATE_LEVEL':
      var {levels} = state;
      return {
        ...state,
        levels: levels.map((val, i, arr) => {
          if (i === action.depth) {
            return {
              ...val,
              map: Roguelike.populate(val.map)
            };
          } else {
            return val;
          }
        })
      };
    default:
      return state;
  }
};

export var characterReducer = (state = {}, action) => {
  switch (action.type) {
    case 'PLACE_CHARACTER':
      var w = action.level.map.length,
        h = action.level.map[0].length,
        x = 0,
        y = 0;
      for (var i = 0; i < w; i++) {
        for (var j = 0; j < h; j++) {
          if (action.level.map[i][j] === 10) {
            x = i;
            y = j;
          }
        }
      }
      return {
        ...state,
        position: [x, y]
      };
    default:
      return state;
  }
};
