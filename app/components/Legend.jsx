var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');

export var Legend = React.createClass({
  render: function() {
    return (
      <div className="container Legend">
        <h3>Visual Guide</h3>

        <div className="row">
          <div className="mob col-xs-12"></div>
          <div className="colxs-11">
            <p>
              An enemy. The denizens of this dungeon of despair range in strength and appearance but they will all eat you if given the chance.
            </p>
          </div>
        </div>

        <div className="row">
          <div className="boss col-xs-12"></div>
          <div className="colxs-11">
            <p>
              The Lord of Lies, the Prince of Pain, the Duke of Death. He killed your father. He is not prepared to die.
            </p>
          </div>
        </div>

        <div className="row">
          <div className="hpitem col-xs-12"></div>
          <div className="colxs-11">
            <p>
              Scattered throughout the dungeon are these refreshing liquids of unknown origin. Drink at your own risk.
            </p>
          </div>
        </div>

        <div className="row">
          <div className="weapon col-xs-12"></div>
          <div className="colxs-11">
            <p>
              Don't worry Punchy--you may have entered this dungeon wielding only your fists, but the baddies have plenty of weapons to spare.
            </p>
          </div>
        </div>

        <div className="row">
          <div className="downstairs col-xs-12"></div>
          <div className="colxs-11">
            <p>
              Descend deeper into the dungeon, if you dare.
            </p>
          </div>
        </div>

        <div className="row">
          <div className="player-start col-xs-12"></div>
          <div className="colxs-11">
            <p>
              The way back up, if your courage fails you.
            </p>
          </div>
        </div>

        <div className="row">
          <div className="water col-xs-12"></div>
          <div className="colxs-11">
            <p>
              Water flows downhill after all, and sometimes it stays there.
            </p>
          </div>
        </div>

        <div className="row">
          <div className="lava col-xs-12"></div>
          <div className="colxs-11">
            <p>
              Sometimes you go to Hell, and sometimes Hell comes to you. With lava.
            </p>
          </div>
        </div>
      </div>
    );
  }
});

export default connect((state) => {
  return state;
})(Legend);
