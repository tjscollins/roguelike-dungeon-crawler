var React = require('react');

var Stats = React.createClass({
  propTypes: {
    health: React.PropTypes.number.isRequired,
    weapon: React.PropTypes.object.isRequired,
    xp: React.PropTypes.number.isRequired,
    level: React.PropTypes.number.isRequired
  },
  render: function () {
    var {health, weapon, xp, level} = this.props;
    return (
      <div>
        <h4>Health: {health}
          Weapon: {weapon.name}
          Attack: {weapon.dmg}
          Level: {Math.floor(xp / 100)}
          Next Level: {xp % 100}
          Dungeon: {level}</h4>
      </div>
    );
  }
});

module.exports = Stats;
