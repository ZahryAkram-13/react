import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  TextInput,
  ImageBackground,
} from "react-native";
import { useState, useContext, useEffect } from "react";

import TodoItem from "../components/TodoItem";
import ControlPanel from "../components/ControlPanel";
import { TokenContext, UsernameContext } from "../Context/Context";

import { gbstyles, Btn, ProgressionBar } from "../gbstyles";
import { createTodo, updateTodo } from "../js/todo.js";
import { getTodos, deleteTodo } from "../js/todo.js";

import blob from "../assets/blob.svg";

const Counter = (props) => {
  return (
    <View style={[gbstyles.stack, { justifyContent: "flex-end" }]}>
      <Text style={[gbstyles.text, { color: "white" }]}>count :</Text>
      <Text style={[gbstyles.text, { color: "white" }]}>{props.count}</Text>
    </View>
  );
};

const AddTodo = (props) => {
  const [text, setText] = useState("");
  return (
    <View style={gbstyles.form}>
      <Text style={gbstyles.subtitle}>Add todo</Text>
      <TextInput
        style={[gbstyles.input, styles.box2]}
        value={text}
        onChangeText={setText}
      />

      <Btn text={"Add"} func={() => props.addTodo(text, props.token)} />
    </View>
  );
};

export default function TodoList({ navigation, route }) {
  console.log("route", route.params);
  const [username, setUsername] = useContext(UsernameContext);
  const [token, setToken] = useContext(TokenContext);
  const [todos, setTodos] = useState([]);
  const [totalTodos, setTotalTodos] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (token && username) {
      getTodos(route.params, token)
        .then((todos) => {
          const total = todos.length;
          setCount(todos.filter((item) => item.done).length);
          setTodos(todos);
          setShow(todos);
          setTotalTodos(total);
          console.log("useeffect db", todos);
        })
        .catch(console.error);
    }
  }, [token, username, route.params]);

  const [show, setShow] = useState(todos);
  console.log("show db", show);

  const increment = (offset) => {
    setCount(count + offset);
  };

  const removeItem = (id) => {
    const newTodo = todos.filter((item) => item.id != id);
    deleteTodo(id, token).then((todo) => {
      console.log(todo);
      setTodos(newTodo);
      setCount(newTodo.filter((item) => item.done).length);
      setTotalTodos(newTodo.length);
      setShow(newTodo);
    });
  };

  const changeDoneOnSwitch = async (id) => {
    await getTodos(route.params, token).then((todos) => {
      const todo = todos.filter((t) => t.id === id)[0];
      console.log(todo);
      updateTodo(todo.id, !todo.done, token)
        .then((res) => {
          console.log("updated", res);
          todo.done = !todo.done;
          setTodos(todos);
          setShow(todos);
        })
        .catch((err) => console.log(err.message));
    });
  };

  const addTodo = async (content, token) => {
    if (token && username) {
      const isExist = todos.some((todo) =>
        todo.content === content ? true : false
      );
      if (content !== "" && !isExist) {
        try {
          const newTodo = await createTodo(content, route.params, token);
          console.log("todo created", newTodo);
          const newTodos = [...todos, newTodo];
          setTodos(newTodos);
          setTotalTodos(newTodos.length);
          setShow(newTodos);
        } catch (error) {
          console.error("Error adding todo:", error);
        }
        console.log("old todos", todos);
      }
      if (isExist) alert("todo already exists");
      if (content === "") alert("plz enter something");
      console.log("new todos", todos);
    }
  };

  const getAllTodos = () => {
    setShow(todos);
  };

  const getAllDone = () => {
    const allDone = todos.filter((item) => item.done == true);
    setShow(allDone);
    console.log("alldone", show);
  };

  const getAllNotDone = () => {
    const allNotDone = todos.filter((item) => item.done == false);
    setShow(allNotDone);
    console.log("allnotdone", show);
  };

  const check = (check) => {
    const newTodos = todos.map((item) => {
      item.done = check;
      return item;
    });
    return newTodos;
  };

  const checkAllOrUncheckAll = async (action) => {
    const updateAllTodos = async (tab, token) => {
      for (const item of tab) {
        await updateTodo(item.id, item.done, token);
      }
    };

    try {
      const newTodos = check(action == "check" ? true : false);
      await updateAllTodos(newTodos, token);

      setTodos(newTodos);
      setCount(newTodos.filter((item) => item.done).length);
      setShow(newTodos);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <ImageBackground
      source={blob}
      resizeMode="cover"
      style={gbstyles.backgrounImage}
    >
      <View style={gbstyles.screen}>
        <ControlPanel
          count={count}
          getAllTodos={getAllTodos}
          getAllDone={getAllDone}
          getAllNotDone={getAllNotDone}
          checkAll={() => checkAllOrUncheckAll("check")}
          uncheckAll={() => checkAllOrUncheckAll("uncheck")}
        />
        <AddTodo token={token} addTodo={addTodo} />

        <View>
          {todos.length !== 0 ? (
            <View>
              <Counter count={count} />
              <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <FlatList
                  style={gbstyles.todoList}
                  keyExtractor={(item) => item.id.toString()}
                  data={show}
                  renderItem={({ item }) => (
                    <TodoItem
                      item={item}
                      increment={increment}
                      removeItem={() => removeItem(item.id)}
                      changeDoneOnSwitch={() => changeDoneOnSwitch(item.id)}
                    />
                  )}
                />
              </ScrollView>
              <ProgressionBar
                visible={todos.length !== 0}
                totalTodos={totalTodos}
                checkedTodos={todos.filter((item) => item.done === true).length}
              />
            </View>
          ) : (
            <View>
              <Text style={[gbstyles.text, { color: "white" }]}>
                You can wast your time on instagram
              </Text>
              <Text style={[gbstyles.text, { color: "white" }]}>
                or u can set up some todos now.
              </Text>
            </View>
          )}
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1, // Make sure ScrollView can grow to fill its parent
  },
});
