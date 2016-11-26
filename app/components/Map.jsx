var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');

export var Map = React.createClass({
  gridClass: function(level, x, y) {
    switch (level[x][y]) {
      case 0:
        return 'square';
      case 1:
        return 'ground';
      case 10:
        return 'player';
      default:
        return 'square';
    }
  },
  render: function() {
    var {map, character} = this.props;
    var that = this;
    function grid(depth) {
      var cols = map.levels[depth].length;
      var rows = map.levels[depth][0].length;
      var gridDivs = [];
      for (var i = 0; i < rows; i++) {
        var rowHTML = (xnum, ynum) => {
          var row = [];
          for (var j = 0; j < xnum; j++) {
            row[j] = <div key={j + 'x' + ynum} className={that.gridClass(map.levels[depth], j, ynum)}/>;
          }
          // console.log(xnum, ynum, row.length);
          return row;
        };

        gridDivs[i] = <div key={i} className="row">{rowHTML(cols, i)}</div>;
      }
      return gridDivs;
    }
    return (
      <div className="container">
        <h1>Map.jsx</h1>
        {grid(character.depth)}
      </div>
    );
  }
});

export default connect((state) => {
  return state;
})(Map);
