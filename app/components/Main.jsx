var React = require('react');
var {connect} = require('react-redux');
import Header from 'Header';
var actions = require('actions');
var $ = require('jquery');
import Map from 'Map';
import WaterModal from 'WaterModal';
import LavaModal from 'LavaModal';
import DeathModal from 'DeathModal';

export var Main = React.createClass({
  propTypes: {
    dungeon: React.PropTypes.object.isRequired,
    character: React.PropTypes.object.isRequired
  },
  componentWillMount: function() {
    // var {dungeon, character, dispatch} = this.props;
    // dispatch(actions.placeCharacterStart(character, dungeon.levels[0]));
  },
  render: function() {
    var {character, dispatch} = this.props;
    if (character.health < 0) {
      $('#Death-Modal').modal('toggle');
    }
    return (
      <div>
        <Header/>
        <Map/>
        <DeathModal/>
        <WaterModal/>
        <LavaModal/>
      </div>
    );
  }
});

export default connect((state) => {
  return state;
})(Main);
