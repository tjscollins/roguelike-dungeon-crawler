var React = require('react');
var Stats = require('Stats');
var {connect} = require('react-redux');

export var Header = React.createClass({
  render: function() {
    var {character} = this.props;
    return (
      <div className="container">
        <h1>React Roguelike Test</h1>
        <div className="row">
          <div className="col-xs-10">
            <Stats health={character.health} weapon={character.weapon} xp={character.xp} dungeonLevel={character.depth + 1}/>
          </div>
          <div className="col-xs-2">
            <button>Toggle Darkness</button>
          </div>
        </div>
      </div>
    );
  }
});

export default connect((state) => {
  return state;
})(Header);
