import React from 'react';

var LavaModal = ({lava}) => {
  return (
    <div id="Lava-Modal" className="modal fade">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            <h4 className="modal-title">{lava.title}</h4>
          </div>
          <div className="modal-body">
            <p>{lava.text}</p>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" type="button" onClick={lava.random} data-dismiss="modal">Your Equipment is Melted and the Pain is Excruciating</button>
          </div>
        </div>
      </div>
    </div>
  );
};

LavaModal.propTypes = {
  lava: React.PropTypes.object.isRequired
};

export default LavaModal;
