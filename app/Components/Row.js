import React from 'react';
import { TouchableHighlight, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import SwipeOut from 'react-native-swipeout';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    fontSize: 16,
  }
});

const Row = (props) => {
  const swipeOutButtons = [{
    text: 'Delete',
    backgroundColor: '#FF0000',
    color: '#FFF',
    onPress: () => props.deleteCb(props.task)
  }];

  return (
    <SwipeOut right={swipeOutButtons} autoClose={true}>
      <TouchableHighlight style={[
        styles.container,
        { backgroundColor: props.task.completed ? '#55EE55' : null }
      ]}
        onPress={() => props.pressCb(props.task)}
        underlayColor='#c8c7cc'
      >
        <Text style={styles.text}>{props.task.text}</Text>
      </TouchableHighlight>
    </SwipeOut>
  );
};

Row.propTypes = {
  task: PropTypes.object,
  pressCb: PropTypes.func,
  deleteCb: PropTypes.func
};

export default Row;
