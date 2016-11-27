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
      // console.log('POPULATE_LEVEL', levels);
      return {
        ...state,
        levels: levels.map((val, i, arr) => {
          if (i === action.depth) {
            // console.log(val);
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
    case 'MOVE_NORTH':
      return state;
    default:
      return state;
  }
};
