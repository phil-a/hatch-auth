var React = require('react-native');
var {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image
} = React

var Parse = require('parse/react-native');
var Button = require('../common/button');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      username: '',
      password: '',
      errorMessage: ''
    };
  },
  render: function() {
    return (
      <Image source={require('./dock.jpg')} style={styles.container} resizeMode="stretch">
        <Text>Sign In</Text>

        <Text style={styles.label}>Username:</Text>
        <TextInput
        style={styles.input}
        value={this.state.username}
        onChangeText={(text) => this.setState({username: text})}
        />

        <Text style={styles.label}>Password:</Text>
        <TextInput
        secureTextEntry={true}
        style={styles.input}
        value={this.state.password}
        onChangeText={(text) => this.setState({password: text})}
        />
        <Text style={styles.errorText}>{this.state.errorMessage}</Text>
        <Button text={'Sign In'} onPress={this.onPress}/>
        <Button text={'Create an account'} onPress={this.onSignupPress}/>
      </Image>
    );
  },
  onSignupPress: function() {
    this.props.navigator.push({name: 'signup'});
  },
  onPress: function() {
    Parse.User.logIn(this.state.username, this.state.password, {
      success: (user) => { this.props.navigator.immediatelyResetRouteStack([ { name: 'dashboard' } ]); },
      error: (data, error) => { this.setState({ errorMessage: error.message }); }
    });
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: null,
    height: null
  },
  label: {
    fontSize: 18,
    color: 'gray'
  },
  input: {
    padding: 4,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    width: 200,
    alignSelf: 'center'
  },
  errorText: {
    fontSize: 18,
    color: 'red'
  }
});
