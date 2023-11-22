import { StyleSheet, View } from "react-native";
import { gbstyles, Btn } from "../gbstyles";

// cette composante va regrouper tout les fonctionnallité de manipulation et affichage des taches
export default function ControlPanel(props) {
  return (
    <View >

      <View style={gbstyles.stack} >
        <Btn text={"allDone"} func={props.getAllDone} />
        <Btn text={"allNotDone"} func={props.getAllNotDone} />
        <Btn text={"all"} func={props.getAllTodos} />

      </View>
      <View style={gbstyles.stack}>
        <Btn text={"checkAll"} func={props.checkAll} />
        <Btn text={"UncheckAll"} func={props.uncheckAll} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
