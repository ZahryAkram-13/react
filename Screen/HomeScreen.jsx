import { View, Text, ImageBackground } from "react-native";
import { TokenContext, UsernameContext } from "../Context/Context";
import { useContext } from "react";
import { gbstyles, Btn } from "../gbstyles";

import blob from "../assets/blob.svg";

export default function HomeScreen({ navigation, route }) {
  const [username, setUsername] = useContext(UsernameContext);

  return (
    <ImageBackground
      source={blob}
      resizeMode="cover"
      style={gbstyles.backgrounImage}
    >
      <View style={gbstyles.screen}>
        <View style={gbstyles.todoList}>
          <Text style={gbstyles.h1}>Welcome {username}</Text>
          <Text style={gbstyles.subtitle}>Hurry up, you have work to do </Text>
        </View>
        <Btn
          text={"My todolists"}
          func={() => navigation.navigate("TodoLists")}
        />
      </View>
    </ImageBackground>
  );
}
