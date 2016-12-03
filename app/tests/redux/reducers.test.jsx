/*global describe it*/
var expect = require('expect');
var df = require('deep-freeze-strict');
// var Roguelike = require('Roguelike');
var reducers = require('reducers');

describe('reducers', () => {
  it('should generate a dungeon level', () => {
    var action = {
      type: 'GENERATE_DUNGEON_LEVEL',
      cols: 15,
      rows: 15,
      depth: 0,
      place: true
    };
    var state = {
      character: {
        health: 20,
        maxHealth: 20,
        xp: 0,
        depth: 0,
        weapon: {
          name: 'Dead Fish',
          dmg: 50
        },
        position: [0, 0]
      },
      dungeon: {
        allVisible: false,
        victory: false,
        levels: [],
        lava: {},
        water: {}
      }
    };
    var res = reducers.reducer(df(state), df(action));
    expect(res.dungeon.levels).toBeA('array');
    expect(res.dungeon.levels.length).toEqual(1);
    expect(res.dungeon.levels[0]).toBeA('object');
    expect(res.dungeon.levels[0].map).toBeA('array');
    expect(res.dungeon.levels[0].map.length).toEqual(15);
    expect(res.dungeon.levels[0].map[0].length).toEqual(15);
    expect(res.dungeon.levels[0].start).toEqual(res.character.position);
  });

  it('should start COMBAT and continue until player or target is dead', () => {
    var action = {
      type: 'COMBAT',
      monsterPosition: [0, 0]
    };
    var state = {
      character: {
        health: 100,
        xp: 0,
        depth: 0,
        weapon: {
          name: 'Dead Fish',
          dmg: 50
        },
        position: [0, 0]
      },
      dungeon: {
        levels: [
          {
            map: [
              [4]
            ],
            monsters: [
              {
                level: 1,
                exp: 1,
                hp: 10,
                dmg: 1,
                position: [0, 0]
              }
            ]
          }
        ]
      }
    };
    var res = reducers.reducer(df(state), df(action));
    expect(res.dungeon.levels[0].monsters.length).toBeLessThan(state.dungeon.levels[0].monsters.length);
  });

  it('should CLEAR GRID POSITIONs', () => {
    var action = {
      type: 'CLEAR_GRID_POSITION',
      depth: 0,
      monsterPosition: [0, 0]
    };
    var state = {
      dungeon: {
        levels: [
          {
            map: [
              [4]
            ]
          }
        ]
      },
      character: {
        health: 100,
        xp: 0,
        depth: 0,
        weapon: {
          name: 'Dead Fish',
          dmg: '25'
        },
        position: [1, 2]
      }
    };
    var res = reducers.reducer(df(state), df(action));
    expect(res.dungeon.levels[0].map[0][0]).toEqual(1);
  });

  it('should MOVE the character NORTH by one, if possible', () => {
    var state = {
      dungeon: {
        levels: [
          {
            map: [
              [
                1, 1, 1
              ],
              [
                1, 1, 1
              ],
              [1, 1, 1]
            ]
          }
        ]
      },
      character: {
        health: 100,
        xp: 0,
        depth: 0,
        weapon: {
          name: 'Dead Fish',
          dmg: '25'
        },
        position: [1, 2]
      }
    };
    var action = {
      type: 'MOVE_NORTH'
    };
    var res = reducers.reducer(df(state), df(action));
    expect(res.character.position).toEqual([1, 1]);
  });

  it('should NOT MOVE the character NORTH by one, if not possible', () => {
    var state = {
      dungeon: {
        levels: [
          {
            map: [
              [
                1, 1, 1
              ],
              [
                1, 0, 1
              ],
              [1, 1, 1]
            ]
          }
        ]
      },
      character: {
        health: 100,
        xp: 0,
        depth: 0,
        weapon: {
          name: 'Dead Fish',
          dmg: '25'
        },
        position: [1, 2]
      }
    };
    var action = {
      type: 'MOVE_NORTH'
    };
    var res = reducers.reducer(df(state), df(action));
    expect(res.character.position).toEqual([1, 2]);
  });

  it('should MOVE the character SOUTH by one, if possible', () => {
    var state = {
      dungeon: {
        levels: [
          {
            map: [
              [
                1, 1, 1
              ],
              [
                1, 1, 1
              ],
              [1, 1, 1]
            ]
          }
        ]
      },
      character: {
        health: 100,
        xp: 0,
        depth: 0,
        weapon: {
          name: 'Dead Fish',
          dmg: '25'
        },
        position: [1, 0]
      }
    };
    var action = {
      type: 'MOVE_SOUTH'
    };
    var res = reducers.reducer(df(state), df(action));
    expect(res.character.position).toEqual([1, 1]);
  });

  it('should NOT MOVE the character SOUTH by one, if not possible', () => {
    var state = {
      dungeon: {
        levels: [
          {
            map: [
              [
                1, 1, 1
              ],
              [
                1, 0, 1
              ],
              [1, 1, 1]
            ]
          }
        ]
      },
      character: {
        health: 100,
        xp: 0,
        depth: 0,
        weapon: {
          name: 'Dead Fish',
          dmg: '25'
        },
        position: [1, 0]
      }
    };
    var action = {
      type: 'MOVE_SOUTH'
    };
    var res = reducers.reducer(df(state), df(action));
    expect(res.character.position).toEqual([1, 0]);
  });

  it('should MOVE the character EAST by one, if possible', () => {
    var state = {
      dungeon: {
        levels: [
          {
            map: [
              [
                1, 1, 1
              ],
              [
                1, 1, 1
              ],
              [1, 1, 1]
            ]
          }
        ]
      },
      character: {
        health: 100,
        xp: 0,
        depth: 0,
        weapon: {
          name: 'Dead Fish',
          dmg: '25'
        },
        position: [1, 1]
      }
    };
    var action = {
      type: 'MOVE_EAST'
    };
    var res = reducers.reducer(df(state), df(action));
    expect(res.character.position).toEqual([2, 1]);
  });

  it('should NOT MOVE the character EAST by one, if not possible', () => {
    var state = {
      dungeon: {
        levels: [
          {
            map: [
              [
                1, 1, 1
              ],
              [
                1, 0, 1
              ],
              [1, 1, 1]
            ]
          }
        ]
      },
      character: {
        health: 100,
        xp: 0,
        depth: 0,
        weapon: {
          name: 'Dead Fish',
          dmg: '25'
        },
        position: [0, 1]
      }
    };
    var action = {
      type: 'MOVE_EAST'
    };
    var res = reducers.reducer(df(state), df(action));
    expect(res.character.position).toEqual([0, 1]);
  });

  it('should MOVE the character WEST by one, if possible', () => {
    var state = {
      dungeon: {
        levels: [
          {
            map: [
              [
                1, 1, 1
              ],
              [
                1, 1, 1
              ],
              [1, 1, 1]
            ]
          }
        ]
      },
      character: {
        health: 100,
        xp: 0,
        depth: 0,
        weapon: {
          name: 'Dead Fish',
          dmg: '25'
        },
        position: [1, 1]
      }
    };
    var action = {
      type: 'MOVE_WEST'
    };
    var res = reducers.reducer(df(state), df(action));
    expect(res.character.position).toEqual([0, 1]);
  });

  it('should NOT MOVE the character WEST by one, if not possible', () => {
    var state = {
      dungeon: {
        levels: [
          {
            map: [
              [
                1, 1, 1
              ],
              [
                1, 0, 1
              ],
              [1, 1, 1]
            ]
          }
        ]
      },
      character: {
        health: 100,
        xp: 0,
        depth: 0,
        weapon: {
          name: 'Dead Fish',
          dmg: '25'
        },
        position: [0, 1]
      }
    };
    var action = {
      type: 'MOVE_WEST'
    };
    var res = reducers.reducer(df(state), df(action));
    expect(res.character.position).toEqual([0, 1]);
  });

  it('should GET an ITEM the player approaches', () => {
    var state = {
      dungeon: {
        levels: [
          {
            map: [
              [
                1, 1, 1
              ],
              [
                1, 0, 1
              ],
              [1, 1, 1]
            ],
            weapon: {
              name: 'Dead Fish',
              dmg: 25,
              position: [0, 0]
            },
            healthItems: [
              {
                value: 10,
                position: [0, 0]
              }
            ]
          }
        ]
      },
      character: {
        health: 100,
        maxHealth: 150,
        xp: 0,
        depth: 0,
        weapon: {
          name: 'Fists',
          dmg: 5
        },
        position: [0, 0]
      }
    };
    var action = {
      type: 'GET_ITEM',
      itemPosition: [
        0, 0
      ],
      itemType: 'weapon'
    };
    var res = reducers.reducer(df(state), df(action));
    expect(res.character.weapon.dmg).toEqual(state.dungeon.levels[0].weapon.dmg);
    var newRes = reducers.reducer(df(state), df({
      type: 'GET_ITEM',
      itemPosition: [
        0, 0
      ],
      itemType: 'healthPotion'
    }));
    expect(newRes.character.health).toEqual(110);
  });

  it('should damage the player for FALLing INTO the WATER', () => {
    var action = {
      type: 'FALL_INTO_WATER'
    };
    var state = {
      dungeon: {
        water: {}
      },
      character: {
        health: 10,
        weapon: {
          dmg: 5
        }
      }
    };
    var res = reducers.reducer(df(state), df(action));
    expect(res.character.health).toBe(5);
    expect(res.character.weapon.dmg).toBe(4);
    expect(res.dungeon.water.title).toExist();
    expect(res.dungeon.water.text).toExist();
  });

  it('should damage the player for FALLing INTO the LAVA', () => {
    var action = {
      type: 'FALL_INTO_LAVA'
    };
    var state = {
      dungeon: {
        lava: {}
      },
      character: {
        health: 10,
        weapon: {
          dmg: 50
        }
      }
    };
    var res = reducers.reducer(df(state), df(action));
    expect(res.character.health).toBe(-40);
    expect(res.character.weapon.name).toBe('Fists');
    expect(res.character.weapon.dmg).toBe(2);
    expect(res.dungeon.lava.title).toExist();
    expect(res.dungeon.lava.text).toExist();
  });

  it('should UPDATE the DEPTH at which the player is exploring when descending', () => {
    var action = {
      type: 'UPDATE_DEPTH',
      depth: 1,
      dir: 'down'
    };
    var state = {
      dungeon: {
        levels: [
          {
            map: [
              [
                1, 1, 1
              ],
              [
                1, 1, 1
              ],
              [1, 1, 1]
            ],
            start: [0, 0]
          }, {
            map: [
              [
                1, 1, 1
              ],
              [
                1, 1, 1
              ],
              [1, 1, 1]
            ],
            start: [2, 2]
          }
        ]
      },
      character: {
        depth: 0,
        position: [0, 0]
      }
    };

    var res = reducers.reducer(df(state), df(action));
    expect(res.character.depth).toBe(1);
    expect(res.character.position).toEqual([2, 2]);
  });

  it('should UPDATE the DEPTH at which the player is exploring when ascending', () => {
    var action = {
      type: 'UPDATE_DEPTH',
      depth: 0,
      dir: 'down'
    };
    var state = {
      dungeon: {
        levels: [
          {
            map: [
              [
                1, 1, 1
              ],
              [
                1, 1, 1
              ],
              [1, 1, 1]
            ],
            start: [0, 0]
          }, {
            map: [
              [
                1, 1, 1
              ],
              [
                1, 1, 1
              ],
              [1, 1, 1]
            ],
            start: [2, 2]
          }
        ]
      },
      character: {
        depth: 1,
        position: [2, 2]
      }
    };

    var res = reducers.reducer(df(state), df(action));
    expect(res.character.depth).toBe(0);
    expect(res.character.position).toEqual([0, 0]);
  });

  it('should RESET CHARACTER data', () => {
    var action = {
      type: 'RESET_CHARACTER'
    };
    var state = {
      character: {
        health: 100,
        maxHealth: 150,
        xp: 100,
        depth: 0,
        weapon: {
          name: 'Flaming Fists',
          dmg: 5
        }
      }
    };
    var res = reducers.reducer(df(state), df(action));
    expect(res.character.health).toBe(20);
    expect(res.character.xp).toBe(0);
    expect(res.character.weapon.name).toBe('Fists');
  });

});
