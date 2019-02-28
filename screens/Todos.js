import React, { Component } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import axios from 'axios';

import TodoItem from '../components/TodoItem';

axios.defaults.baseURL = 'http://10.0.2.2:8080/api';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: []
    };
  }
  
  static navigationOptions = {
    headerTitle: 'Home'
  };

  componentDidMount() {
    axios.get('/todos')
      .then(res => this.setState({ todos: res.data }) )
      .catch(err => console.log(err));
  }

  render() {
    return (
      <View style={styles.container}>
        <Button 
          containerStyle={styles.newButton} 
          title='New' 
          titleStyle={{color: 'green', paddingLeft: 8}}
          type='outline' 
          icon={<Icon name='plus' size={15} color='green' />}
        />
        <FlatList
          data={this.state.todos}
          renderItem={({item}) => {
            return <TodoItem todo={item} />
          }}
          keyExtractor={item => item._id}
          contentContainerStyle={styles.contentContainer}
        />
      </View>
    );
  }
}

const styles =StyleSheet.create({
  container: {
    flex: 1
  },
  newButton: { 
    width: 100, 
    margin: 16
  },
  contentContainer: {
    paddingBottom: 8
  }
});