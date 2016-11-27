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
});
