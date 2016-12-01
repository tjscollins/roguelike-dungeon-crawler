var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');

export var BossModal = React.createClass({
  propTypes: {
    dungeon: React.PropTypes.object.isRequired,
    dispatch: React.PropTypes.func.isRequired
  },
  render: function() {
    var {dispatch} = this.props;
    var reset = () => {
      dispatch(actions.resetCharacter());
      dispatch(actions.resetDungeon());
      dispatch(actions.generateDungeonLevel(100, 100, 0));
    };
    return (
      <div id="Boss-Modal" className="modal fade">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 className="modal-title">Victory is Yours!</h4>
            </div>
            <div className="modal-body">
              <p>You did it! You braved rushing waters, boiling lava, horrid monsters, questionable quaffables, and you survived. This is the end. The Big Bad is dead and your future is your own. What will you make of it?</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-info" data-dismiss="modal">Retire</button>
              <button onClick={reset} type="button" className="btn btn-secondary" data-dismiss="modal">Take on Evil Again</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

export default connect((state) => {
  return state;
})(BossModal);
