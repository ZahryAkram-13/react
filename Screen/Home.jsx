
import {Pressable, Text, View} from 'react-native';
import { TokenContext, UsernameContext } from '../Context/Context';
import {useContext} from 'react';
import {gbstyles, Btn} from '../gbstyles';

import { NavigationContainer, Link } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import TodoListsScreen from '../Screen/TodoListsScreen';
import HomeScreen from '../Screen/HomeScreen';
import SignInScreen from '../Screen/SignInScreen';
import SignOutScreen from '../Screen/SignOutScreen';
import SignUpScreen from '../Screen/SignUpScreen';




const Tab = createBottomTabNavigator();

export default function Home ({ navigation, route }) {

    const [username, setUsername] = useContext(UsernameContext);
    const [token, setToken] = useContext(TokenContext);

    return (
        <View>
          <NavigationContainer>
            <Tab.Navigator>
              <Tab.Screen name='SignIn' component={SignInScreen} />
              <Tab.Screen name='SignUp' component={SignUpScreen} />
            </Tab.Navigator>
          </NavigationContainer>
        </View>
    );
};
