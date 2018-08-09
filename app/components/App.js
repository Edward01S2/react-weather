var React = require('react');
var ZipCode = require('./ZipCode');
var Forecast = require('./Forecast');
var Detail = require('./Detail');
var ReactRouter = require('react-router-dom');
var images = require.context('../images', true, /\.svg$/);
var BrowserRouter = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;

class App extends React.Component {
  render () {
    return (
      <BrowserRouter>
        <div className='container'>
          <Route render={function (props) {
            return (
              <div className='navbar'>
                <h1>React Weather</h1>
                <ZipCode
                  direction='row'
                  onSubmitZipcode={function(zip){
                    props.history.push({
                      pathname: 'forecast',
                      search: '?zip=' + zip
                    });
                  }}
                  zipcode={123} />
              </div>
            )
          }} />

          <Route exact path='/' render={function (props) {
            return (
              <div className='home-container' style={{backgroundImage: "url('images/pattern.svg')"}}>
                <h1 className='header'>Enter a Zipcode</h1>
                <ZipCode
                  direction='column'
                  onSubmitZipcode={function (zip) {
                    props.history.push({
                      pathname: 'forecast',
                      search: '?zip=' + zip
                    })
                  }}
                  zipcode={123} />
              </div>
            )
          }} />

          <Route path='/forecast' component={Forecast} />
          <Route path='/details/:zip' component={Detail} />
        </div>
      </BrowserRouter>
    )
  }
}

module.exports = App;