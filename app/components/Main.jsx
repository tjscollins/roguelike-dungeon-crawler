var React = require('react');

var Header = require('Header');
var Map = require('Map');

var Main = React.createClass({
  render: function () {
    return (
      <div>
        <Header/>
        <Map/>
      </div>
    );
  }
});

module.exports = Main;
