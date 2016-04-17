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
      <Image source={require('./dock.jpg')} style={styles.container} resizeMode="cover">
        <Text style={styles.errorText}>{this.state.errorMessage}</Text>
        <Text>Sign In</Text>
          <View style={styles.formContainer}>
            <Text style={styles.label}>Email:</Text>
            <TextInput
            style={styles.input}
            keyboardType={'email-address'}
            value={this.state.username}
            onChangeText={(text) => this.setState({username: text.trim().toLowerCase()})}
            />

            <Text style={styles.label}>Password:</Text>
            <TextInput
            secureTextEntry={true}
            style={styles.input}
            value={this.state.password}
            onChangeText={(text) => this.setState({password: text})}
            />
          </View>
        <View style={styles.buttonContainer}>
          <Button text={'Sign In'} underlayColor={'rgba(0,200,0,0.25)'} onPress={this.onPress}/>
          <Button text={'Create an account'} underlayColor={'rgba(0,100,200,0.25)'} onPress={this.onSignupPress}/>
        </View>
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
