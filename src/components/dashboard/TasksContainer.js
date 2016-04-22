var React = require('react-native');
var {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView
} = React;
var Environment = require('../../config/environment')
var Parse = require('parse/react-native');

import TaskItem from './TaskItem';

module.exports = React.createClass({
  getInitialState: function() {
    return {
      tasks: [],
      loaded: false
    }
  },
  componentDidMount: function() {
    var _this = this;
    var user = Parse.User.current();
    var Task = Parse.Object.extend("Task");
    var q = new Parse.Query(Task);
    q.equalTo("userId",user);
    q.find({
      success: function(results){
        var tasks = [];
        results.forEach (function(task){
          tasks.push(task.toJSON());
        });
        _this.setState({
          tasks: tasks,
          loaded: true,
        });
      },
      error: function(results, error) {
        console.log(error.message);
      }
    });
  },
  render: function() {
    var _this = this;
    return (
      <ScrollView tabLabel="ios-checkmark" style={styles.tabView}>
          {
            this.state.loaded
            ?
            this.state.tasks.map(function(item, idx){
              return (
                <TaskItem key={idx} text={item.name} desc={item.desc} imageURL={item.imageURL} navigator={_this.props.navigator}/>
              );
            })
            :
            <View>
              <TaskItem text="Please wait.." desc="We are retrieving your tasks" imageURL="https://i.ytimg.com/vi/pzPxhaYQQK8/maxresdefault.jpg" navigator={this.props.navigator}/>
            </View>
          }
      </ScrollView>
    );
  },

});

var styles = StyleSheet.create({
  tabView: {
    flex: 1,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.01)',
  }
});
