var React = require('react-native');
var {
  Text,
  View,
  StyleSheet,
  TextInput,
  Image
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
      <Image source={require('./dock.jpg')} style={styles.container} resizeMode="stretch">
        <Text style={styles.errorText}>{this.state.errorMessage}</Text>
        <Text>Sign Up</Text>
        <View style={styles.formContainer}>
          <Text style={styles.label}>Email:</Text>
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
        </View>
        <View style={styles.buttonContainer}>
          <Button text={'Signup'} underlayColor={'rgba(0,200,0,0.25)'} onPress={this.onSignupPress} />
          <Button text={'I have an account'} underlayColor={'rgba(0,100,200,0.25)'} onPress={this.onSigninPress} />
        </View>
      </Image>
    );
  },
  onSignupPress: function() {
    if (this.state.password !== this.state.passwordConfirmation) {
      return this.setState({errorMessage: 'Your passwords do not match'});
    }

    var user = new Parse.User();
    user.set('username', this.state.username.trim().toLowerCase());
    user.set('password', this.state.password);
    user.setEmail(this.state.username.trim().toLowerCase());
    user.signUp(null, {
      success: (user) => { this.props.navigator.immediatelyResetRouteStack([ { name: 'dashboard' } ]); },
      error: (user, error) => { this.setState({ errorMessage: error.message }); }
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
  },
  buttonContainer: {
    flex: 1,
    alignSelf: 'stretch',
    padding: 30
  },
  formContainer: {
    flex: 3,
    justifyContent: 'center'
  }
});
