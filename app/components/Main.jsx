var React = require('react');
var {connect} = require('react-redux');
import Header from 'Header';
var actions = require('actions');
import Map from 'Map';
import WaterModal from 'WaterModal';
import LavaModal from 'LavaModal';

export var Main = React.createClass({
  propTypes: {
    dungeon: React.PropTypes.object.isRequired,
    character: React.PropTypes.object.isRequired
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
        <WaterModal/>
        <LavaModal/>
      </div>
    );
  }
});

export default connect((state) => {
  return state;
})(Main);
