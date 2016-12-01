var React = require('react');

var WaterModal = () => {
  var randomWater = () => {
    var int = Math.ceil(Math.random() * 3);
    switch (int) {
      case 1:
        return {title: 'A sinkhole opens up!', text: 'Unprepared for the sudden dip you find yourself weakened by the cold, deathly chill of the water.  You climb out, but you know you\'ll be less effective in combat...'};
      case 2:
        return {title: 'Man-eating Piranhas!', text: 'The puddle looked safe enough, but as you swim across it you realize you are not alone.  You survive the pesky little nibblers, but the bleeding wounds they left behind are sure to attract the monsters in the dark...'};
      case 3:
        return {title: 'Cenote', text: 'The deep, dark water looked refreshing, until you noticed the piles of bones at the bottom and the sacrifical altar on the shore. Shaken and afraid, you clamber out the other side, unready for what lies ahead in the dark...'};
    }
  };
  var water = randomWater();
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

export default WaterModal;
