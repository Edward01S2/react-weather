
var React = require('react');
var DayItem = require('./DayItem');
var convertTemp = require('../utils/helpers').convertTemp;

class Detail extends React.Component {
  render() {
    var props = this.props.location.state;
    //console.log(props);
    return (
      <div>
        <DayItem day={props} />
        <div className='description-container'>
          <p>{props.weather[0].description}</p>
          <p>max temp: {convertTemp(props.temp.max)} degrees</p>
          <p>min temp: {convertTemp(props.temp.min)} degrees</p>
          <p>humidity: {props.humidity}</p>
        </div>
      </div>
    )
  }
}

module.exports = Detail;