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
        return arr;
    }
};

var createMap = (grid) => {
    var rooms = 0,
        type = 0;
    do {
        // console.log('Creating room with', grid, type, rooms);
        var {inProgress, type, rooms} = randomRoom(grid, type, rooms);
        // console.log('InProgress', inProgress, type, rooms);
    } while (inProgress);
    return grid;
};

var randomRoom = (grid, terrain, count) => {
    var direction = Math.ceil(Math.random() * 4);
    if (count === 0) {
        // console.log('Creating initial Room');
        //If No rooms, add starting room, update parameters and return
        addRoom(grid, -1, 0);
        count++;
        terrain = Math.ceil(Math.random() * 5);
        return {inProgress: true, type: terrain, rooms: count};
        // } else if (itFits(grid, direction, terrain)) {
        //If the new room will fit in that direction, add it and then go to add the next new room.
        // addRoom(grid, direction, type);
        // randomRoom(grid, Math.ceil(Math.random() * 5), ++rooms);
        // return false;
    } else {
        //try again
        // randomRoom(grid, Math.ceil(Math.random() * 5), rooms);
        return {inProgress: false, type: null, rooms: count};
    }
};

var itFits = (grid, direction, terrain) => {};

var addRoom = (grid, direction, type) => {
    var posX = Math.ceil(Math.random() * grid.length);
    var posY = Math.ceil(Math.random() * grid[0].length);

    var width = Math.ceil(Math.random() * 3) + 3;
    var height = Math.ceil(Math.random() * 3) + 3;
    switch (type) {
        case 0:
            //Starting room

            //Check position if it goes off grid
            if (posX + width >= grid.length) {
                posX = grid.length - width - 1;
            } else if (posY + height >= grid[0].length) {
                posY = grid[0].length - height - 1;
            }

            //Create Room
            // console.log('Adding room of ' + width + 'x' + height + ' at ' + posX + 'x' + posY);
            var startSet = false;
            for (var i = posX; i < posX + width; ++i) {
                for (var j = posY; j < posY + height; ++j) {
                    grid[i][j] = i > posX && i < posX + width && j > posY && j < posY + height && !startSet
                        ? 10
                        : 1;
                    if (grid[i][j] === 10) {
                        startSet = true;
                    }
                }
            }
            break;
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        default:
            break;
    }
};
