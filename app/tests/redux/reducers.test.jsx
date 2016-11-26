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
            expect(res.levels[0].length).toEqual(15);
            expect(res.levels[0][0].length).toEqual(15);
        });
    });
});
