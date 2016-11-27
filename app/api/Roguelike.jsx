export var randomLevel = (cols, rows, shouldCreateMap) => {
  var arr = [];
  for (var i = 0; i < cols; i++) {
    arr[i] = [];
    for (var j = 0; j < rows; j++) {
      arr[i][j] = 0;
    }
  }
  if (shouldCreateMap) {
    return createMap(arr);
  } else {
    return {map: arr, rooms: [], boundaries: []};
  }
};

var createMap = (grid) => {
  var rooms = 0,
    type = 0;
  var level = {
    map: grid,
    rooms: [],
    boundaries: []
  };
  do {
    // console.log('Creating room with', grid, type, rooms);
    var {inProgress, type, rooms} = randomRoom(level, type, rooms);
    // console.log('InProgress', inProgress, type, rooms);
    // console.log(level);
  } while (inProgress);
  return level;
};

var randomRoom = (level, terrain, count) => {
  var direction = Math.ceil(Math.random() * 4);
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
    count = 75;
    var nextTerrain = Math.ceil(Math.random() * 5);
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
  var {map, rooms, boundaries} = level;
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
        var success = undefined;
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
          // console.log(level, posX, posY);
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
              posY = cell[1];
            }
          }
        }
        // console.log('Success', success);
        return success
          ? true
          : false;
      default:
    }
  });
  if (possibleChoices.length > 0) {
    // console.log('Possible choices', possibleChoices);
    var choice = Math.ceil(Math.random() * possibleChoices.length) - 1;
    return possibleChoices[choice];
  } else {
    return false;
  }
};

var addRoom = (level, choice, type) => {
  var {map, rooms, boundaries} = level;
  var posX = Math.ceil(Math.random() * map.length);
  var posY = Math.ceil(Math.random() * map[0].length);

  var width = Math.ceil(Math.random() * 3) + 3;
  var height = Math.ceil(Math.random() * 3) + 3;
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
      // console.log('Adding room of ' + width + 'x' + height + ' at ' + posX + 'x' + posY);
      var startSet = false;
      for (var i = posX; i < posX + width; ++i) {
        for (var j = posY; j < posY + height; ++j) {
          var bound = boundary(posX, posY, width, height, i, j);
          if (bound) {
            boundaries.push(bound)
          }
          map[i][j] = i > posX && i < posX + width && j > posY && j < posY + height && !startSet
            ? 10
            : 1;
          if (map[i][j] === 10) {
            startSet = true;
          }
        }
      }
      break;
    case 1:
      // Random Rectangle Room, up to 6x6
      // console.log(level.map, choice);
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
          level.map[x][y - 1] = 1;
          boundaries = boundaries.filter((cell) => {
            return cell[0] !== x || cell[1] !== y - 1;
          });
          for (var j = 2; j <= height + 1; ++j) {
            for (var i = -1; i <= width - 2; ++i) {
              level.map[x + i][y - j] = 1;
              var bound = boundary(posX, posY, width, height, x + i, y - j);
              if (bound) {
                level.boundaries.push(bound)
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
          level.map[x - 1][y] = 1;
          for (var j = -1; j <= height - 1; ++j) {
            for (var i = 2; i <= width + 1; ++i) {
              level.map[x - i][y + j] = 1;
              var bound = boundary(posX, posY, width, height, x - i, y + j);
              if (bound) {
                level.boundaries.push(bound)
                // console.log('Adding boundary', bound);
              }
            }
          }
          boundaries = boundaries.filter((cell) => {
            if ((cell[0] == x || cell[0] == x - 2) && cell[1] === y) {
              // console.log('Removing boundary', cell);
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
          level.map[x][y + 1] = 1;
          boundaries = boundaries.filter((cell) => {
            return cell[0] !== x || cell[1] !== y + 1;
          });
          for (var j = 2; j <= height + 1; ++j) {
            for (var i = -1; i <= width - 2; ++i) {
              level.map[x + i][y + j] = 1;
              var bound = boundary(posX, posY, width, height, x + i, y + j);
              if (bound) {
                level.boundaries.push(bound)
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
          level.map[x + 1][y] = 1;
          for (var j = -1; j <= height - 1; ++j) {
            for (var i = 2; i <= width + 1; ++i) {
              level.map[x + i][y + j] = 1;
              var bound = boundary(posX, posY, width, height, x + i, y + j);
              if (bound) {
                level.boundaries.push(bound)
                // console.log('Adding boundary', bound);
              }
            }
          }
          boundaries = boundaries.filter((cell) => {
            if ((cell[0] == x || cell[0] == x + 2) && cell[1] === y) {
              // console.log('Removing boundary', cell);
              return false;
            } else {
              return true;
            }
          });
          break;
        default:
      }

    case 2:
    case 3:
    case 4:
    case 5:
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
    // console.error('Invalid boundary cell');
    return null;
  }
};
