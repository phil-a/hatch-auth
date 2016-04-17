var React = require('react-native');
var {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView
} = React;

import TaskItem from './TaskItem';

module.exports = React.createClass({
  render: function() {
    return (
      <ScrollView tabLabel="ios-checkmark" style={styles.tabView}>
        <TaskItem />
        <TaskItem />
        <TaskItem />
        <TaskItem />
      </ScrollView>
    );
  }
});

var styles = StyleSheet.create({
  tabView: {
    flex: 1,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.01)',
  }
});
