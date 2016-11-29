var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');
var Roguelike = require('Roguelike');

export var Map = React.createClass({
  propTypes: {
    dungeon: React.PropTypes.object.isRequired,
    character: React.PropTypes.object.isRequired
  },
  componentWillMount: function() {},
  componentDidMount: function() {
    // var {dungeon, character, dispatch} = this.props;
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
    var {depth, position} = character;
    // e.preventDefault(); //Commented to allow other keybinds to function normally
    // console.log('Keypress', e);
    switch (e.keyCode) {
      case 38:
        //Up-Arrow
        dispatch(actions.moveNorth(this.moveInto([
          position[0], position[1] - 1
        ]), dungeon.levels[depth]));
        break;
      case 40:
        //Down-Arrow
        dispatch(actions.moveSouth(this.moveInto([
          position[0], position[1] + 1
        ]), dungeon.levels[depth]));
        break;
      case 39:
        //Right-Arrow
        dispatch(actions.moveEast(this.moveInto([
          position[0] + 1,
          position[1]
        ]), dungeon.levels[depth]));
        break;
      case 37:
        //Left-Arrow
        dispatch(actions.moveWest(this.moveInto([
          position[0] - 1,
          position[1]
        ]), dungeon.levels[depth]));
        break;
      default:
        // console.log('Unhandled keypress', e.keyCode);
    }
  },

  moveInto: function(finalPos) {
    var {character, dungeon, dispatch} = this.props;
    var {depth, position} = character;
    //Checks the result of character's move and applies relevant game mechanics
    var terrain = dungeon.levels[depth].map[finalPos[0]][finalPos[1]];
    switch (terrain) {
      case 2:
        return Roguelike.fallIntoWater(character);
      case 3:
        return Roguelike.fallIntoLava(character);
      case 4:
        console.log('Attacking');
        var {exp} = dungeon.levels[depth].monsters.filter((mob) => {
          return mob.position[0] === finalPos[0] && mob.position[1] === finalPos[1];
        })[0];
        console.log(exp);
        dispatch(actions.attackMob(character, finalPos));
        var enemy = this.props.dungeon.levels[depth].monsters.filter((mob) => {
          return mob.position[0] === finalPos[0] && mob.position[1] === finalPos[1];
        });
        // console.log(enemy[0]);
        if (enemy[0]) {
          var dmgTaken = Math.max(0, enemy[0].dmg + Math.ceil(Math.random() * 10) - 5);
          dispatch(actions.updateHP(dmgTaken * -1));
          if (character.health > 0) {
            this.moveInto(finalPos);
          } else {
            //Character Died!
            return character;
          }
        } else {
          console.log(exp);
          dispatch(actions.removeDeadMob(depth, finalPos));
          dispatch(actions.updateXP(exp));
          return this.props.character;
        }
        break;
      case 5:
        return 'hpitem';
      case 6:
        return 'weapon';
      case 9:
        return 'downstairs';
      default:
        return character;
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
