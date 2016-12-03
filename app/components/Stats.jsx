var React = require('react');
var {connect} = require('react-redux');

var Stats = React.createClass({
  propTypes: {
    character: React.PropTypes.object.isRequired
  },
  render: function() {
    var {character} = this.props;
    // console.log('Stats Props', this.props);
    var {
      health,
      maxHealth,
      weapon,
      depth,
      xp,
      level
    } = character;
    return (
      <div className="Stats">
        <h4>Health: {health}/{maxHealth}
          &nbsp;Weapon: {weapon.name}
          &nbsp;Attack: {weapon.dmg}<br/><br/>
          &nbsp;Level: {level}
          &nbsp;Next Level: {100 - xp % 100}
          xp &nbsp;Dungeon Level: {depth + 1}</h4>
      </div>
    );
  }
});

export default connect((state) => {
  return state;
})(Stats);
