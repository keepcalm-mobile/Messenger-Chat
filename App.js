import React from "react";
import Login from "./screens/Login";
import Chat from "./screens/Chat";
import Home from "./screens/Home";
import Register from "./screens/Register";
import NewChat from "./screens/NewChat";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { Provider } from "react-redux";
import { Dimensions } from "react-native";
import Constants from "expo-constants";
import store from "./store";

const { height } = Dimensions.get("window");

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerStyle: {
              height: height * 0.065 + Constants.statusBarHeight,
              backgroundColor: "#76DC6C",
            },
            title: "Messenger",
            headerTintColor: "white",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 25,
            },
            headerTitleAlign: "center",
            ...TransitionPresets.SlideFromRightIOS,
          }}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen
            name="Chat"
            component={Chat}
            options={{ title: "Chat" }}
          />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ title: "Chats" }}
          />
          <Stack.Screen
            name="NewChat"
            component={NewChat}
            options={{
              title: "Start new chat",
              ...TransitionPresets.ModalSlideFromBottomIOS,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
