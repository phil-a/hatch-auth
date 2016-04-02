var React = require('react-native');
var {
  Text,
  View,
  StyleSheet,
  TextInput
} = React;

var Parse = require('parse/react-native');
var Button = require('../common/button');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      username: '',
      password: '',
      passwordConfirmation: '',
      errorMessage: ''
    };
  },
  render: function() {
    return (
      <View style={styles.container}>
        <Text>Sign Up</Text>

        <Text style={styles.label}>Username:</Text>
        <TextInput
          value={this.state.username}
          onChangeText={(text) => this.setState({username: text})}
          style={styles.input} />

          <Text style={styles.label}>Password:</Text>
          <TextInput
            secureTextEntry={true}
            value={this.state.password}
            onChangeText={(text) => this.setState({password: text})}
            style={styles.input} />

          <Text style={styles.label}>Confirm Password: </Text>
          <TextInput
            secureTextEntry={true}
            value={this.state.passwordConfirmation}
            onChangeText={(text) => this.setState({passwordConfirmation: text})}
            style={styles.input} />
          <Text style={styles.errorText}>{this.state.errorMessage}</Text>
          <Button text={'Signup'} onPress={this.onSignupPress} />
          <Button text={'I have an account'} onPress={this.onSigninPress} />
      </View>
    );
  },
  onSignupPress: function() {
    if (this.state.password !== this.state.passwordConfirmation) {
      return this.setState({errorMessage: 'Your passwords do not match'});
    }

    var user = new Parse.User();
    user.set('username', this.state.username);
    user.set('password', this.state.password);

    user.signUp(null, {
      success: (user) => { console.log(user); },
      error: (user, error) => { console.log(error); }
    });
  },
  onSigninPress: function() {
    this.props.navigator.pop();
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
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
