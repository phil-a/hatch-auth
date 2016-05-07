var React = require('react-native');
var {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
} = React;

var moment = require('moment');

module.exports = React.createClass({

  getInitialState: function() {
    return {
      displayObj: []
    }
  },

  _onPressButton: function(e) {
    alert('pressed ' + e.target);
  },

  componentDidMount: function() {
    var displayObj = this.dateCalculations();
    this.setState({ displayObj: displayObj}, function() {
      console.log(displayObj);
    });
  },

  dateCalculations: function() {
    var _this = this;
    if (this.props.completed.length !== 0){
      var lastCompleted = this.getDateFromMs(this.props.completed[this.props.completed.length-1])
      var lastThirtyDays = [];
      for (var i=0; i<30; i++){
        //create array of last 30 days
        var d = new Date();
        var count = 0;
        d.setDate(lastCompleted.getDate()-i);

        //compare each dateInMs to lastThirtyDays
        this.props.completed.map(function(ms) {
          var completedDate = _this.getDateFromMs(ms);
          if (_this.formatDate(completedDate) == _this.formatDate(d)){
            count++;
          }
        });

        //push object into array
        var dateUnit = {date: d, count: count};
        lastThirtyDays.push(dateUnit);
      }
      return lastThirtyDays;
    }
  },

  getDateFromMs: function(ms) {
    return new Date(ms);
  },

  formatDate: function(date) {
    return date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate();
  },

  render: function() {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
        {
          (this.props.completed.length !== 0)
          ?
          this.state.displayObj.map(function(d, idx) {
            return (
              <TouchableHighlight onPress={ _ => alert("click dateUnit") } key={idx} style={[styles.square, {backgroundColor: 'rgba(0,200,200,'+d.count*0.1+')'}]} underlayColor={'rgba(200,0,0,0.75)'}>
                <View/>
              </TouchableHighlight>
            );
          })
          :
          <Text>Nothing</Text>
        }
        </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: 'blueviolet'
  },
  body: {
    flex: 1,
    borderWidth: 2,
    borderColor: 'deeppink'
  },
  row: {
    borderWidth: 1,
    borderColor: 'red',
    alignItems: 'flex-end',
  },
  square: {
    borderWidth: 1,
    borderColor: 'orange',
    backgroundColor: 'lightgray',
    width: 30,
    height: 30
  },
  currentSquare: {
    backgroundColor: 'orange'
  }
});
