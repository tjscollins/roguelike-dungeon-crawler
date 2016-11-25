var React = require('react');

var Map = React.createClass({
  render: function () {
    function grid() {
      return (
        <div className="row"></div>
      );
    }
    return (
      <div className="container">
        <h1>Map.jsx</h1>
      </div>
    );
  }
});

module.exports = Map;
