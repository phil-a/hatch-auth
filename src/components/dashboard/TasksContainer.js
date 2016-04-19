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
      navigator: '',
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
          navigator: this.props.navigator,
          loaded: true,
        });
      })
      .catch(function(error) {
        console.log(error)
      })
     .done();
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
                <TaskItem key={idx} text={item.name} desc={item.desc} imageURL={item.imageURL} navigator={_this.state.navigator}/>
              );
            })
            :
            <View>
            <TaskItem text="Please wait.." desc="We are retrieving your tasks" imageURL="https://i.ytimg.com/vi/pzPxhaYQQK8/maxresdefault.jpg" navigator={this.state.navigator}/>
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
