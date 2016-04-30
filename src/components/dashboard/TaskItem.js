var React = require('react-native');
var {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet
} = React;

module.exports = React.createClass({
  _onPressTask(){
    this.props.navigator.push({
      name: 'singletask',
      key: this.props.idx,
      taskRef: this.props.taskRef,
      text: this.props.text,
      desc: this.props.desc,
      imageURL: this.props.imageURL
    });
  },
  render: function() {
    return (
      <TouchableOpacity onPress={() => this._onPressTask()}>
        <Image source={{uri: this.props.imageURL}} resizeMode='cover' style={styles.card}>
          <View style={styles.header}><Text style={styles.headerText}>{this.props.text}</Text></View>
          <View style={styles.body}><Text style={styles.bodyText}>{this.props.desc}</Text></View>
        </Image>
      </TouchableOpacity>
    );
  }
});

var styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.1)',
    margin: 5,
    height: 150,
    shadowColor: '#ccc',
    shadowOffset: { width: 2, height: 2, },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  header: {
    alignSelf: 'stretch',
    backgroundColor: 'rgba(0,0,0,0.35)',
    padding: 10,
  },
  body: {
    alignSelf: 'stretch',
    backgroundColor: 'rgba(0,0,0,0.35)',
    padding: 2,
  },
  headerText: {
    alignSelf: 'center',
    fontSize: 20,
    color: 'whitesmoke',
  },
  bodyText: {
    justifyContent: 'flex-end',
    fontSize: 15,
    color: 'linen',
  }
});
