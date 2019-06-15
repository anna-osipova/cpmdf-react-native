/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  NavigatorIOS,
  StyleSheet
} from 'react-native';

import TaskListView from './app/Components/TaskListView';

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default class TodoApp extends Component {
  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Tasks',
          component: TaskListView,
      }} />
    );
  }
}

AppRegistry.registerComponent('TodoApp', () => TodoApp);
