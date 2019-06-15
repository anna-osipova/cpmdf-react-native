import React, { Component } from 'react';
import {
  ListView,
  StyleSheet,
  View,
  AlertIOS
} from 'react-native';

import Row from './Row';
import Header from './Header';
import Footer from './Footer';
import Api from '../Services/RestService';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  listview: {
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  }
});

export default class TaskListView extends Component {
  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      tasks: [],
      dataSource: ds.cloneWithRows([])
    };

    this.fetchData();

    this.onSearchChange = this.onSearchChange.bind(this);
    this.onItemClick = this.onItemClick.bind(this);
    this.onItemDelete = this.onItemDelete.bind(this);
    this.onAddItemClick = this.onAddItemClick.bind(this);
  }
  fetchData() {
    Api.getTasks()
      .then((tasks) => {
        this.setState({
          tasks,
          dataSource: this.state.dataSource.cloneWithRows(tasks)
        });
      });
  }
  onSearchChange(searchString) {
    if (searchString == '') {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.state.tasks)
      });
    } else {
      const filteredTasks = this.state.tasks
        .filter((t) => t.text.toLowerCase().indexOf(searchString.toLowerCase()) > -1);

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(filteredTasks)
      });
    }
  }
  onItemClick(_task) {
    const tasks = this.state.tasks.slice();
    const i = tasks.findIndex((t) => t._id === _task._id);

    tasks[i] = {...tasks[i], completed: true};

    Api.updateTask(tasks[i]).then(() => {
      this.setState({
        tasks,
        dataSource: this.state.dataSource.cloneWithRows(tasks)
      });
    });
  }
  onItemDelete(_task) {
    const tasks = this.state.tasks.slice().filter((t) => t._id !== _task._id);
    this.setState({
      tasks,
      dataSource: this.state.dataSource.cloneWithRows(tasks)
    });

    Api.deleteTask(_task).catch(() => this.fetchData());
  }
  onAddItemClick() {
    AlertIOS.prompt(
      'New task',
      null,
      text => this.addNewItem(text)
    );
  }
  addNewItem(text) {
    Api.addTask({
      text,
      completed: false
    }).then((task) => {
      const tasks = this.state.tasks.slice();
      tasks.push(task);

      this.setState({
        tasks,
        dataSource: this.state.dataSource.cloneWithRows(tasks)
      });
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <ListView
          style={styles.listview}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Row task={rowData} pressCb={this.onItemClick} deleteCb={this.onItemDelete} />}
          renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
          renderHeader={() => <Header searchCb={this.onSearchChange} />}
          renderFooter={() => <Footer pressCb={this.onAddItemClick} />}
        />
      </View>
    )
  }
}
