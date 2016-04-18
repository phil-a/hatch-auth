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
    fetch("https://parseapi.back4app.com/classes/Task", {
      headers: {
        "X-Parse-Application-Id": Environment.PARSE_APP_ID,
        "X-Parse-REST-API-Key": Environment.PARSE_RESTAPI_KEY
      }
    })
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          tasks: responseData.results,
          loaded: true,
        })
        console.log("success");
        console.log(this.state.tasks);
      })
      .catch(function(error) {
        console.log("error");
        console.log(error)
      })
     .done();
  },
  render: function() {
    return (
      <ScrollView tabLabel="ios-checkmark" style={styles.tabView}>
          {
            this.state.loaded
            ?
            this.state.tasks.map(function(item, idx){
              return <TaskItem key={idx} text={item.name} desc={item.desc} imageURL={item.imageURL}/>
            })
            :
            <TaskItem text="Please wait.." desc="We are retrieving your tasks" imageURL="https://i.ytimg.com/vi/pzPxhaYQQK8/maxresdefault.jpg" />
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
