var React = require('react');
import Stats from 'Stats';
var {connect} = require('react-redux');
var actions = require('actions');

export var Header = React.createClass({
  propTypes: {
    dispatch: React.PropTypes.func.isRequired
  },
  handleClick: function() {
    var {dispatch} = this.props;
    dispatch(actions.toggleDarkness());
  },
  render: function() {
    return (
      <div className="container Header">
        <h1>React Roguelike Test</h1>
        <div className="row">
          <div className="col-xs-2"/>
          <div className="col-xs-8">
            <Stats/>
          </div>
          <div className="col-xs-2">
            <button className="btn btn-secondary" onClick={this.handleClick}>Toggle Darkness</button>
          </div>
        </div>
      </div>
    );
  }
});

export default connect((state) => {
  return state;
})(Header);
