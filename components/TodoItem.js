import { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, Switch } from "react-native";
import { gbstyles, Btn, DELETE } from "../gbstyles";

import { TokenContext, UsernameContext } from "../Context/Context";
import { updateTodo } from "../js/todo";

export default function TodoItem(props) {
  const [isEnabled, setIsEnabled] = useState(props.item.done);
  const [token, setToken] = useContext(TokenContext);


  const toggleSwitch = () => {
    setIsEnabled(!isEnabled);
    props.increment(!isEnabled ? 1 : -1);
    //updateTodo(props.item.id, isEnabled ,token);
    props.changeDoneOnSwitch(props.item.id, token);
  };

  const remove = () => {
    props.removeItem(props.item.id);
  };

  useEffect(() => {
    setIsEnabled(props.item.done);
  }, [props.item.done]);

  return (
    <View style={gbstyles.item}>
      <Btn type={DELETE} text={"X"} func={remove} />
      <Text style={[gbstyles.text, gbstyles.box2]}>-{props.item.content}</Text>
      <Switch
        style={gbstyles.box3}
        // trackColor={{ false: "#740577", true: "#81b0ff" }}
        // thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        onValueChange={ () => toggleSwitch(props.item.id, token)}
        value={isEnabled}
      />
    </View>
  );
}

const styles = StyleSheet.create({

});
