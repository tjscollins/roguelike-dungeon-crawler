import React from 'react';
import {connect} from 'react-redux';

var WaterModal = (props) => {
  var {water} = props.dungeon;
  return (
    <div id="Water-Modal" className="modal fade">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            <h4 className="modal-title">{water.title}</h4>
          </div>
          <div className="modal-body">
            <p>{water.text}</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Continue in Your Weakened State</button>
          </div>
        </div>
      </div>
    </div>
  );
};

WaterModal.propTypes = {
  dungeon: React.PropTypes.object.isRequired
};

export default connect((state) => {
  return state;
})(WaterModal);
