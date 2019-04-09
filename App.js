import React from 'react';
import { StyleSheet, View, TextInput, ScrollView } from 'react-native';

import { Root, Container, Header, Content, Form, Item, Input, Label, Button, Text, List, ListItem, Left, Right, Icon, Body, Title } from 'native-base';

import { Col, Row, Grid } from 'react-native-easy-grid';

import { Font, AppLoading } from "expo";

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      loading: true,
      todo: '',
      index: null,
      todos: ["Makan","Mandi"],
      edited: false
    };
    this.handleEdit = this.handleEdit.bind(this);
  }

  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ loading: false });
  }

  handleForm = () => {
    const todos = this.state.todos;
    todos.push(this.state.todo);
    this.setState({ todos, todo: '' });
  }

  handleEdit = (index) => {
    const { todos } = this.state;
    this.setState({todo: todos[index], edited: true, index});
  }

  handleUpdate = (index) => {
    const { todos } = this.state;
    todos[index] = this.state.todo;
    this.setState({todos, edited: false, index: null, todo: ''});
  }

  handleHapus = (index) => {
    const { todos } = this.state;
    todos.splice(index, 1);
    this.setState({todos});
  }
  
  render() {

    if (this.state.loading) {
      return (
        <Root>
          <AppLoading />
        </Root>
      );
    }

    return (
      <Container>
        <Header style={{marginTop: 15}}>
          <Left>
            <Button transparent>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Todo App</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Right>
        </Header>
        <Content>
          <Form>
            <Item fixedLabel>
              <Label>Todo</Label>
              <Input value={this.state.todo} onChangeText={(todo) => this.setState({todo})} style={styles.inputan} />
            </Item>
            {this.state.edited ? <Button block onPress={() => this.handleUpdate(this.state.index)}>
              <Text>Update</Text>
            </Button> : <Button block onPress={this.handleForm}>
              <Text>Simpan</Text>
            </Button>}
          </Form>
          <List>
            {this.state.todos.map((todo, index) => {
              return (
                <ListItem key={index}>
                  <Left>
                    <Text>{todo}</Text>
                  </Left>
                  <Right>
                    <Button onPress={() => this.handleEdit(index)} disabled={this.state.index === index ? true : false}>
                      <Text>Edit</Text>
                    </Button>                    
                  </Right>
                  <Right>
                    <Button danger onPress={() => this.handleHapus(index)}>
                      <Text>X</Text>
                    </Button>                   
                  </Right>                  
                </ListItem>
              )
            })}          
          </List>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  inputan: {
    borderBottomColor: 'blue',
    borderBottomWidth: 2,
    marginBottom: 10,
  }
});
