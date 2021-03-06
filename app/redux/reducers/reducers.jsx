import * as Roguelike from 'Roguelike';

var initialDungeon = {
  allVisible: false,
  victory: false,
  levels: [],
  lava: {},
  water: {}
};

var initialCharacter = {
  health: 20,
  maxHealth: 20,
  level: 1,
  xp: 0,
  depth: 0,
  weapon: {
    name: 'Fists',
    dmg: 5
  },
  position: [0, 0]
};

export var reducer = (state = {
  dungeon: initialDungeon,
  character: initialCharacter
}, action) => {
  switch (action.type) {
    case 'GENERATE_DUNGEON_LEVEL':
      //Generate and populate a random dungeon level
      //if(place), then place the player at the start point for
      //this new level.
      var {dungeon, character} = state;
      var {cols, rows, depth, place} = action;
      console.log('creating new dungone with  action', action);
      var newLevel = Roguelike.randomLevel(cols, rows, depth, true);
      if (place) {
        console.log('Placing character at depth: ', depth, ' and position: ', newLevel.start);
        return {
          ...state,
          character: {
            ...character,
            depth,
            position: newLevel.start
          },
          dungeon: {
            ...dungeon,
            levels: [
              ...dungeon.levels,
              newLevel
            ]
          }
        };
      } else {
        return {
          ...state,
          dungeon: {
            ...dungeon,
            levels: [
              ...dungeon.levels,
              newLevel
            ]
          }
        };
      }
    case 'RESET_DUNGEON':
      return {
        ...state,
        dungeon: initialDungeon
      };
    case 'COMBAT':
      return Roguelike.combat(state, action.monsterPosition);
    case 'CLEAR_GRID_POSITION':
      var {depth, monsterPosition} = action;
      var {map} = state.dungeon.levels[depth];
      var [x,
        y] = monsterPosition;
      // console.log('[x,y]', x, y);
      return {
        ...state,
        dungeon: {
          ...state.dungeon,
          levels: state.dungeon.levels.slice(0, depth).concat({
            ...state.dungeon.levels[depth],
            map: map.slice(0, x).concat([map[x].slice(0, y).concat([1]).concat(map[x].slice(y + 1))]).concat(map.slice(x + 1))
          })
        }
      };
    case 'TOGGLE_DARKNESS':
      return {
        ...state,
        dungeon: {
          ...state.dungeon,
          allVisible: !state.dungeon.allVisible
        }
      };
    case 'MOVE_NORTH':
      var {depth, position} = state.character;
      var {map} = state.dungeon.levels[depth];
      var [x,
        y] = position;
      var newPosition = y > 0 && map[x][y - 1] !== 0
        ? [
          x, y - 1
        ]
        : [x, y];
      return {
        ...state,
        character: {
          ...state.character,
          position: newPosition
        }
      };
    case 'MOVE_SOUTH':
      var {depth, position} = state.character;
      var {map} = state.dungeon.levels[depth];
      var [x,
        y] = position;
      var newPosition = y < map[0].length && map[x][y + 1] !== 0
        ? [
          x, y + 1
        ]
        : [x, y];
      return {
        ...state,
        character: {
          ...state.character,
          position: newPosition
        }
      };
    case 'MOVE_EAST':
      var {depth, position} = state.character;
      var {map} = state.dungeon.levels[depth];
      var [x,
        y] = position;
      var newPosition = x < map.length && map[x + 1][y] !== 0
        ? [
          x + 1,
          y
        ]
        : [x, y];
      return {
        ...state,
        character: {
          ...state.character,
          position: newPosition
        }
      };
    case 'MOVE_WEST':
      var {depth, position} = state.character;
      var {map} = state.dungeon.levels[depth];
      var [x,
        y] = position;
      var newPosition = x > 0 && map[x - 1][y] !== 0
        ? [
          x - 1,
          y
        ]
        : [x, y];
      return {
        ...state,
        character: {
          ...state.character,
          position: newPosition
        }
      };
    case 'GET_ITEM':
      var {itemPosition, itemType} = action;
      var {depth, health, maxHealth} = state.character;
      var {map, weapon, healthItems} = state.dungeon.levels[depth];
      switch (itemType) {
        case 'weapon':
          if (weapon.dmg > state.character.weapon.dmg) {
            return {
              ...state,
              character: {
                ...state.character,
                weapon
              }
            };
          } else {
            return state;
          }
        case 'healthPotion':
          var item = healthItems.filter((potion) => {
            return potion.position[0] === itemPosition[0] && potion.position[1] === itemPosition[1];
          })[0];
          return {
            ...state,
            character: {
              ...state.character,
              health: Math.min(maxHealth, health + item.value)
            }
          };
        default:
          throw new Error('Error Getting Item: Unknown itemType');
      }
    case 'FALL_INTO_WATER':
      var {health, weapon} = state.character;
      return {
        ...state,
        dungeon: {
          ...state.dungeon,
          water: Roguelike.randomWater()
        },
        character: {
          ...state.character,
          health: health - 5,
          weapon: {
            ...weapon,
            dmg: weapon.dmg - 1
          }
        }
      };
    case 'FALL_INTO_LAVA':
      var {health} = state.character;
      return {
        ...state,
        dungeon: {
          ...state.dungeon,
          lava: Roguelike.randomLava()
        },
        character: {
          ...state.character,
          health: health - 50,
          weapon: {
            name: 'Fists',
            dmg: 2
          }
        }
      };
    case 'UPDATE_DEPTH':
      var {character, dungeon} = state;
      var {depth, dir} = action;
      switch (dir) {
        case 'up':
          return {
            ...state,
            character: {
              ...character,
              depth,
              position: dungeon.levels[depth].end
            }
          };
        case 'down':
          return {
            ...state,
            character: {
              ...character,
              depth,
              position: dungeon.levels[depth].start
            }
          };
        default:
          throw new Error('Error updated depth: Unknown direction');
      }
    case 'RESET_CHARACTER':
      return {
        ...state,
        character: initialCharacter
      };
  }
};

export default reducer;
