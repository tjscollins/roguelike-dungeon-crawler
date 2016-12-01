export var generateDungeonLevel = (cols, rows, depth) => {
  return {type: 'GENERATE_DUNGEON_LEVEL', cols, rows, depth};
};

export var placeCharacterStart = (level) => {
  return {type: 'PLACE_CHARACTER_START', level};
};

export var toggleDarkness = () => {
  return {type: 'TOGGLE_DARKNESS'};
};

export var resetDungeon = () => {
  return {type: 'RESET_DUNGEON'};
};

export var moveNorth = (character, level) => {
  return {type: 'MOVE_NORTH', character, level};
};

export var moveEast = (character, level) => {
  return {type: 'MOVE_EAST', character, level};
};

export var moveWest = (character, level) => {
  return {type: 'MOVE_WEST', character, level};
};

export var moveSouth = (character, level) => {
  return {type: 'MOVE_SOUTH', character, level};
};

export var attackMob = (character, monsterPosition) => {
  return {type: 'ATTACK_MOB', character, monsterPosition};
};

export var clearPosition = (depth, monsterPosition) => {
  return {type: 'CLEAR_POSITION', depth, monsterPosition};
};

export var updateHP = (dHP) => {
  return {type: 'UPDATE_HP', dHP};
};

export var updateXP = (dXP) => {
  return {type: 'UPDATE_XP', dXP};
};

export var getEquipment = (weapon) => {
  return {type: 'GET_EQ', weapon};
};

export var updateDepth = (depth) => {
  return {type: 'UPDATE_DEPTH', depth};
};

export var resetCharacter = () => {
  return {type: 'RESET_CHARACTER'};
};
