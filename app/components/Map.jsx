var React = require('react');

var Map = React.createClass({
  render: function () {
    function grid() {
      var cols = 50;
      var rows = 100;
      var gridDivs = [];
      for(var i =0; i<rows; i++) {
        gridDivs[i] = <div className="row">Row</div>;
      }
      return gridDivs;
    }
    return (
      <div className="container">
        <h1>Map.jsx</h1>
        {grid()}
      </div>
    );
  }
});

module.exports = Map;
