var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');

export var Map = React.createClass({
  propTypes: {
    dungeon: React.PropTypes.object.isRequired,
    character: React.PropTypes.object.isRequired
  },
  componentWillMount: function() {},
  componentDidMount: function() {
    var {dungeon, character, dispatch} = this.props;
    window.addEventListener('keydown', this.handleKeyPress, true);
  },
  componentWillUnmount: function() {
    window.removeEventListener('keydown', this.handleKeyPress, true);
  },
  gridClass: function(level, x, y) {
    var {character} = this.props;
    if (character.position[0] === x && character.position[1] === y) {
      return 'player-pos';
    }
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
      default:
        return 'square';
    }
  },
  handleKeyPress: function(e) {
    var {character, dungeon, dispatch} = this.props;
    var {depth} = character;
    e.preventDefault();
    console.log('Keypress', e);
    switch (e.keyCode) {
      case 38:
        //Up-Arrow
        dispatch(actions.moveNorth(character, dungeon.levels[depth]));
        break;
      case 40:
        //Down-Arrow
        dispatch(actions.moveSouth(character, dungeon.levels[depth]));
        break;
      case 39:
        //Right-Arrow
        dispatch(actions.moveEast(character, dungeon.levels[depth]));
        break;
      case 37:
        //Left-Arrow
        dispatch(actions.moveWest(character, dungeon.levels[depth]));
        break;
      default:
        console.log('Unhandled keypress', e.keyCode);
    }
  },
  render: function() {
    var {dungeon, character, dispatch} = this.props;
    var that = this;
    function grid(depth) {
      var cols = dungeon.levels[depth].map.length;
      var rows = dungeon.levels[depth].map[0].length;
      var gridDivs = [];
      for (var i = 0; i < rows; i++) {
        var rowHTML = (xnum, ynum) => {
          var row = [];
          for (var j = 0; j < xnum; j++) {
            row[j] = <div key={j + 'x' + ynum} className={that.gridClass(dungeon.levels[depth].map, j, ynum)}/>;
          }
          return row;
        };
        gridDivs[i] = <div key={i} className="row">{rowHTML(cols, i)}</div>;
      }
      return gridDivs;
    }
    return (
      <div onKeyPress={this.handleKeyPress} className="container">
        {grid(character.depth)}
      </div>
    );
  }
});

export default connect((state) => {
  return state;
})(Map);
