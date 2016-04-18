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
        <TaskItem text="Kitten" desc="This is a cute kitten." imageURL="https://lh6.ggpht.com/sw_iT7GZASdAYeiecsZEHJE-EgDhdK2rCWUzZOJS0OFiGpoi9qn8iMH2nuXHgWg2PA=h900"/>
        <TaskItem text="Puppy" desc="This is a lazy dog." imageURL="http://indiabright.com/wp-content/uploads/2015/12/cute-puppy.jpg"/>
        <TaskItem text="Piglet" desc="This is a happy pig." imageURL="http://s2.favim.com/orig/34/carolina-wang-cute-little-mini-pig-Favim.com-274154.jpg"/>
        <TaskItem text="Fennec" desc="This is a sly fox. This is a sly fox. This is a sly fox. This is a sly fox. This is a sly fox. This is a sly fox. This is a sly fox. This is a sly fox. This is a sly fox. This is a sly fox. This is a sly fox. This is a sly fox. This is a sly fox. This is a sly fox. This is a sly fox. This is a sly fox. This is a sly fox. This is a sly fox. This is a sly fox." imageURL="http://cdn.attackofthecute.com/October-05-2012-02-00-34-nsbdnbfndbfd.jpeg"/>
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
