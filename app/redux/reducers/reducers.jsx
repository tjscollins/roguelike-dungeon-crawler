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
    case 'PLACE_CHARACTER_START':
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
    case 'MOVE_NORTH':
      var x = action.character.position[0],
        y = action.character.position[1];
      var position = y > 0 && action.level.map[x][y - 1] !== 0
        ? [
          x, y - 1
        ]
        : [x, y];
      return {
        ...action.character,
        position
      };
    case 'MOVE_SOUTH':
      var x = action.character.position[0],
        y = action.character.position[1];
      var position = y < action.level.map[0].length && action.level.map[x][y + 1] !== 0
        ? [
          x, y + 1
        ]
        : [x, y];
      return {
        ...action.character,
        position
      };
    case 'MOVE_EAST':
      var x = action.character.position[0],
        y = action.character.position[1];
      var position = y < action.level.map.length && action.level.map[x + 1][y] !== 0
        ? [
          x + 1,
          y
        ]
        : [x, y];
      return {
        ...action.character,
        position
      };
    case 'MOVE_WEST':
      var x = action.character.position[0],
        y = action.character.position[1];
      var position = x > 0 && action.level.map[x - 1][y] !== 0
        ? [
          x - 1,
          y
        ]
        : [x, y];
      return {
        ...action.character,
        position
      };
    default:
      return state;
  }
};
