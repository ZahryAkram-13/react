import { View, TextInput, Text } from "react-native";

import { gbstyles, Btn, SUCCESS } from "../../gbstyles.jsx";
import { createTodoList } from "../../js/todoList.js";

import { useState } from "react";

const AddTodolist = (props) => {
  const [text, setText] = useState("");
  const addTodolist = async (text, token) => {
    try {
      await createTodoList(props.username, text, props.token)
        .then((todolist) => {
          console.log(todolist, "success");
          props.setTodolists([...props.todolists, todolist]);
        })
        .catch((err) => console.log(err.message));
    } catch (error) {
      console.log(err.message);
    }
  };

  return (
    <View style={gbstyles.form}>
      <Text style={gbstyles.subtitle}>Add TodoList</Text>
      <TextInput style={[gbstyles.input]} value={text} onChangeText={setText} />
      <Btn text={"Add"} func={() => addTodolist(text, props.token)} />
    </View>
  );
};

export default AddTodolist;
