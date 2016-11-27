var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');

export var Map = React.createClass({
  propTypes: {
    dungeon: React.PropTypes.object.isRequired,
    character: React.PropTypes.object.isRequired
  },
  componentWillMount: function() {
    var {dungeon, character, dispatch} = this.props;
    dispatch(actions.placeCharacter(character, dungeon.levels[0]));
  },
  gridClass: function(level, x, y) {
    switch (level[x][y]) {
      case 0:
        return 'square';
      case 1:
        return 'ground';
      case 2:
        return 'water';
      case 3:
        return 'lava';
      case 4:
        return 'mob';
      case 5:
        return 'hpitem';
      case 6:
        return 'weapon';
      case 8:
        return 'hallway';
      case 9:
        return 'downstairs';
      case 10:
        return 'player-start';
      case 11:
        return 'player-pos';
      default:
        return 'square';
    }
  },
  render: function() {
    var {dungeon, character, dispatch} = this.props;
    // console.log(this.props);
    var that = this;
    function grid(depth) {
      // console.log(dungeon);
      var cols = dungeon.levels[depth].map.length;
      var rows = dungeon.levels[depth].map[0].length;
      var gridDivs = [];
      for (var i = 0; i < rows; i++) {
        var rowHTML = (xnum, ynum) => {
          var row = [];
          for (var j = 0; j < xnum; j++) {
            row[j] = <div key={j + 'x' + ynum} className={that.gridClass(dungeon.levels[depth].map, j, ynum)}/>;
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
        {grid(character.depth)}
      </div>
    );
  }
});

export default connect((state) => {
  return state;
})(Map);
