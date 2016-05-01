var React = require('react-native');
var {
  StyleSheet,
  Navigator
} = React;

var Environment = require('./config/environment')
var Parse = require('parse/react-native');
var Signin = require('./components/authentication/signin');
var Signup = require('./components/authentication/signup');
var Dashboard = require('./components/dashboard/dashboard');
var SingleTask = require('./components/dashboard/SingleTask');
var SingleSubtask = require('./components/dashboard/SingleSubtask');
var ROUTES = {
  signin: Signin,
  signup: Signup,
  dashboard: Dashboard,
  singletask: SingleTask,
  singlesubtask: SingleSubtask
};

module.exports = React.createClass({
  componentWillMount: function() {
    Parse.initialize(Environment.PARSE_APP_ID, Environment.PARSE_API_KEY);
    Parse.serverURL = 'https://parseapi.back4app.com';
  },
  renderScene: function(route, navigator) {
    var Component = ROUTES[route.name];
    return <Component route={route} navigator={navigator} />;
  },
  render: function() {
    return (
      <Navigator
      style={styles.container}
      initialRoute={{name: 'dashboard'}}
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
