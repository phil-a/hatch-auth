var React = require('react-native');
var {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView
} = React;

var Parse = require('parse/react-native');
import FacebookTabBar from './FacebookTabBar';
import TasksContainer from './TasksContainer';
import ScrollableTabView, { DefaultTabBar, ScrollableTabBar, } from 'react-native-scrollable-tab-view';

module.exports = React.createClass({
  getInitialState: function() {
    return {
      user: null
    };
  },
  componentWillMount: function() {
    Parse.User.currentAsync()
      .then((user) => { this.setState({user: user}); })
  },

  render: function() {
    if (!this.state.user) {
      return <Text>Loading...</Text>
    }

    var username = this.state.user.get('username');
    return (

      <View style={styles.container}>
            <ScrollableTabView initialPage={0} renderTabBar={() => <FacebookTabBar />}>
              <TasksContainer tabLabel="ios-checkmark-outline" />
              <ScrollView tabLabel="ios-search" style={styles.tabView}>
                <View style={styles.card}>
                  <Text>Friends</Text>
                </View>
              </ScrollView>
              <ScrollView tabLabel="ios-chatboxes-outline" style={styles.tabView}>
                <View style={styles.card}>
                  <Text>Messenger</Text>
                </View>
              </ScrollView>
              <ScrollView tabLabel="ios-world-outline" style={styles.tabView}>
                <View style={styles.card}>
                  <Text>Notifications</Text>
                </View>
              </ScrollView>
              <ScrollView tabLabel="ios-cog-outline" style={styles.tabView}>
                <View style={styles.card}>
                  <Text>Other nav</Text>
                </View>
              </ScrollView>
            </ScrollableTabView>
          </View>

    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
  tabView: {
    flex: 1,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.01)',
  },
  card: {
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.1)',
    margin: 5,
    height: 150,
    padding: 15,
    shadowColor: '#ccc',
    shadowOffset: { width: 2, height: 2, },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  icon: {
    width: 300,
    height: 300,
    alignSelf: 'center',
  },
});
