export var generateDungeonLevel = (cols, rows) => {
  return {type: 'GENERATE_DUNGEON_LEVEL', cols, rows};
};

export var populateLevel = (depth) => {
  return {type: 'POPULATE_LEVEL', depth};
};

export var placeCharacterStart = (character, level) => {
  return {type: 'PLACE_CHARACTER_START', character, level};
};

export var moveNorth = (character, level) => {
  return {type: 'MOVE_NORTH', character, level}
};

export var moveEast = (character, level) => {
  return {type: 'MOVE_EAST', character, level}
};

export var moveWest = (character, level) => {
  return {type: 'MOVE_WEST', character, level}
};

export var moveSouth = (character, level) => {
  return {type: 'MOVE_SOUTH', character, level}
};

export var attackMob = () => {};

export var getHpItem = () => {};

export var getEquipment = () => {};