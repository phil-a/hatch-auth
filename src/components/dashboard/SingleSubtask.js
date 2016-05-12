var React = require('react-native');
var {
  View,
  Text,
  StyleSheet,
  ScrollView
} = React;

var NavigationBar = require('react-native-navbar');
var moment = require('moment');
var HeatmapCalendar = require('./HeatmapCalendar');

module.exports = React.createClass({
  getDateFromMs: function(ms) {
    return new Date(ms);
  },
  render: function() {
    var _this = this;

    var leftButtonConfig = {
      title: 'Back',
      handler: function onBack() {
        _this.props.navigator.pop();
      }
    };

    var titleConfig = {
      title: this.props.route.subtask.name,
    };

    return (
      <View style={styles.container}>
        <NavigationBar
          title={titleConfig}
          leftButton={leftButtonConfig}
        />
        <ScrollView style={styles.body}>
          {/*<Text>Name: {this.props.route.subtask.name}</Text>
          <Text>Description: {this.props.route.subtask.desc}</Text>
          <Text>Total Done: {this.props.route.subtask.completed.length}</Text>
          {
            this.props.route.subtask.completed.map(function(date, idx) {
              return <Text key={idx}>{_this.getDateFromMs(date).toString()}</Text>
            })
          }*/}
          <HeatmapCalendar completed={this.props.route.subtask.completed}/>
        </ScrollView>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 2,
    borderColor: 'blueviolet'
  },
  body: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: 'deeppink'
  }
});
