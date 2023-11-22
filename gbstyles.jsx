import { StyleSheet, Text, View, Pressable, Dimensions } from "react-native";
import { LinearProgress, LinearProgressWithLabel } from "@mui/material";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

/***
 * global styles : ...
 */

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const appWidth = screenWidth;
const appHeight = screenHeight;

export const DELETE = "#d62828";
export const SUCCESS = "#d62828"; // they are the same its confusing right?

export const ProgressionBar = (props) => {
  const progress = (props.checkedTodos / props.totalTodos) * 100 || 0;
  return props.visible ? (
    <View style={gbstyles.form}>
      <Text style={[gbstyles.text, { color: "white" }]}>
        Yeaah go for it handsome
      </Text>
      <Text></Text>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ width: "100%", mr: 1 }}>
            <LinearProgress
              color="secondary"
              variant="determinate"
              value={progress}
            />
          </Box>
          <Box sx={{ minWidth: 35 }}>
            <Text style={[gbstyles.text, { color: "white" }]} variant="body2">
              {Math.round(progress)}%
            </Text>
          </Box>
        </Box>
      </Box>
    </View>
  ) : (
    <View></View>
  );
};

//un button costumiser qu'on va l'utiliser partout
export function Btn(props) {
  let style = [gbstyles.button, { backgroundColor: props.type }];

  return (
    <Pressable style={style} title={props.text} onPress={props.func}>
      <Text style={gbstyles.text}>{props.text}</Text>
    </Pressable>
  );
}

// des variable de styles globales
export const gbstyles = StyleSheet.create({
  counter: {
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    padding: 5,
    height: 37,
    width: 37,
    border: "0.9px solid black",
    borderRadius: 7,
    fontSize: 16,
    fontWeight: "bold",
    backgroundColor: "#006666",
  },
  screen: {
    margin: 5,
    padding: 5,
  },
  backgrounImage: {
    height: appHeight,
  },
  text: {
    marginHorizontal: 10,
    fontSize: 16,
    fontFamily: "ubuntu",
    fontWeight: "bold",
  },
  stack: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: 2,
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e9ecef", //color: "white",
    fontSize: 20,
    fontWeight: "bold",
    border: "0.9px solid white",
    borderRadius: 7,
    borderColor: "white",
    padding: 7,
    margin: 3,
  },

  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#006666",
    fontSize: 16,
    fontWeight: "bold",
    border: "0.5px solid black",
    borderRadius: 7,
    borderRadius: 7,
    padding: 10,
    margin: 3,
    height: 37,
  },
  input: {
    height: 37,
    padding: 10,
    marginVertical: 7,
    borderWidth: 1,
    borderRadius: 7,
    backgroundColor: "white",
  },
  app: {
    width: appWidth,
    height: appHeight,
    backgroundColor: "#457b9d",
    //padding: 10,
  },
  todoList: {
    padding: 5,
    margin: 5,
  },
  h1: {
    color: "white",
    //margin: 10,
    fontSize: 35,
    fontWidth: 500,
  },
  subtitle: {
    color: "white",
    fontSize: 18,
    fontWidth: 200,
    //color: 'tomato'
  },
  form: {
    //justifyContent: 'center', alignItems: 'center',
    marginVertical: 20,
    padding: 5,
    backgrounColor: "tomato",
  },
  box1: {
    flex: 0.5,
  },
  box2: {
    flex: 6,
  },
  box3: {
    flex: 1,
  },
});
