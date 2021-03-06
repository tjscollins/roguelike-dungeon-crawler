import React from 'react';
import {connect} from 'react-redux';
import * as actions from 'actions';

export var DeathModal = React.createClass({
  propTypes: {
    dispatch: React.PropTypes.func.isRequired
  },
  render: function() {
    var {dispatch} = this.props;
    var reset = () => {
      dispatch(actions.resetCharacter());
      dispatch(actions.resetDungeon());
      dispatch(actions.generateDungeonLevel(100, 100, 0, true));
    };
    return (
      <div id="Death-Modal" className="modal fade">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 className="modal-title">Here Lies You<br/>RIP</h4>
            </div>
            <div className="modal-body">
              <p>There's no point in sugar coating this--you messed up.<br/>You're dead.</p>
            </div>
            <div className="modal-footer">
              <button onClick={reset} type="button" className="btn btn-secondary" data-dismiss="modal">Better Luck Next Life</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

export default connect((state) => {
  return state;
})(DeathModal);
