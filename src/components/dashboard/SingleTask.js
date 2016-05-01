var React = require('react-native');
var {
  View,
  Text,
  TextInput,
  Image,
  ListView,
  ScrollView,
  Component,
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet
} = React;
var Button = require('../common/button');
var NavigationBar = require('react-native-navbar');
import { SwipeListView } from 'react-native-swipe-list-view';
var Parse = require('parse/react-native');
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
var moment = require('moment');

module.exports = React.createClass({

  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
        subtasks: [],
        loaded: false,
        dataSource: ds.cloneWithRows([""]),
        newSubtaskOpen: false,
        newSubtaskName: '',
        newSubtaskDesc: '',
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
        var subtaskNames = [];
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        results.forEach (function(subtask){
          // var Subtask = Parse.Object.extend("Subtask");
          // var t0 = new Subtask({"name":"Meow", "desc":"Meow description","taskId":task});
          // t0.save();
          subtasks.push(subtask.toJSON());
          subtaskNames.push(subtask.toJSON().name);
        });

        _this.setState({
          subtasks: subtasks,
          loaded: true,
          dataSource: ds.cloneWithRows(subtaskNames)
        });
      },
      error: function(results, error) {
        console.log(error.message);
      }
    });
  },
  onNewSubtaskShow: function() {
    this.setState({
      newSubtaskOpen: !this.state.newSubtaskOpen
    });
    console.log(this.state.newSubtaskOpen);
    console.log(this.state.newSubtaskName);
  },
  onNewSubtaskPress: function() {
    var _this = this;
    var task = this.props.route.taskRef;
    task.className = "Task";
    var parsetask = Parse.Object.fromJSON(task);
    var Subtask = Parse.Object.extend("Subtask");
    var newsubtask = new Subtask({"name":this.state.newSubtaskName, "desc":this.state.newSubtaskDesc,"imageURL":this.state.newSubtaskImageURL, "taskId":parsetask, "completed":[] });
    newsubtask.save(null, {
      success: function(obj) {
        alert('New object created with objectId: ' + obj.id);
        _this.setState({
          newSubtaskName: '',
          newSubtaskDesc: '',
          newSubtaskImageURL: '',
          newSubtaskOpen: false
        });
      },
      error: function(obj, error) {
        alert('Failed to create new object, with error code: ' + error.message);
      }
    });
  },
  onSubtaskPress(data){
      //Retrieve subtask
      var _this = this;
      var indexRetrieved = null;
      this.state.subtasks.map(function(subtask, i) {
        (subtask.name == data) ? indexRetrieved = i : null;
      });
      // Push new navigator view
      this.props.navigator.push({
        name: 'singlesubtask',
        subtask: this.state.subtasks[indexRetrieved]
      });
    },
  onCompletedPress(data){
    //Retrieve subtask and update
    var _this = this;
    var indexToUpdate = null
    this.state.subtasks.map(function(subtask, i) {
      (subtask.name == data) ? indexToUpdate = i : null;
    });
    this.state.subtasks[indexToUpdate].completed.push(new Date());

    //Update Subtask on parse server
    var Subtask = Parse.Object.extend("Subtask");
    var query = new Parse.Query(Subtask);
    query.equalTo("objectId", _this.state.subtasks[indexToUpdate].objectId);
    query.first({
      success: function(object) {
        object.set("completed", _this.state.subtasks[indexToUpdate].completed);
        object.save();
        console.log('Successfully updated subtask');
      },
      error: function(error) {
        alert("Error: " + error.code + " " + error.message);
      }
    });
  },
  render: function() {
    var _this = this;
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

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
      <View style={styles.container}>
        <NavigationBar
          title={titleConfig}
          rightButton={rightButtonConfig}
          leftButton={leftButtonConfig}
        />
        <View style={styles.body}>
        <Image source={{uri: this.props.route.imageURL}} resizeMode='cover' style={styles.card}>
          <View style={styles.taskHeader}><Text style={styles.taskHeaderText}>{this.props.route.text}</Text></View>
          <View style={styles.taskBody}><Text style={styles.taskBodyText}>{this.props.route.desc}</Text></View>
        </Image>

        {
          this.state.newSubtaskOpen
          ?
          <View>
            <Text style={styles.label}>Subtask Name:</Text>
            <TextInput
            style={styles.input}
            value={this.state.newSubtaskName}
            onChangeText={(text) => this.setState({newSubtaskName: text})}
            />
            <Text style={styles.label}>Subtask Desc:</Text>
            <TextInput
            style={styles.input}
            value={this.state.newSubtaskDesc}
            onChangeText={(text) => this.setState({newSubtaskDesc: text})}
            />
            <Button text={'Create Subtask'} underlayColor={'rgba(0,200,0,0.25)'} onPress={this.onNewSubtaskPress}/>
          </View>
          :
          <Text></Text>
        }

        {
          this.state.loaded
          ?
        <SwipeListView
					dataSource={this.state.dataSource}
					renderRow={ data => (
						<TouchableHighlight
							onPress={ _ => this.onSubtaskPress(data) }
							style={styles.rowFront}
							underlayColor={'rgba(255,255,255,0.90)'}
						>
							<View>
								<Text>Do: {data} <Icon name="heart" size={20} color="black" /></Text>
							</View>
						</TouchableHighlight>
					)}
					renderHiddenRow={ (data, secId, rowId, rowMap) => (
						<View style={styles.rowBack}>
							<TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnLeft]} onPress={ _ => this.onCompletedPress(data) }>
								<Text style={styles.backTextWhite}>D<Icon name="happy" size={15} color="white" />NE</Text>
							</TouchableOpacity>
							<TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]} onPress={  _ => console.log(' You touched %c'+ data, 'background: #ff0000; color: #fff') }>
                <Text style={styles.backTextWhite}>N<Icon name="sad-outline" size={15} color="white" />PE</Text>
							</TouchableOpacity>
						</View>
					)}
					leftOpenValue={75}
					rightOpenValue={-75}
				>
        </SwipeListView>
        :
          <Text>Loading Subtasks...</Text>
        }
        <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item buttonColor='#9b59b6' title="New Subtask" onPress={() => this.onNewSubtaskShow()}>
            <Icon name="android-create" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#3498db' title="Notifications" onPress={() => {}}>
            <Icon name="android-notifications-none" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#1abc9c' title="All Tasks" onPress={() => {}}>
            <Icon name="android-done-all" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
        </View>
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
  navbar: {
    backgroundColor: 'lightgreen'
  },
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
  body: {
    flex: 1,
    borderWidth: 2,
    borderColor: 'deeppink'
  },
  taskHeader: {
    alignSelf: 'stretch',
    backgroundColor: 'rgba(0,0,0,0.35)',
    padding: 10,
  },
  taskBody: {
    alignSelf: 'stretch',
    backgroundColor: 'rgba(0,0,0,0.35)',
    padding: 2,
  },
  taskHeaderText: {
    alignSelf: 'center',
    fontSize: 20,
    color: 'whitesmoke',
  },
  taskBodyText: {
    justifyContent: 'flex-end',
    fontSize: 15,
    color: 'linen',
  },
  swipeList: {
    borderWidth: 2,
    borderColor: 'orange'
  },
	backTextWhite: {
		color: '#FFF'
	},
	rowFront: {
		alignItems: 'center',
		backgroundColor: 'ghostwhite',
		borderColor: 'gainsboro',
		borderWidth: 1,
    margin: 4,
		justifyContent: 'center',
		height: 50,
	},
	rowBack: {
		alignItems: 'center',
		backgroundColor: '#FFF',
		flex: 1,
		flexDirection: 'row',
    margin: 2,
		justifyContent: 'space-between',
		paddingLeft: 15,
	},
	backRightBtn: {
		alignItems: 'center',
		bottom: 0,
		justifyContent: 'center',
		position: 'absolute',
		top: 0,
		width: 75
	},
	backRightBtnLeft: {
		backgroundColor: 'turquoise',
		right: 0
	},
	backRightBtnRight: {
		backgroundColor: 'tomato',
		left: 0
	},
  actionButtonIcon: {
  fontSize: 20,
  height: 22,
  color: 'white',
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
