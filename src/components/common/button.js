var React = require('react-native');

var {
  Text,
  StyleSheet,
  TouchableHighlight
} = React;

module.exports = React.createClass({
  render: function() {
    return (
      <TouchableHighlight
      style={styles.button}
      underlayColor={this.props.underlayColor}
      onPress={this.props.onPress}>
        <Text style={styles.buttonText}>
        {this.props.text}
        </Text>
      </TouchableHighlight>
    );
  }
});

var styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    padding: 15,
    borderColor: 'black',
    backgroundColor: 'rgba(255,255,255,0.25)',
    marginTop: 10
  },
  buttonText: {
    flex: 1,
    fontSize: 20
  }
});
