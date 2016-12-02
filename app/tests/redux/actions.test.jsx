/*global describe it*/
var expect = require('expect');
var actions = require('actions');

describe('actions', () => {
  it('should generate the GENERATE_DUNGEON_LEVEL action', () => {
    var action = {
      type: 'GENERATE_DUNGEON_LEVEL',
      cols: 15,
      rows: 15,
      depth: 0,
      place: false
    };
    var res = actions.generateDungeonLevel(15, 15, 0, false);
    expect(res).toEqual(action);
  });

  it('should generate the RESET_DUNGEON action', () => {
    var action = {
      type: 'RESET_DUNGEON'
    };
    var res = actions.resetDungeon();
    expect(res).toEqual(action);
  });

  it('should generate the COMBAT action', () => {
    var action = {
      type: 'COMBAT',
      monsterPosition: 'monsterPosition'
    };
    var res = actions.combat('monsterPosition');
    expect(res).toEqual(action);
  });

  it('should generate the CLEAR_GRID_POSITION action', () => {
    var action = {
      type: 'CLEAR_GRID_POSITION',
      depth: 'depth',
      monsterPosition: 'monsterPosition'
    };
    var res = actions.clearGridPosition('depth', 'monsterPosition');
    expect(res).toEqual(action);
  });

  it('should generate the TOGGLE_DARKNESS action', () => {
    var action = {
      type: 'TOGGLE_DARKNESS'
    };
    var res = actions.toggleDarkness();
    expect(res).toEqual(action);
  });

  it('should generate the MOVE_NORTH action', () => {
    var action = {
      type: 'MOVE_NORTH'
    };
    var res = actions.moveNorth();
    expect(res).toEqual(action);
  });

  it('should generate the MOVE_EAST action', () => {
    var action = {
      type: 'MOVE_EAST'
    };
    var res = actions.moveEast();
    expect(res).toEqual(action);
  });

  it('should generate the MOVE_SOUTH action', () => {
    var action = {
      type: 'MOVE_SOUTH'
    };
    var res = actions.moveSouth();
    expect(res).toEqual(action);
  });

  it('should generate the MOVE_WEST action', () => {
    var action = {
      type: 'MOVE_WEST'
    };
    var res = actions.moveWest();
    expect(res).toEqual(action);
  });

  it('should generate the GET_ITEM action', () => {
    var action = {
      type: 'GET_ITEM',
      itemPosition: 'itemPosition',
      itemType: 'itemType'
    };
    var res = actions.getItem('itemPosition', 'itemType');
    expect(res).toEqual(action);
  });

  // it('should generate the UPDATE_HP action', () => {
  //   var action = {
  //     type: 'UPDATE_HP',
  //     dHP: 'dHP'
  //   };
  //   var res = actions.updateHP('dHP');
  //   expect(res).toEqual(action);
  // });
  //
  // it('should generate the UPDATE_XP action', () => {
  //   var action = {
  //     type: 'UPDATE_XP',
  //     dXP: 'dXP'
  //   };
  //   var res = actions.updateXP('dXP');
  //   expect(res).toEqual(action);
  // });

  it('should generate the UPDATE_DEPTH action', () => {
    var action = {
      type: 'UPDATE_DEPTH',
      depth: 'depth',
      dir: 'up'
    };
    var res = actions.updateDepth('depth', 'up');
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
