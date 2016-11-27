/*global describe it*/
var expect = require('expect');
var df = require('deep-freeze-strict');

var reducers = require('reducers');

describe('reducers', () => {
  describe('mapReducer', () => {
    it('should generate a dungeon level', () => {
      var action = {
        type: 'GENERATE_DUNGEON_LEVEL',
        cols: 15,
        rows: 15
      };
      var res = reducers.mapReducer(df({levels: []}), df(action));
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
      var levels = [Roguelike.randomLevel(15, 15, true)];

      var res = reducers.mapReducer(df(levels), df(action));
      expect(res.levels).toBeA('array');
      expect(res.levels.length).toEqual(1);
      expect(res.levels[0]).toBeA('object');
      expect(res.levels[0].map).toBeA('array');
      expect(res.levels[0].map.length).toEqual(15);
      expect(res.levels[0].map[0].length).toEqual(15);
    });
  });
});

});
});
