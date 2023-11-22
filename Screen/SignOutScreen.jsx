import {
  StyleSheet,
  Text,
  View,
  Switch,
  Pressable,
  ImageBackground,
} from "react-native";
import { TokenContext, UsernameContext } from "../Context/Context";
import { useContext } from "react";
import { gbstyles, Btn, Talk } from "../gbstyles";

import blob from "../assets/blob.svg";

export default function SignOutScreen({ navigation, route }) {
  const [token, setToken] = useContext(TokenContext);

  const signOut = () => {
    setToken(null);
    navigation.navigate("Home");
    console.log(root.params);
  };
  return (
    <ImageBackground
      source={blob}
      resizeMode="cover"
      style={gbstyles.backgrounImage}
    >
      <View style={gbstyles.screen}>
        <View style={gbstyles.todoList}>
          <Text style={gbstyles.h1}>See You Later Soldier </Text>
          <Text style={gbstyles.subtitle}>you have done enough for today</Text>

        </View>
        <Btn text={"signOut"} func={signOut} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 5,
    margin: 5,
    backgroundColor: "tomato",
  },
});
