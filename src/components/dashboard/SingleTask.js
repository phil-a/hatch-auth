var React = require('react-native');
var {
  View,
  Text,
  Image,
  StyleSheet
} = React;

var NavigationBar = require('react-native-navbar');
var Parse = require('parse/react-native');

module.exports = React.createClass({

  getInitialState: function() {
    return {
        subtasks: [],
        loaded: false
    }
  },

  componentDidMount: function() {
    this.getSubtasks();
  },

  getSubtasks: function() {
    var _this = this;
    var task = this.props.route.taskRef;
    task.className = "Task";
    var parsetask = Parse.Object.fromJSON(task);
    var Subtask = Parse.Object.extend("Subtask");
    var q = new Parse.Query(Subtask);
    q.equalTo("taskId",parsetask);
    q.find({
      success: function(results){
        var subtasks = [];
        results.forEach (function(subtask){
          // var Subtask = Parse.Object.extend("Subtask");
          // var t0 = new Subtask({"name":"Meow", "desc":"Meow description","taskId":task});
          // t0.save();
          subtasks.push(subtask.toJSON());
        });
        _this.setState({
          subtasks: subtasks,
          loaded: true
        });
      },
      error: function(results, error) {
        console.log(error.message);
      }
    });
  },
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
        <Text> {
          this.state.loaded
          ?
          "Name:" + this.state.subtasks[0].name + "Desc: " + this.state.subtasks[0].desc
          :
          'Loading...'
        } </Text>
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
