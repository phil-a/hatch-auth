var React = require('react-native');
var {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  ScrollView
} = React;
var Button = require('../common/button');
var Environment = require('../../config/environment')
var Parse = require('parse/react-native');
import TaskItem from './TaskItem';

module.exports = React.createClass({
  getInitialState: function() {
    return {
      tasks: [],
      loaded: false,
      newTaskName: '',
      newTaskDescription: '',
      newTaskImageURL: '',
    }
  },
  componentDidMount: function() {
    this.getTasks();
  },
  getTasks: function() {
    var _this = this;
    var user = Parse.User.current();
    var Task = Parse.Object.extend("Task");
    var q = new Parse.Query(Task);
    q.equalTo("userId",user);
    q.find({
      success: function(results){
        var tasks = [];
        results.forEach (function(task){
          // var Subtask = Parse.Object.extend("Subtask");
          // var b1 = new Subtask({"name":"Meow", "desc":"Meow description","taskId":task});
          // b1.save();
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
  onNewTaskPress: function() {
    var _this = this;
    var user = Parse.User.current();
    var Task = Parse.Object.extend("Task");
    var newtask = new Task({"name":this.state.newTaskName, "desc":this.state.newTaskDesc,"imageURL":this.state.newTaskImageURL, "userId":user});
    newtask.save(null, {
      success: function(obj) {
        alert('New object created with objectId: ' + obj.id);
        _this.setState({
          newTaskName: '',
          newTaskDesc: '',
          newTaskImageURL: ''
        });
      },
      error: function(obj, error) {
        alert('Failed to create new object, with error code: ' + error.message);
      }
    });
    this.getTasks();
  },
  render: function() {
    var _this = this;
    return (
      <ScrollView tabLabel="ios-checkmark" style={styles.tabView}>
        <View></View>
          {
            this.state.loaded
            ?
            <View>
            {
            this.state.tasks.map(function(item, idx){
              return (
                <TaskItem key={idx} taskRef={item} text={item.name} desc={item.desc} imageURL={item.imageURL} navigator={_this.props.navigator}/>
              );
            })
            }
            <Text style={styles.label}>Task Name:</Text>
            <TextInput
            style={styles.input}
            value={this.state.newTaskName}
            onChangeText={(text) => this.setState({newTaskName: text})}
            />
            <Text style={styles.label}>Task Desc:</Text>
            <TextInput
            style={styles.input}
            value={this.state.newTaskDesc}
            onChangeText={(text) => this.setState({newTaskDesc: text})}
            />
            <Text style={styles.label}>Task Image URL:</Text>
            <TextInput
            style={styles.input}
            value={this.state.newTaskImageURL}
            onChangeText={(text) => this.setState({newTaskImageURL: text})}
            />
            <Button text={'Create Task'} underlayColor={'rgba(0,200,0,0.25)'} onPress={this.onNewTaskPress}/>
            </View>
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
    borderColor: 'deeppink',
    borderWidth: 2,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.01)',
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
});
