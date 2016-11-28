/*global describe it*/
var expect = require('expect');
var df = require('deep-freeze-strict');
// var Roguelike = require('Roguelike');
var reducers = require('reducers');

describe('reducers', () => {
  describe('dungeonReducer', () => {
    it('should generate a dungeon level', () => {
      var action = {
        type: 'GENERATE_DUNGEON_LEVEL',
        cols: 15,
        rows: 15
      };
      var res = reducers.dungeonReducer(df({levels: []}), df(action));
      expect(res.levels).toBeA('array');
      expect(res.levels.length).toEqual(1);
      expect(res.levels[0]).toBeA('object');
      expect(res.levels[0].map).toBeA('array');
      expect(res.levels[0].map.length).toEqual(15);
      expect(res.levels[0].map[0].length).toEqual(15);
    });

    it('should POPULATE a dungeon LEVEL with obstacles and items', () => {
      var action = {
        type: 'POPULATE_LEVEL',
        depth: 0
      };
      var dungeon = {
        levels: []
      };
      dungeon = reducers.dungeonReducer(df(dungeon), df({type: 'GENERATE_DUNGEON_LEVEL', cols: 50, rows: 50}));
      //Populate Dungeon
      //Test fails with dungeon in deep-freeze-strict.  Rogeulike.populate is not a 'pure' function.  Consider fixing...
      var res = reducers.dungeonReducer(dungeon, df(action));
      expect(res.levels).toBeA('array');
      expect(res.levels.length).toEqual(1);
      expect(res.levels[0]).toBeA('object');
      expect(res.levels[0].map).toBeA('array');
      expect(res.levels[0].map.length).toEqual(50);
      expect(res.levels[0].map[0].length).toEqual(50);
    });

    it('should ATTACK a MOB and reduce its hit points', () => {
      var action = {
        type: 'ATTACK_MOB',
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
        monsterPosition: [0, 0]
      };
      var dungeon = {
        levels: [
          {
            map: [
              [4]
            ],
            monsters: [
              {
                level: 1,
                exp: 1,
                hp: 100,
                dmg: 1,
                position: [0, 0]
              }
            ]
          }
        ]
      };
      var res = reducers.dungeonReducer(df(dungeon), df(action));
      expect(res.levels[0].monsters[0].hp).toBeLessThan(dungeon.levels[0].monsters[0].hp);
    });

    it('should kill the mob when ATTACKing the MOB lowers its hp below zero', () => {
      var action = {
        type: 'ATTACK_MOB',
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
        monsterPosition: [0, 0]
      };
      var dungeon = {
        levels: [
          {
            map: [
              [4]
            ],
            monsters: [
              {
                level: 1,
                exp: 1,
                hp: 1,
                dmg: 1,
                position: [0, 0]
              }
            ]
          }
        ]
      };
      var res = reducers.dungeonReducer(df(dungeon), df(action));
      expect(res.levels[0].monsters[0]).toNotExist();
    });

    it('should REMOVE DEAD MOBs', () => {
      var action = {
        type: 'REMOVE_DEAD_MOB',
        depth: 0,
        monsterPosition: [0, 0]
      };
      var dungeon = {
        levels: [
          {
            map: [
              [4]
            ]
          }
        ]
      };
      var res = reducers.dungeonReducer(df(dungeon), df(action));
      // console.log(res, res.levels, res.levels[0], res.levels[0].map);
      expect(res.levels[0].map[0][0]).toEqual(1);
    });
  });

  describe('characterReducer', () => {
    it('should PLACE the CHARACTER on the player-START square', () => {

      //Dungeon with a single 3x3 room with player-start square in the center.
      var dungeon = {
        levels: [
          {
            map: [
              [
                1, 1, 1
              ],
              [
                10, 1, 1
              ],
              [1, 1, 1]
            ]
          }
        ]
      };
      var character = {
        health: 100,
        xp: 0,
        depth: 0,
        weapon: {
          name: 'Dead Fish',
          dmg: '25'
        },
        position: [0, 0]
      };
      var action = {
        type: 'PLACE_CHARACTER_START',
        character,
        level: dungeon.levels[0]
      };
      var res = reducers.characterReducer(df(dungeon), df(action));
      expect(res.position).toEqual([1, 0]);
    });

    it('should MOVE the character NORTH by one, if possible', () => {
      var dungeon = {
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
      };
      var character = {
        health: 100,
        xp: 0,
        depth: 0,
        weapon: {
          name: 'Dead Fish',
          dmg: '25'
        },
        position: [1, 2]
      };
      var action = {
        type: 'MOVE_NORTH',
        character,
        level: dungeon.levels[0]
      };
      var res = reducers.characterReducer(df(dungeon), df(action));
      expect(res.position).toEqual([1, 1]);
    });

    it('should NOT MOVE the character NORTH by one, if not possible', () => {
      var dungeon = {
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
      };
      var character = {
        health: 100,
        xp: 0,
        depth: 0,
        weapon: {
          name: 'Dead Fish',
          dmg: '25'
        },
        position: [1, 2]
      };
      var action = {
        type: 'MOVE_NORTH',
        character,
        level: dungeon.levels[0]
      };
      var res = reducers.characterReducer(df(dungeon), df(action));
      expect(res.position).toEqual([1, 2]);
    });

    it('should MOVE the character SOUTH by one, if possible', () => {
      var dungeon = {
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
      };
      var character = {
        health: 100,
        xp: 0,
        depth: 0,
        weapon: {
          name: 'Dead Fish',
          dmg: '25'
        },
        position: [1, 1]
      };
      var action = {
        type: 'MOVE_SOUTH',
        character,
        level: dungeon.levels[0]
      };
      var res = reducers.characterReducer(df(dungeon), df(action));
      expect(res.position).toEqual([1, 2]);
    });

    it('should NOT MOVE the character SOUTH by one, if not possible', () => {
      var dungeon = {
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
      };
      var character = {
        health: 100,
        xp: 0,
        depth: 0,
        weapon: {
          name: 'Dead Fish',
          dmg: '25'
        },
        position: [1, 0]
      };
      var action = {
        type: 'MOVE_SOUTH',
        character,
        level: dungeon.levels[0]
      };
      var res = reducers.characterReducer(df(dungeon), df(action));
      expect(res.position).toEqual([1, 0]);
    });

    it('should MOVE the character EAST by one, if possible', () => {
      var dungeon = {
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
      };
      var character = {
        health: 100,
        xp: 0,
        depth: 0,
        weapon: {
          name: 'Dead Fish',
          dmg: '25'
        },
        position: [1, 1]
      };
      var action = {
        type: 'MOVE_EAST',
        character,
        level: dungeon.levels[0]
      };
      var res = reducers.characterReducer(df(dungeon), df(action));
      expect(res.position).toEqual([2, 1]);
    });

    it('should NOT MOVE the character EAST by one, if not possible', () => {
      var dungeon = {
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
      };
      var character = {
        health: 100,
        xp: 0,
        depth: 0,
        weapon: {
          name: 'Dead Fish',
          dmg: '25'
        },
        position: [0, 1]
      };
      var action = {
        type: 'MOVE_EAST',
        character,
        level: dungeon.levels[0]
      };
      var res = reducers.characterReducer(df(dungeon), df(action));
      expect(res.position).toEqual([0, 1]);
    });

    it('should MOVE the character WEST by one, if possible', () => {
      var dungeon = {
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
      };
      var character = {
        health: 100,
        xp: 0,
        depth: 0,
        weapon: {
          name: 'Dead Fish',
          dmg: '25'
        },
        position: [1, 1]
      };
      var action = {
        type: 'MOVE_WEST',
        character,
        level: dungeon.levels[0]
      };
      var res = reducers.characterReducer(df(dungeon), df(action));
      expect(res.position).toEqual([0, 1]);
    });

    it('should NOT MOVE the character WEST by one, if not possible', () => {
      var dungeon = {
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
      };
      var character = {
        health: 100,
        xp: 0,
        depth: 0,
        weapon: {
          name: 'Dead Fish',
          dmg: '25'
        },
        position: [0, 1]
      };
      var action = {
        type: 'MOVE_WEST',
        character,
        level: dungeon.levels[0]
      };
      var res = reducers.characterReducer(df(dungeon), df(action));
      expect(res.position).toEqual([0, 1]);
    });

    it('should UPDATE the player\'s HP when taking damage or receiving an hpItem', () => {
      var action = {
        type: 'UPDATE_HP',
        dHP: 10
      };
      var character = {
        health: 100,
        xp: 0,
        depth: 0,
        weapon: {
          name: 'Dead Fish',
          dmg: '25'
        },
        position: [0, 1]
      };
      var res = reducers.characterReducer(df(character), df(action));
      expect(res.health).toBe(110);
      res = reducers.characterReducer(df(character), df({type: 'UPDATE_HP', dHP: -10}));
      expect(res.health).toBe(90);
    })
  });
});
