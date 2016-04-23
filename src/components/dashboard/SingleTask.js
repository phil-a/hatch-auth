var React = require('react-native');
var {
  View,
  Text,
  Image,
  ListView,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet
} = React;

var NavigationBar = require('react-native-navbar');
import { SwipeListView } from 'react-native-swipe-list-view';
var Parse = require('parse/react-native');

module.exports = React.createClass({

  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
        subtasks: [],
        loaded: false,
        dataSource: ds.cloneWithRows([""]),
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

        {
          this.state.loaded
          ?
        <SwipeListView
					dataSource={this.state.dataSource}
					renderRow={ data => (
						<TouchableHighlight
							onPress={ _ => console.log('You touched '+ data) }
							style={styles.rowFront}
							underlayColor={'rgba(255,255,255,0.90)'}
						>
							<View>
								<Text>I'm {data} in a SwipeListView</Text>
							</View>
						</TouchableHighlight>
					)}
					renderHiddenRow={ (data, secId, rowId, rowMap) => (
						<View style={styles.rowBack}>
							<TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnLeft]} onPress={ _ => console.log(' You touched %c'+ data, 'background: #0000ff; color: #fff') }>
								<Text style={styles.backTextWhite}>Right</Text>
							</TouchableOpacity>
							<TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]} onPress={  _ => console.log(' You touched %c'+ data, 'background: #ff0000; color: #fff') }>
								<Text style={styles.backTextWhite}>Left</Text>
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
  },
	container: {
		backgroundColor: 'white',
		flex: 1
	},
	backTextWhite: {
		color: '#FFF'
	},
	rowFront: {
		alignItems: 'center',
		backgroundColor: 'ghostwhite',
		borderColor: 'gainsboro',
		borderWidth: 1,
    margin: 5,
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
		backgroundColor: 'blue',
		right: 0
	},
	backRightBtnRight: {
		backgroundColor: 'red',
		left: 0
	}

});
