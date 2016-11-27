export var generateDungeonLevel = (cols, rows) => {
  return {type: 'GENERATE_DUNGEON_LEVEL', cols, rows};
};

export var populateLevel = (depth) => {
  return {type: 'POPULATE_LEVEL', depth};
};

export var placeCharacter = (character, level) => {
  return {type: 'PLACE_CHARACTER', character, level};
};

export var moveNorth = () => {};

export var moveEast = () => {};

export var moveWest = () => {};

export var moveSouth = () => {};

export var attackMob = () => {};

export var getHpItem = () => {};

export var getEquipment = () => {};
