import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Pressable,
  SafeAreaView,
  TextInput,
} from "react-native";
import { TokenContext, UsernameContext } from "../Context/Context";
import { useContext, useState } from "react";

import { gbstyles, Btn } from "../gbstyles";
import { signUp } from "../js/sign";

import blob from "../assets/blob.svg";

export default function SignUpScreen({ navigation, route }) {
  const [username, setUsername] = useContext(UsernameContext);
  const [token, setToken] = useContext(TokenContext);

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  //fonction de creation d'un compte
  const createAccount = (setToken) => {
    console.log(user, password);
    if (user == "" || password == "") console.log("plz enter something");
    else {
      signUp(user, password)
        .then((token) => {
          console.log("account created");
          navigation.navigate("SignIn");
        })
        .catch((err) => {
          alert("user already exists");
          console.log(err.messege);
        });
    }
  };
  return (
    <ImageBackground
      source={blob}
      resizeMode="cover"
      style={gbstyles.backgrounImage}
    >
      <SafeAreaView style={gbstyles.screen}>
        <View style={gbstyles.todoList}>
          <Text style={gbstyles.h1}>Create Your User Account.</Text>
          <Text style={gbstyles.subtitle}>Easly and friendly.</Text>

        </View>

        <View style={gbstyles.form}>
          <Text style={gbstyles.subtitle}>Username</Text>
          <TextInput
            style={gbstyles.input}
            value={user}
            onChangeText={setUser}
          />
          <Text style={gbstyles.subtitle}>Password</Text>
          <TextInput
            style={gbstyles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
          <Btn text={"Create Account"} func={() => createAccount(setToken)} />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 5,
    margin: 5,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
