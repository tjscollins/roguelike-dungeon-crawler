var React = require('react');

var Header = require('Header');
import Map from 'Map';

var Main = React.createClass({
  render: function() {
    return (
      <div>
        <Header/>
        <Map/>
      </div>
    );
  }
});

module.exports = Main;
