/*----------Generic Helper Function----------*/
export var randomInteger = (max) => {
  return Math.ceil(Math.random() * max);
};

/*---------------Map Generation Functions------------------*/
export var randomLevel = (cols, rows, depth, shouldCreateMap) => {
  var arr = [];
  for (var i = 0; i < cols; i++) {
    arr[i] = [];
    for (var j = 0; j < rows; j++) {
      arr[i][j] = 0;
    }
  }
  if (shouldCreateMap) {
    return populate(createMap(arr), depth);
  } else {
    return {map: arr, rooms: [], boundaries: [], start: []};
  }
};

var createMap = (grid) => {
  var rooms = 0,
    type = 0;
  var level = {
    map: grid,
    rooms: [],
    boundaries: [],
    start: []
  };
  do {
    var {inProgress, type, rooms} = randomRoom(level, type, rooms);
  } while (inProgress);
  return level;
};

var randomRoom = (level, terrain, count) => {
  var direction = randomInteger(4);
  switch (direction) {
    case 1:
      direction = 'north';
      break;
    case 2:
      direction = 'east';
      break;
    case 3:
      direction = 'south';
      break;
    case 4:
      direction = 'west';
      break;
    default:
      console.error('Invalid direction');
      break;
  }
  if (count === 0) {
    // console.log('Creating initial Room');
    //If No rooms, add starting room, update parameters and return
    addRoom(level, null, 0);
    count = 100;
    var nextTerrain = randomInteger(5);
    return {inProgress: true, type: nextTerrain, rooms: count};
  } else {
    var choice = count
      ? itFits(level, direction, 1)
      : false;
    if (choice) {
      //If the new room will fit in that direction, add it and then go to add the next new room.
      // console.log('It fits!');
      addRoom(level, choice, 1);
      count--;
      // randomRoom(grid, Math.ceil(Math.random() * 5), ++rooms);
      return {inProgress: count, type: nextTerrain, rooms: count};
    } else {
      //try again
      count--;
      // console.log('It doesn\'t fit!');
      // randomRoom(grid, Math.ceil(Math.random() * 5), rooms);
      return count > 0
        ? {
          inProgress: true,
          type: nextTerrain,
          rooms: count
        }
        : {
          inProgress: false,
          type: nextTerrain,
          rooms: count
        };
    }
  }
};

var itFits = (level, direction, terrain) => {
  //Checking to see if TERRAIN feature will fit in that DIRECTION on the LEVEL
  var {map, boundaries} = level;
  //Filter boundaries to keep only appropriate DIRECTION
  var bounds = boundaries.filter((cell) => {
    return cell[2] === direction;
  });
  // console.log('Correct directions', bounds);
  //The largest possible TERRAIN feature is 6x6, so we check 7x7 squares beyond each boundary, filtering out the ones that do not have space.
  var possibleChoices = bounds.filter((cell) => {
    //Need to know which direction to look in first
    switch (direction) {
      case 'north':
        var success;
        var posY = Math.max(0, cell[1] - 7);
        for (var posX = Math.max(0, cell[0] - 7); posX < cell[0]; posX++) {
          success = true;
          for (var i = posX; i < Math.min(map.length, posX + 7); i++) {
            for (var j = posY; j < posY + 7; j++) {
              if (map[i][j] !== 0) {
                // console.log(i, j);
                success = false;
                j = posY + 7;
              }
            }
            if ((i === posX + 6) && success) {
              // console.log('Success');
              posX = cell[0];
            }
          }
        }
        // console.log(success);
        return success
          ? true
          : false;
      case 'east':
        var success;
        // console.log('Boundary Cell: ', cell[0], cell[1]);
        var posX = Math.max(0, cell[0] - 7);
        for (var posY = Math.max(0, cell[1] - 7); posY < cell[1]; posY++) {
          success = true;
          // console.log(level, posX, posY);
          for (var i = posX; i < posX + 7; i++) {
            for (var j = posY; j < posY + 7; j++) {
              if (map[i][j] !== 0) {
                // console.log(i, j);
                success = false;
                j = posY + 7;
              }
            }
            if ((i === posX + 6) && success) {
              // console.log('Success');
              posY = cell[1];
            }
          }
        }
        // console.log('Success', success);
        return success
          ? true
          : false;
      case 'south':
        var success;
        var posY = Math.max(0, cell[1] + 1);
        for (var posX = Math.max(0, cell[0] - 7); posX < cell[0]; posX++) {
          success = true;
          for (var i = posX; i < Math.min(map.length, posX + 7); i++) {
            for (var j = posY; j < posY + 7; j++) {
              if (map[i][j] !== 0) {
                // console.log(i, j);
                success = false;
                j = posY + 7;
              }
            }
            if ((i === posX + 6) && success) {
              // console.log('Success');
              posX = cell[0];
            }
          }
        }
        // console.log(success);
        return success
          ? true
          : false;
      case 'west':
        var success;
        // console.log('Boundary Cell: ', cell[0], cell[1]);
        var posX = Math.min(map.length, cell[0] + 2);
        for (var posY = Math.max(0, cell[1] - 7); posY < cell[1]; posY++) {
          success = true;
          for (var i = posX; i < Math.min(map.length, posX + 7); i++) {
            for (var j = posY; j < posY + 7; j++) {
              if (map[i][j] !== 0) {
                success = false;
                j = posY + 7;
              }
            }
            if ((i === posX + 6) && success) {
              posY = cell[1];
            }
          }
        }
        return success
          ? true
          : false;
      default:
    }
  });
  if (possibleChoices.length > 0) {
    var choice = randomInteger(possibleChoices.length) - 1;
    return possibleChoices[choice];
  } else {
    return false;
  }
};

var addRoom = (level, choice, type) => {
  var {map, rooms, boundaries, start} = level;
  var posX = randomInteger(map.length);
  var posY = randomInteger(map[0].length);

  var width = randomInteger(3) + 3;
  var height = randomInteger(3) + 3;
  switch (type) {
    case 0:
      //Starting room
      //Check position if it goes off grid
      if (posX + width >= map.length) {
        posX = map.length - width - 1;
      }
      if (posY + height >= map[0].length) {
        posY = map[0].length - height - 1;
      }
      rooms.push([posX, posY, width, height]);
      //Create Room
      var startSet = false;
      for (var i = posX; i < posX + width; ++i) {
        for (var j = posY; j < posY + height; ++j) {
          var bound = boundary(posX, posY, width, height, i, j);
          if (bound) {
            boundaries.push(bound);
          }
          if (i !== posX && i !== (posX + width) && j !== posY && j !== (posY + height) && !startSet) {
            map[i][j] = 10;
            start.push(i);
            start.push(j);
            startSet = true;
          } else {
            map[i][j] = 1;
          }
        }
      }
      if (!startSet) {
        // console.error(startSet);
        throw new Error('Starting position not set properly');
      } else {
        // console.log('Start set at', start);
        // console.log('map value is', map[start[0]][start[1]]);
      }
      break;
    case 1:
      // Random Rectangle Room, up to 6x6
      switch (choice[2]) {
        case 'north':
          var x = choice[0],
            y = choice[1];
          posX = x - 1;
          posY = y - height - 1;
          //Check position if it goes off grid
          if (posX + width >= map.length) {
            width = map.length - posX - 1;
          }
          if (posY + height >= map[0].length) {
            height = map[0].length - posY - 1;
          }
          level.rooms.push([posX, posY, width, height]);
          level.map[x][y - 1] = 8;
          boundaries = boundaries.filter((cell) => {
            return cell[0] !== x || cell[1] !== y - 1;
          });
          for (var j = 2; j <= height + 1; ++j) {
            for (var i = -1; i <= width - 2; ++i) {
              level.map[x + i][y - j] = 1;
              var bound = boundary(posX, posY, width, height, x + i, y - j);
              if (bound) {
                level.boundaries.push(bound);
              }
            }
          }
          break;
        case 'east':
          var x = choice[0],
            y = choice[1];
          posX = x - width - 1;
          posY = y - 1;
          //Check position if it goes off grid
          if (posX + width >= map.length) {
            width = map.length - posX - 1;
          }
          if (posY + height >= map[0].length) {
            height = map[0].length - posY - 1;
          }
          level.rooms.push([posX, posY, width, height]);
          level.map[x - 1][y] = 8;
          for (var j = -1; j <= height - 1; ++j) {
            for (var i = 2; i <= width + 1; ++i) {
              level.map[x - i][y + j] = 1;
              var bound = boundary(posX, posY, width, height, x - i, y + j);
              if (bound) {
                level.boundaries.push(bound);
              }
            }
          }
          boundaries = boundaries.filter((cell) => {
            if ((cell[0] === x || cell[0] === x - 2) && cell[1] === y) {
              return false;
            } else {
              return true;
            }
          });
          break;
        case 'south':
          var x = choice[0],
            y = choice[1];
          posX = x - 1;
          posY = y + 2;
          //Check position if it goes off grid
          if (posX + width >= map.length) {
            width = map.length - posX - 1;
          }
          if (posY + height >= map[0].length) {
            height = map[0].length - posY - 1;
          }
          level.rooms.push([posX, posY, width, height]);
          level.map[x][y + 1] = 8;
          boundaries = boundaries.filter((cell) => {
            return cell[0] !== x || cell[1] !== y + 1;
          });
          for (var j = 2; j <= height + 1; ++j) {
            for (var i = -1; i <= width - 2; ++i) {
              level.map[x + i][y + j] = 1;
              var bound = boundary(posX, posY, width, height, x + i, y + j);
              if (bound) {
                level.boundaries.push(bound);
              }
            }
          }
          break;
        case 'west':
          var x = choice[0],
            y = choice[1];
          posX = x + 2;
          posY = y - 1;
          //Check position if it goes off grid
          if (posX + width >= map.length) {
            width = map.length - posX - 1;
          }
          if (posY + height >= map[0].length) {
            height = map[0].length - posY - 1;
          }
          level.rooms.push([posX, posY, width, height]);
          level.map[x + 1][y] = 8;
          for (var j = -1; j <= height - 1; ++j) {
            for (var i = 2; i <= width + 1; ++i) {
              level.map[x + i][y + j] = 1;
              var bound = boundary(posX, posY, width, height, x + i, y + j);
              if (bound) {
                level.boundaries.push(bound);
              }
            }
          }
          boundaries = boundaries.filter((cell) => {
            if ((cell[0] === x || cell[0] === x + 2) && cell[1] === y) {
              return false;
            } else {
              return true;
            }
          });
          break;
        default:
      }
      break;
    case 2:
      break;
    case 3:
      break;
    case 4:
      break;
    case 5:
      break;
    default:
      break;
  }
};

var boundary = (X, Y, w, h, i, j) => {
  if (j === Y) {
    return [i, j, 'north'];
  } else if (j === Y + h) {
    return [i, j, 'south'];
  } else if (i === X) {
    return [i, j, 'east'];
  } else if (i === X + w - 1) {
    return [i, j, 'west'];
  } else {
    return null;
  }
};

var populate = (dLevel, depth) => {
  // console.log('Populating', dLevel, depth);
  var {map, boundaries, rooms, start} = dLevel;
  // console.log(map, boundaries, rooms);
  var monsters = [],
    healthItems = [],
    weapon = {};
  var width = map.length;
  var height = map[0].length;
  var bossLevel = true;
  // depth > 2
  //   ? randomInteger(2) > 1
  //     ? true
  //     : false
  //   : false;
  var supply = bossLevel
    ? ['boss', 'weapon']
    : ['downstairs', 'weapon'];
  var mob = randomInteger(10) + 10,
    hpItem = randomInteger(6) + 3,
    lava = randomInteger(20) + 10,
    water = randomInteger(20) + 10;
  while (mob) {
    supply.push('mob');
    mob--;
  }
  while (hpItem) {
    supply.push('hpItem');
    hpItem--;
  }
  while (lava) {
    supply.push('lava');
    lava--;
  }
  while (water) {
    supply.push('water');
    water--;
  }
  for (var i = 0; i < width; ++i) {
    for (var j = 0; j < height; ++j) {
      if (map[i][j] === 1) {
        var choice = randomInteger(width * height) - 1;
        if (choice < supply.length) {
          switch (supply[choice]) {
            case 'downstairs':
              map[i][j] = 9;
              dLevel.end = [i, j];
              break;
            case 'weapon':
              var name = weaponName(depth);
              var dmg = randomInteger(5) + (depth + 1) * 8;
              var position = [i, j];
              weapon = {
                name,
                dmg,
                position
              };
              // console.log('Weapon', weapon, depth);
              map[i][j] = 6;
              break;
            case 'mob':
              var level = randomInteger(3) * depth + 1;
              var exp = level * 10;
              var hp = level * 5;
              var dmg = level * 2;
              var position = [i, j];
              monsters.push({level, exp, hp, dmg, position});
              map[i][j] = 4;
              break;
            case 'hpItem':
              var value = randomInteger(10) * depth + 10;
              var position = [i, j];
              healthItems.push({value, position});
              map[i][j] = 5;
              break;
            case 'lava':
              map[i][j] = 3;
              break;
            case 'water':
              map[i][j] = 2;
              break;
            case 'boss':
              var level = randomInteger(5) * depth + 1;
              var exp = level * 25;
              var hp = level * 10;
              var dmg = level * 4;
              var position = [i, j];
              map[i][j] = 11;
              dLevel.end = [i, j];
              monsters.push({level, exp, hp, dmg, position});
              break;
            default:
          }
          supply.splice(choice, 1);
        }
      }
    }
    if (i === width - 1 && supply.length > 0) {
      i = 0;
    }
  }
  return {
    map,
    boundaries,
    rooms,
    monsters,
    healthItems,
    weapon,
    start
  };
};

var weaponName = (depth) => {
  switch (depth) {
    case 0:
      return 'Brass Knuckles';
    case 1:
      return 'Shiny Dagger';
    case 2:
      return 'Fearsome Mace';
    case 3:
      return 'Rusty Shiv';
    case 4:
      return 'Red Herring';
    case 5:
      return 'Tire Iron of Great Justice';
    case 6:
      return 'Zed\'s Katana';
  }
};

/*----------------------Game Mechanics Functions---------------------------*/

export var combat = (state, monsterPosition) => {
  var {dungeon, character} = state;
  var {weapon, depth, health, xp} = character;
  var {monsters} = dungeon.levels[depth];

  var enemy = monsters.filter((mob) => {
    return mob.position[0] === monsterPosition[0] && mob.position[1] === monsterPosition[1];
  });
  if (enemy.length !== 1)
    throw new Error('Error finding enemy: No enemies found.');

  var {hp, exp, dmg} = enemy[0];
  var index = monsters.indexOf(enemy[0]);

  //Begin Rounds of Attack and Defense
  var newHP = hp,
    newHealth = health;
  while (newHP > 0 && newHealth > 0) {
    //Player attacks the monster
    newHP -= Math.max(0, weapon.dmg - 5 + randomInteger(10));
    if (newHP > 0) {
      //Monster attacks the Player
      //Player's level acts as Damage Reduction
      newHealth -= Math.max(0, dmg + randomInteger(10) - character.level);
    }
  }

  if (newHP > 0) {
    return {
      ...state,
      dungeon: {
        ...state.dungeon,
        levels: state.dungeon.levels.slice(0, depth).concat([
          {
            ...state.dungeon.levels[depth],
            monsters: monsters.slice(0, index).concat([
              {
                ...enemy[0],
                hp
              }
            ]).concat(monsters.slice(index + 1))
          }
        ]).concat(state.dungeon.levels.slice(depth + 1))
      },
      character: {
        ...state.character,
        health: newHealth
      }
    };
  } else {
    var newMaxHealth,
      newLevel;
    if (Math.floor((xp + exp) / 100 + 1) > character.level) {
      newLevel = character.level + 1;
      newMaxHealth = character.maxHealth + 10;
      newHealth = newMaxHealth;
    } else {
      newLevel = character.level;
      newMaxHealth = character.maxHealth;
    }
    return {
      ...state,
      dungeon: {
        ...state.dungeon,
        levels: state.dungeon.levels.slice(0, depth).concat([
          {
            ...state.dungeon.levels[depth],
            monsters: monsters.slice(0, index).concat(monsters.slice(index + 1))
          }
        ]).concat(state.dungeon.levels.slice(depth + 1))
      },
      character: {
        ...state.character,
        health: newHealth,
        level: newLevel,
        maxHealth: newMaxHealth,
        xp: xp + exp
      }
    };
  }
};

export var randomLava = () => {
  var int = randomInteger(3);
  switch (int) {
    case 1:
      return {title: 'A volcanic eruption!', text: 'The fires of this mountain are legendary--and so are the burns you received when the floor melted beneath your feet and gave way to liquid-hot magma.'};
    case 2:
      return {title: 'Just Jump!', text: '"It\'s not much bigger than the fesetival mudpits back home," you tried to tell yourself.  "Just Jump!"  And so you did.  It will take powerful magic to heal these scars now.'};
    case 3:
      return {title: 'Virgins Only', text: 'The fire gods are fickle, and dislike the taste of impure flesh.  Fortunately they have spit you back out again, much less than you were.'};
  };
};

export var randomWater = () => {
  var int = randomInteger(3)
  switch (int) {
    case 1:
      return {title: 'A sinkhole opens up!', text: 'Unprepared for the sudden dip you find yourself weakened by the cold, deathly chill of the water.  You climb out, but you know you\'ll be less effective in combat...'};
    case 2:
      return {title: 'Man-eating Piranhas!', text: 'The puddle looked safe enough, but as you swim across it you realize you are not alone.  You survive the pesky little nibblers, but the bleeding wounds they left behind are sure to attract the monsters in the dark...'};
    case 3:
      return {title: 'Cenote', text: 'The deep, dark water looked refreshing, until you noticed the piles of bones at the bottom and the sacrifical altar on the shore. Shaken and afraid, you clamber out the other side, unready for what lies ahead in the dark...'};
  }
};
