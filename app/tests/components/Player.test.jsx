var expect = require('expect');
var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var $ = require('jquery');

var Player = require('Player');

describe('Player', () => {
  it('should exist', () => {
    expect(Player).toExist();
  });
});
