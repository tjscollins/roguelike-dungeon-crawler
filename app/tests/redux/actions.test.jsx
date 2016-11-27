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

  it('should generate the POPULATE_LEVEL action', () => {
    var action = {
      type: 'POPULATE_LEVEL',
      depth: 1
    };
    var res = actions.populateLevel(1);
    expect(res).toEqual(action);
  });

  it('should generte the PLACE_CHARACTER action', () => {
    var action = {
      type: 'PLACE_CHARACTER',
      character: 'character',
      level: 'level'
    };
    var res = actions.placeCharacter('character', 'level');
    expect(res).toEqual(action);
  });
});
