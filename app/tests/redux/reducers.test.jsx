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

    it('should populate a dungeon level with obstacles and items', () => {
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
  });
});
