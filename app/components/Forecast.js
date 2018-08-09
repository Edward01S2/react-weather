var React = require('react');
var api = require('../utils/api');
var DayItem = require('./DayItem');
var queryString = require('query-string');
var utils = require('../utils/helpers');

class Forecast extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      forecastData: [],
      loading: true
    }

    this.makeRequest = this.makeRequest.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    this.zip = queryString.parse(this.props.location.search).zip;
    this.makeRequest(this.zip);
  }
  componentWillReceiveProps(nextProps) {
    this.zip = queryString.parse(nextProps.location.search).zip;
    this.makeRequest(this.zip);
  }
  makeRequest(zip) {
    this.setState(function () {
      return {
        loading: true
      }
    })

    api.getForecast(zip)
      .then(function (res) {
        console.log(res);
        this.setState(function () {
          return {
            loading: false,
            forecastData: res,
          }
        })
      }.bind(this))
  }

  handleClick(zip) {
    this.props.history.push({
      pathname: '/details/' + this.zip,
      state: zip,
    })
  }

  render() {
    return this.state.loading === true
      ? <h1 className='forecast-header'> Loading </h1>
      : <div>
          <h1 className='forecast-header'>{ this.state.forecastData.city.name }</h1>
          <div className='forecast-container'>
            {this.state.forecastData.list.map(function (listItem) {
              return <DayItem onClick={this.handleClick.bind(this, listItem)} key={listItem.dt} day={listItem}/>
            }, this)}
          </div>
        </div>
  }
}

module.exports = Forecast;