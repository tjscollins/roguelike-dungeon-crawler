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

  it('should generate the PLACE_CHARACTER_START action', () => {
    var action = {
      type: 'PLACE_CHARACTER_START',
      character: 'character',
      level: 'level'
    };
    var res = actions.placeCharacterStart('character', 'level');
    expect(res).toEqual(action);
  });

  it('should generate the MOVE_NORTH action', () => {
    var action = {
      type: 'MOVE_NORTH',
      character: 'character',
      level: 'level'
    };
    var res = actions.moveNorth('character', 'level');
    expect(res).toEqual(action);
  });

  it('should generate the MOVE_EAST action', () => {
    var action = {
      type: 'MOVE_EAST',
      character: 'character',
      level: 'level'
    };
    var res = actions.moveEast('character', 'level');
    expect(res).toEqual(action);
  });

  it('should generate the MOVE_SOUTH action', () => {
    var action = {
      type: 'MOVE_SOUTH',
      character: 'character',
      level: 'level'
    };
    var res = actions.moveSouth('character', 'level');
    expect(res).toEqual(action);
  });

  it('should generate the MOVE_WEST action', () => {
    var action = {
      type: 'MOVE_WEST',
      character: 'character',
      level: 'level'
    };
    var res = actions.moveWest('character', 'level');
    expect(res).toEqual(action);
  });
});
