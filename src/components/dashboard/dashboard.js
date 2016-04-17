var React = require('react-native');

var {
  View,
  Text,
  StyleSheet,
  Image
} = React;

var Parse = require('parse/react-native');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      user: null
    };
  },
  componentWillMount: function() {
    Parse.User.currentAsync()
      .then((user) => { this.setState({user: user}); })
  },

  render: function() {
    if (!this.state.user) {
      return <Text>Loading...</Text>
    }

    var username = this.state.user.get('username');
    return (
      <Image source={require('./talltrees.jpg')} style={styles.container} resizeMode="cover">
        <Text>Welcome back, {username}</Text>
      </Image>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: null,
    height: null
  }
});
