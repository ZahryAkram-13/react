
import { TokenContext, UsernameContext } from '../Context/Context';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  ImageBackground,
  Text,
  View
} from 'react-native';
import { useState } from 'react';
import { gbstyles, Btn } from '../gbstyles';
import { signIn } from '../js/sign';


import blob from '../assets/blob.svg';


export default function SignInScreen({ navigation, route }) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const getCredential = (setToken, setUsername) => {
    console.log(login, password);
    if (login == '' || password == '') console.log('plz enter smtg');
    else {
      signIn(login, password).then(token => {
        console.log(token);
        setToken(token);
        setUsername(login);
      }).catch(err => console.log(err.message));
    }
  };

  return (
    <ImageBackground source={blob} resizeMode="cover" style={gbstyles.backgrounImage}>


      <TokenContext.Consumer>
        {([token, setToken]) => (
          <UsernameContext.Consumer>
            {([username, setUsername]) => {

              return (
                <SafeAreaView style={gbstyles.screen}>
                  <View style={gbstyles.todoList}>
                    <Text style={[gbstyles.h1, {color: '#FBAE3C'}]}>Graddiy</Text>
                    <Text style={gbstyles.subtitle}>You always have somthing to do</Text>
                  </View>
                  <View style={gbstyles.form}>
                    <Text style={gbstyles.subtitle}>Login</Text>
                    <TextInput
                      style={gbstyles.input}
                      value={login}
                      onChangeText={setLogin}

                    />
                    <Text style={gbstyles.subtitle}>Password</Text>
                    <TextInput
                      style={gbstyles.input}
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry={true}

                    />

                    <Btn text={'Submit'} func={() => getCredential(setToken, setUsername)} />

                  </View>
                </SafeAreaView>
              );
            }}
          </UsernameContext.Consumer>
        )}
      </TokenContext.Consumer>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
