var React = require('react');
var {connect} = require('react-redux');
import Header from 'Header';
var actions = require('actions');
import Map from 'Map';

export var Main = React.createClass({
  propTypes: {
    dungeon: React.PropTypes.object.isRequired,
    character: React.PropTypes.object.isRequired,
    dispatch: React.PropTypes.function
  },
  componentWillMount: function() {
    var {dungeon, character, dispatch} = this.props;
    dispatch(actions.placeCharacterStart(character, dungeon.levels[0]));
  },
  render: function() {
    return (
      <div>
        <Header/>
        <Map/>
      </div>
    );
  }
});

export default connect((state) => {
  return state;
})(Main);
