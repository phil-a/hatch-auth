var React = require('react-native');
var {
  StyleSheet,
  Navigator
} = React;

var Parse = require('parse/react-native');
var Signin = require('./components/authentication/signin');
var Signup = require('./components/authentication/signup');
var Dashboard = require('./components/dashboard/dashboard');
var ROUTES = {
  signin: Signin,
  signup: Signup,
  dashboard: Dashboard
};

module.exports = React.createClass({
  componentWillMount: function() {
    Parse.initialize('myAppId','unused');
    Parse.serverURL = 'https://hatch-parse.herokuapp.com/parse';
  },
  renderScene: function(route, navigator) {
    var Component = ROUTES[route.name];
    return <Component route={route} navigator={navigator} />;
  },
  render: function() {
    return (
      <Navigator
      style={styles.container}
      initialRoute={{name: 'signin'}}
      renderScene={this.renderScene}
      configureScene={() => { return Navigator.SceneConfigs.FloatFromRight; }}>
      </Navigator>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
