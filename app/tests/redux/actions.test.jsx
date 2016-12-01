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

  it('should generate the TOGGLE_DARKNESS action', () => {
    var action = {
      type: 'TOGGLE_DARKNESS'
    };
    var res = actions.toggleDarkness();
    expect(res).toEqual(action);
  });

  it('should generate the RESET_DUNGEON action', () => {
    var action = {
      type: 'RESET_DUNGEON'
    };
    var res = actions.resetDungeon();
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

  it('should generate the ATTACK_MOB action', () => {
    var action = {
      type: 'ATTACK_MOB',
      character: 'character',
      monsterPosition: 'monsterPosition'
    };
    var res = actions.attackMob('character', 'monsterPosition');
    expect(res).toEqual(action);
  });

  it('should generate the CLEAR_POSITION action', () => {
    var action = {
      type: 'CLEAR_POSITION',
      depth: 'depth',
      monsterPosition: 'monsterPosition'
    };
    var res = actions.clearPosition('depth', 'monsterPosition');
    expect(res).toEqual(action);
  });

  it('should generate the UPDATE_HP action', () => {
    var action = {
      type: 'UPDATE_HP',
      dHP: 'dHP'
    };
    var res = actions.updateHP('dHP');
    expect(res).toEqual(action);
  });

  it('should generate the UPDATE_XP action', () => {
    var action = {
      type: 'UPDATE_XP',
      dXP: 'dXP'
    };
    var res = actions.updateXP('dXP');
    expect(res).toEqual(action);
  });

  it('should generate the GET_EQ action', () => {
    var action = {
      type: 'GET_EQ',
      weapon: 'weapon'
    };
    var res = actions.getEquipment('weapon');
    expect(res).toEqual(action);
  });

  it('should generate the UPDATE_DEPTH action', () => {
    var action = {
      type: 'UPDATE_DEPTH',
      depth: 'depth'
    };
    var res = actions.updateDepth('depth');
    expect(res).toEqual(action);
  });

  it('should generate the RESET_CHARACTER action', () => {
    var action = {
      type: 'RESET_CHARACTER'
    };
    var res = actions.resetCharacter();
    expect(res).toEqual(action);
  });
});
