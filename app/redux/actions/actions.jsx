export var generateDungeonLevel = (cols, rows, depth, place = true) => {
  return {type: 'GENERATE_DUNGEON_LEVEL', cols, rows, depth, place};
};

export var resetDungeon = () => {
  return {type: 'RESET_DUNGEON'};
};

export var combat = (monsterPosition) => {
  return {type: 'COMBAT', monsterPosition};
};

export var clearGridPosition = (depth, monsterPosition) => {
  return {type: 'CLEAR_GRID_POSITION', depth, monsterPosition};
};

export var toggleDarkness = () => {
  return {type: 'TOGGLE_DARKNESS'};
};

export var moveNorth = () => {
  return {type: 'MOVE_NORTH'};
};

export var moveEast = () => {
  return {type: 'MOVE_EAST'};
};

export var moveWest = () => {
  return {type: 'MOVE_WEST'};
};

export var moveSouth = () => {
  return {type: 'MOVE_SOUTH'};
};

export var getItem = (itemPosition, itemType) => {
  return {type: 'GET_ITEM', itemPosition, itemType};
};

export var updateDepth = (depth, dir) => {
  return {type: 'UPDATE_DEPTH', depth, dir};
};

export var resetCharacter = () => {
  return {type: 'RESET_CHARACTER'};
};
