var React = require('react-native');
var {
  View,
  Text,
  Image,
  StyleSheet
} = React;

var NavigationBar = require('react-native-navbar');

module.exports = React.createClass({

  render: function() {
    var _this = this;

    var leftButtonConfig = {
      title: 'Back',
      handler: function onBack() {
        _this.props.navigator.pop();
      }
    };

    var rightButtonConfig = {
      title: 'Edit',
      handler: function onNext() {
        alert('edit mode!');
      }
    };

    var titleConfig = {
      title: this.props.route.text,
    };

    return (
      <View>
        <NavigationBar
          title={titleConfig}
          rightButton={rightButtonConfig}
          leftButton={leftButtonConfig}
        />
        <Image source={{uri: this.props.route.imageURL}} resizeMode='cover' style={styles.card}>
          <View style={styles.header}><Text style={styles.headerText}>{this.props.route.text}</Text></View>
          <View style={styles.body}><Text style={styles.bodyText}>{this.props.route.desc}</Text></View>
        </Image>
      </View>
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
