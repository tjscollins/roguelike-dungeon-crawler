var React = require('react');
var Stats = require('Stats');

var Header = React.createClass({
  render: function () {
    var weapon = {
      name: 'Dead Fish',
      dmg: 25
    };
    return (
      <div className="container">
        <h1>React Roguelike Test</h1>
        <div className="row">
          <div className="col-xs-10">
            <Stats health={100} weapon={weapon} xp={250} dungeonLevel={3}/>
          </div>
          <div className="col-xs-2">
            <button>Toggle Darkness</button>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Header;
