/*global describe it*/
var expect = require('expect');
var actions = require('actions');

describe('actions', () => {
    it('should generate the GENERATE_DUNGEON_LEVEL action', () => {
        var action = {
            type: 'GENERATE_DUNGEON_LEVEL',
            cols: 15,
            rows: 15
        };
        var res = actions.generateDungeonLevel(15, 15);
        expect(res).toEqual(action);
    });
});
