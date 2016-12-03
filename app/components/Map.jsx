var React = require('react');
var {connect} = require('react-redux');
var Roguelike = require('Roguelike');
// import $ from 'jquery';
var $ = require('jquery');
/*----------Redux----------*/
import * as actions from 'actions';

export var Map = React.createClass({
  propTypes: {
    dungeon: React.PropTypes.object.isRequired,
    character: React.PropTypes.object.isRequired,
    dispatch: React.PropTypes.func.isRequired
  },
  componentWillMount: function() {
    // console.log('Props are', this.props);
  },
  componentDidMount: function() {
    window.addEventListener('keydown', this.handleKeyPress, true);
  },
  componentWillReceiveProps: function(nextProps) {},
  componentWillUnmount: function() {
    window.removeEventListener('keydown', this.handleKeyPress, true);
  },
  gridClass: function(level, x, y) {
    var {character, dungeon} = this.props;
    if (character.position[0] === x && character.position[1] === y) {
      return 'player-pos';
    }
    var distance = Math.pow(Math.abs(character.position[0] - x), 2) + Math.pow(Math.abs(character.position[1] - y), 2);
    switch ((!dungeon.allVisible && distance >= 25) || level[x][y]) {
      case true:
        return 'darkness';
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
        return 'player-start'; //upstairs
      case 11:
        return 'boss';
      default:
        return 'square';
    }
  },
  handleKeyPress: function(e) {
    var {character, dispatch} = this.props;
    var {position} = character;
    switch (e.keyCode) {
      case 38:
        //Up-Arrow
        this.moveInto([
          position[0], position[1] - 1
        ]);
        dispatch(actions.moveNorth());
        break;
      case 40:
        //Down-Arrow
        this.moveInto([
          position[0], position[1] + 1
        ]);
        dispatch(actions.moveSouth());
        break;
      case 39:
        //Right-Arrow
        this.moveInto([
          position[0] + 1,
          position[1]
        ]);
        dispatch(actions.moveEast());
        break;
      case 37:
        //Left-Arrow
        this.moveInto([
          position[0] - 1,
          position[1]
        ]);
        dispatch(actions.moveWest());
        break;
      default:
    }
  },
  moveInto: function(finalPos) {
    var {character, dungeon, dispatch} = this.props;
    var {depth} = character;
    //Checks the result of character's move and applies relevant game mechanics
    var terrain = dungeon.levels[depth].map[finalPos[0]][finalPos[1]];
    switch (terrain) {
      case 2:
        //Falling into Water Obstacle
        $('#Water-Modal').modal('show');
        dispatch(actions.fallIntoWater());
        break;
      case 3:
        //Falling into Lava Obstacle
        $('#Lava-Modal').modal('show');
        dispatch(actions.fallIntoLava());
        break;
      case 4:
        //Attacking normal mob
        dispatch(actions.combat(finalPos));
        if (character.health > 0) {
          dispatch(actions.clearGridPosition(depth, finalPos));
        }
        break;
      case 5:
        //Picking up Health Item
        dispatch(actions.getItem(finalPos, 'healthPotion'));
        dispatch(actions.clearGridPosition(depth, finalPos));
        break;
      case 6:
        //Picking up a new weapon
        dispatch(actions.getItem(finalPos, 'weapon'));
        dispatch(actions.clearGridPosition(depth, finalPos));
        break;
      case 9:
        //Descending to a lower level of the dungeon
        var newDepth = depth + 1;
        if (!dungeon.levels[newDepth]) {
          dispatch(actions.generateDungeonLevel(Roguelike.randomInteger(50) + 25, Roguelike.randomInteger(50) + 25), newDepth, true);
        }
        dispatch(actions.updateDepth(newDepth));
        break;
      case 10:
        //Ascending to a higher level of the dungeon
        if (depth !== 0) {
          var newDepth = depth - 1;
          dispatch(actions.updateDepth(newDepth));
        }
        break;
      case 11:
        //Attacking the final boss of the dungeon
        // console.log('Attacking');
        dispatch(actions.combat(finalPos));
        if (character.health > 0) {
          dispatch(actions.clearGridPosition(depth, finalPos));
          $('#Boss-Modal').modal('show');
        }
        break;
      default:
        return character;
    }
  },
  render: function() {
    var {dungeon, character, dispatch} = this.props;
    var {position} = character;
    var that = this;
    if (character.health <= 0) {
      $('#Death-Modal').modal('show');
    }
    function grid(depth) {
      var cols = dungeon.levels[depth].map.length;
      var rows = dungeon.levels[depth].map[0].length;
      var gridDivs = [],
        yRange = [];
      var yDiffs = [
        position[1], rows - position[1]
      ];
      //The viewable portion of the map is meant to be 50x50 always
      if (yDiffs[0] < 25) {
        yRange = [
          0,
          Math.min(rows, 50)
        ];
      } else if (yDiffs[1] < 25) {
        yRange = [
          Math.max(0, rows - 50),
          rows
        ];
      } else {
        yRange = [
          position[1] - 25,
          position[1] + 25
        ];
      }
      // console.log('yRange', yRange);
      for (var i = yRange[0]; i < yRange[1]; i++) {
        var rowHTML = (xnum, ynum) => {
          var row = [],
            xRange = [];
          var xDiffs = [
            position[0], xnum - position[0]
          ];
          if (xDiffs[0] < 25) {
            xRange = [
              0,
              Math.min(xnum, 50)
            ];
          } else if (xDiffs[1] < 25) {
            xRange = [
              Math.max(0, xnum - 50),
              xnum
            ];
          } else {
            xRange = [
              position[0] - 25,
              position[0] + 25
            ];
          }
          // console.log('xRange', xRange);
          for (var j = xRange[0]; j < xRange[1]; j++) {
            row[j] = <div key={j + 'x' + ynum} className={that.gridClass(dungeon.levels[depth].map, j, ynum)}/>;
          }
          return row;
        };
        gridDivs[i] = <div key={i} className="row">{rowHTML(cols, i)}</div>;
      }
      return gridDivs;
    }
    return (
      <div onKeyPress={this.handleKeyPress} className="container Map">
        {grid(character.depth)}
      </div>
    );
  }
});

export default connect((state) => {
  return state;
})(Map);
