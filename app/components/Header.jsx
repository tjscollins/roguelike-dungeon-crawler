var React = require('react');
var Stats = require('Stats');

var Header = React.createClass({
  render: function () {
    return (
      <div>
        <h1>React Roguelike</h1>
        <Stats/>
      </div>
    );
  }
});

module.exports = Header;
