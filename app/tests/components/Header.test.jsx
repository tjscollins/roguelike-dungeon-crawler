var expect = require('expect');
var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var $ = require('jquery');

var Header = require('Header');

describe('Header', () => {
  it('should exist', () => {
    expect(Header).toExist();
  });
});
