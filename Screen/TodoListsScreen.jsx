import {
  StyleSheet,
  View,
  FlatList,
  ScrollView,
  Text,
  Pressable,
  ImageBackground,
} from "react-native";
import { useState, useContext, useEffect } from "react";

import { TokenContext, UsernameContext } from "../Context/Context";

import { gbstyles, Btn, DELETE } from "../gbstyles";
import { deleteTodoList, getTodoLists } from "../js/todoList.js";

import AddTodolist from "../components/UI/Input";

import blob from "../assets/blob.svg";

import { Icon } from "@rneui/themed";

//la composante todolist
const TodoList = (props) => {
  const goToTodolist = () => {
    console.log(props.item.id);
    props.navigation.navigate("TodoList", props.item.id);
  };
  return (
    <View style={gbstyles.item}>
      <Pressable
        style={[gbstyles.box2]}
        title={props.item.title}
        onPress={goToTodolist}
      >
        <Text style={gbstyles.text}>{props.item.title}</Text>
      </Pressable>
      <Btn type={DELETE} text={"X"} func={props.deleteTodolist} />
    </View>
  );
};

export default function TodoListScreen({ navigation, route }) {
  const [username, setUsername] = useContext(UsernameContext);
  const [token, setToken] = useContext(TokenContext);
  const [todolists, setTodolists] = useState([]);

  useEffect(() => {
    if (token && username) {
      getTodoLists(username, token)
        .then((data) => {
          setTodolists(data);
        })
        .catch(console.error);
    }
  }, [token, username]);

  const deleteTodolist = (id, token) => {
    console.log("deletion started");
    if (token && username) {
      deleteTodoList(id, token)
        .then((res) => {
          const new_todolists = todolists.filter(
            (todolist) => todolist.id != id
          );
          setTodolists(new_todolists);
        })
        .catch((err) => console.log(err.message));
    }
  };

  return (
    <ImageBackground
      source={blob}
      resizeMode="cover"
      style={gbstyles.backgrounImage}
    >
      <View style={gbstyles.screen}>
        <Text style={gbstyles.h1}>All your TodoLists</Text>
        <AddTodolist
          username={username}
          token={token}
          setTodolists={setTodolists}
          todolists={todolists}
        />

        {
          
            todolists.length !== 0 ? (
            <Text
              style={[gbstyles.screen, gbstyles.subtitle, { color: "white" }]}
              variant="body2"
            >
              it seems you have some work to do!!
            </Text>
            ) : (
            <br />)
        }

        <FlatList
          data={todolists}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TodoList
              style={gbstyles.item}
              navigation={navigation}
              item={item}
              deleteTodolist={() => deleteTodolist(item.id, token)}
            />
          )}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  box1: { flex: 1 },
  box2: { flex: 5 },
  box3: { flex: 3 },
});
