var expect = require('expect');
var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var $ = require('jquery');

var Weapon = require('Weapon');

describe('Weapon', () => {
  it('should exist', () => {
    expect(Weapon).toExist();
  });
});
