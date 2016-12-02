var React = require('react');
var {connect} = require('react-redux');
var Roguelike = require('Roguelike');
import * as $ from 'jquery';

/*----------Redux----------*/
import * as actions from 'actions';

export var Map = React.createClass({
  propTypes: {
    dungeon: React.PropTypes.object.isRequired,
    character: React.PropTypes.object.isRequired,
    dispatch: React.PropTypes.func.isRequired
  },
  componentWillMount: function() {
    // var {dungeon, character, dispatch} = this.props;
    // var {position, depth} = character;
    // var {map, start} = dungeon.levels[depth];
    // //Generate 1st Level of Dungeon
    // //If it doesn't already exist
    // if (!dungeon.levels[0]) {
    //   dispatch(actions.generateDungeonLevel(100, 100, 0));
    // }
    // //Place the character at the start
    // //if the character isn't already on the map
    // if (map[position[0]][position[1]] === 0) {
    //   dispatch(actions.placeCharacterStart(dungeon.levels[depth]));
    // }
  },
  componentDidMount: function() {
    // var {dungeon, character, dispatch} = this.props;
    // var {position, depth} = character;
    // var {map, start} = dungeon.levels[depth];
    // //Place the character at the start
    // //if the character isn't already on the map
    // if (map[position[0]][position[1]] === 0) {
    //   dispatch(actions.placeCharacterStart(dungeon.levels[0]));
    // }
    window.addEventListener('keydown', this.handleKeyPress, true);
  },
  componentWillReceiveProps: function(nextProps) {
    var {dispatch} = this.props;
    var {dungeon, character} = nextProps;
    var {position, depth} = character;
    if (position[0] === 0 && position[1] === 0 && dungeon.levels[depth].map[0][0] !== 10) {
      console.log('Character position didn\'t update in time', dungeon, character);
      dispatch(actions.placeCharacterStart(dungeon.levels[depth]));
    }
  },
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
    var {depth} = character;
    //Checks the result of character's move and applies relevant game mechanics
    var terrain = dungeon.levels[depth].map[finalPos[0]][finalPos[1]];
    switch (terrain) {
      case 2:
        $('#Water-Modal').modal('toggle');
        return Roguelike.fallIntoWater(character);
      case 3:
        $('#Lava-Modal').modal('toggle');
        return Roguelike.fallIntoLava(character);
      case 4:
        // console.log('Attacking');
        var {exp} = dungeon.levels[depth].monsters.filter((mob) => {
          return mob.position[0] === finalPos[0] && mob.position[1] === finalPos[1];
        })[0];
        // console.log(exp);
        dispatch(actions.attackMob(character, finalPos));
        var enemy = this.props.dungeon.levels[depth].monsters.filter((mob) => {
          return mob.position[0] === finalPos[0] && mob.position[1] === finalPos[1];
        });
        // console.log(enemy[0]);
        if (enemy[0]) {
          var dmgTaken = Math.max(0, enemy[0].dmg + Math.ceil(Math.random() * 10) - Math.floor(character.xp / 100));
          dispatch(actions.updateHP(dmgTaken * -1));
          if (this.props.character.health > 0) {
            this.moveInto(finalPos);
          } else {
            //Character Died!
            return this.props.character;
          }
        } else {
          // console.log(exp);
          dispatch(actions.clearPosition(depth, finalPos));
          dispatch(actions.updateXP(exp));
          return this.props.character;
        }
        break;
      case 5:
        var item = dungeon.levels[depth].healthItems.filter((potion) => {
          return potion.position[0] === finalPos[0] && potion.position[1] === finalPos[1];
        })[0];
        dispatch(actions.updateHP(item.value));
        dispatch(actions.clearPosition(depth, item.position));
        return this.props.character;
      case 6:
        dispatch(actions.getEquipment(dungeon.levels[depth].weapon));
        dispatch(actions.clearPosition(depth, dungeon.levels[depth].weapon.position));
        return this.props.character;
      case 9:
        var newDepth = depth + 1;
        console.log(dungeon.levels[newDepth]);
        if (!dungeon.levels[newDepth]) {
          dispatch(actions.generateDungeonLevel(Roguelike.randomInteger(50) + 25, Roguelike.randomInteger(50) + 25), newDepth);
        }
        dispatch(actions.updateDepth(newDepth));
        return this.props.character;
      case 10:
        if (depth !== 0) {
          var newDepth = depth - 1;
          dispatch(actions.updateDepth(newDepth));
          return this.props.character;
        }
        break;
      case 11:
        // console.log('Attacking');
        var {exp} = dungeon.levels[depth].monsters.filter((mob) => {
          return mob.position[0] === finalPos[0] && mob.position[1] === finalPos[1];
        })[0];
        // console.log(exp);
        dispatch(actions.attackMob(character, finalPos));
        var enemy = this.props.dungeon.levels[depth].monsters.filter((mob) => {
          return mob.position[0] === finalPos[0] && mob.position[1] === finalPos[1];
        });
        // console.log(enemy[0]);
        if (enemy[0]) {
          var dmgTaken = Math.max(0, enemy[0].dmg + Math.ceil(Math.random() * 10) - Math.floor(character.xp / 100));
          dispatch(actions.updateHP(dmgTaken * -1));
          if (this.props.character.health > 0) {
            this.moveInto(finalPos);
          } else {
            //Character Died!
            return this.props.character;
          }
        } else {
          // console.log(exp);
          dispatch(actions.clearPosition(depth, finalPos));
          dispatch(actions.updateXP(exp));
          $('#Boss-Modal').modal('toggle');
          return this.props.character;
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
    if (character.health < 0) {
      $('#Death-Modal').modal('toggle');
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
