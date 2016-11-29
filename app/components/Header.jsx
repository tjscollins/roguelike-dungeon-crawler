var React = require('react');
import Stats from 'Stats';
var {connect} = require('react-redux');

export var Header = React.createClass({
  render: function() {
    return (
      <div className="container">
        <h1>React Roguelike Test</h1>
        <div className="row">
          <div className="col-xs-10">
            <Stats/>
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
