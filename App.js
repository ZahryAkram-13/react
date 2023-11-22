import { StyleSheet, View } from "react-native";
import { useState } from "react";

import Navigation from "./navigation/Navigation";

import { gbstyles, Btn } from "./gbstyles";
import { TokenContext, UsernameContext } from "./Context/Context";

export default function App() {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);

  return (
    <View style={[gbstyles.app]}>
      <UsernameContext.Provider value={[username, setUsername]}>
        <TokenContext.Provider value={[token, setToken]}>
          <Navigation />
        </TokenContext.Provider>
      </UsernameContext.Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
