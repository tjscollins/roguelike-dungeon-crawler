var React = require('react');
var {connect} = require('react-redux');

var Stats = React.createClass({
  render: function() {
    var {character} = this.props;
    var {health, maxHealth, weapon, depth, xp} = character;
    return (
      <div>
        <h4>Health: {health}/{maxHealth}
          &nbsp;Weapon: {weapon.name}
          &nbsp;Attack: {weapon.dmg}
          &nbsp;Level: {Math.floor(xp / 100) + 1}
          &nbsp;Next Level: {100 - xp % 100}
          xp &nbsp;Dungeon Level: {depth + 1}</h4>
      </div>
    );
  }
});

export default connect((state) => {
  return state;
})(Stats);
