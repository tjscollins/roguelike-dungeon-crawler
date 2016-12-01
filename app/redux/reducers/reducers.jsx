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
      return Roguelike.populate(state, action.depth);
    case 'ATTACK_MOB':
      return Roguelike.attackMob(state, action.character, action.monsterPosition);
    case 'REMOVE_DEAD_MOB':
      var {depth, monsterPosition} = action;
      var {map} = state.levels[depth];
      var x = monsterPosition[0],
        y = monsterPosition[1];
      return {
        ...state,
        levels: state.levels.slice(0, depth).concat({
          ...state.levels[depth],
          map: map.slice(0, x).concat([map[x].slice(0, y).concat([1]).concat(map[x].slice(y + 1))]).concat(map.slice(x + 1))
        })
      };
    case 'TOGGLE_DARKNESS':
      return {
        ...state,
        allVisible: !state.allVisible
      };
    case 'RESET_DUNGEON':
      return {allVisible: false, victory: false, levels: []};
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
      var position = x < action.level.map.length && action.level.map[x + 1][y] !== 0
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
    case 'UPDATE_HP':
      var {health, maxHealth} = state;
      var newHealth = health + action.dHP;
      return {
        ...state,
        health: newHealth > maxHealth
          ? maxHealth
          : newHealth
      };
    case 'UPDATE_XP':
      var {health, xp, maxHealth} = state;
      // console.log(health, xp, action.dXP);
      if (Math.floor(xp / 100) < Math.floor((xp + action.dXP) / 100)) {
        health = (Math.floor((xp + action.dXP) / 100) + 1) * 20;
        maxHealth = health;
      }
      xp = xp + action.dXP;
      return {
        ...state,
        xp,
        health,
        maxHealth
      };
    case 'GET_EQ':
      if (action.weapon.dmg > state.weapon.dmg) {
        return {
          ...state,
          weapon: action.weapon
        };
      } else {
        return state;
      }
    case 'UPDATE_DEPTH':
      return {
        ...state,
        depth: action.depth
      };
    case 'RESET_CHARACTER':
      return {
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
    default:
      return state;
  }
};
