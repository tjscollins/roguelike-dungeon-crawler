var React = require('react');

var LavaModal = () => {
  var randomLava = () => {
    var int = Math.ceil(Math.random() * 3);
    switch (int) {
      case 1:
        return {title: 'A volcanic eruption!', text: 'The fires of this mountain are legendary--and so are the burns you received when the floor melted beneath your feet and gave way to liquid-hot magma.'};
      case 2:
        return {title: 'Just Jump!', text: '"It\'s not much bigger than the fesetival mudpits back home," you tried to tell yourself.  "Just Jump!"  And so you did.  It will take powerful magic to heal these scars now.'};
      case 3:
        return {title: 'Virgins Only', text: 'The fire gods are fickle, and dislike the taste of impure flesh.  Fortunately they have spit you back out again, much less than you were.'};
    }
  };
  var lava = randomLava();
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
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Your Equipment is Melted and the Pain is Excruciating</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LavaModal;
