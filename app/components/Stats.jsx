var React = require('react');

var Stats = React.createClass({
  propTypes: {
    health: React.PropTypes.number.isRequired,
    weapon: React.PropTypes.object.isRequired,
    xp: React.PropTypes.number.isRequired,
    dungeonLevel: React.PropTypes.number.isRequired
  },
  render: function () {
    var {health, weapon, xp, dungeonLevel} = this.props;
    return (
      <div>
        <h4>Health: {health}
          &nbsp;Weapon: {weapon.name}
          &nbsp;Attack: {weapon.dmg}
          &nbsp;Level: {Math.floor(xp / 100)}
          &nbsp;Next Level: {100 - xp % 100}
          &nbsp;Dungeon: {dungeonLevel}</h4>
      </div>
    );
  }
});

module.exports = Stats;
