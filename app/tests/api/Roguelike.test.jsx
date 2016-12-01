/*global describe it*/
var expect = require('expect');
// var React = require('react');
// var ReactDOM = require('react-dom');
// var TestUtils = require('react-addons-test-utils');
// var $ = require('jquery');

var Roguelike = require('Roguelike');

describe('Roguelike API', () => {
  it('should exist', () => {
    expect(Roguelike).toExist();
  });

  it('should generate an empty grid with the correct dimensions when shouldCreateMap is false', () => {
    expect(Roguelike.randomLevel(2, 2, false).map).toEqual([
      [
        0, 0
      ],
      [0, 0]
    ]);
    expect(Roguelike.randomLevel(2, 5, false).map).toEqual([
      [
        0, 0, 0, 0, 0
      ],
      [0, 0, 0, 0, 0]
    ]);
    expect(Roguelike.randomLevel(5, 1, false).map).toEqual([[0], [0], [0], [0], [0]
    ]);
  });

  it('should create the starting room of the level', () => {
    var level = Roguelike.randomLevel(15, 15, 0, true).map.map((val) => {
      return val.filter((valN) => {
        return valN !== 0;
      });
    }).filter((val) => {
      return val.length > 0;
    });
    expect(level[0][0]).toEqual(1);
    level = Roguelike.randomLevel(25, 25, 0, true).map.map((val) => {
      return val.filter((valN) => {
        return valN !== 0;
      });
    }).filter((val) => {
      return val.length > 0;
    });
    expect(level[0][0]).toEqual(1);
    level = Roguelike.randomLevel(30, 10, 0, true).map.map((val) => {
      return val.filter((valN) => {
        return valN !== 0;
      });
    }).filter((val) => {
      return val.length > 0;
    });
    expect(level[0][0]).toBeA('number');
  });
});
