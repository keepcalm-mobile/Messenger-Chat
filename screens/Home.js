import React, { useState } from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { CommonActions } from "@react-navigation/native";
import { View, Image, Text } from "react-native";
import Main from "./HomeScreen/Main";
import { connect } from "react-redux";
import Settings from "./HomeScreen/Settings";
import { Icon } from "react-native-elements";

const Drawer = createDrawerNavigator();

const DrawerContent = (props) => {
  return (
    <DrawerContentScrollView>
      <View style={{ flexDirection: "row", marginLeft: 10 }}>
        <Image
          style={{ height: 50, width: 50, borderRadius: 25 }}
          source={{
            uri:
              "https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png",
          }}
        />
        <Text
          style={{
            fontSize: 25,
            margin: 5,
            alignSelf: "center",
            textAlign: "center",
          }}
        >
          {props.username}
        </Text>
      </View>
      <DrawerItemList {...props} />
      <DrawerItem
        {...props}
        label="Log Out"
        icon={({ color, size }) => (
          <Icon type="material" name="logout" color={color} size={size} />
        )}
        onPress={() =>
          props.navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "Landing" }],
            })
          )
        }
      />
    </DrawerContentScrollView>
  );
};

function Home({ username }) {
  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <DrawerContent {...props} username={username} />
      )}
      drawerContentOptions={{
        activeBackgroundColor: "#639CD5",
        activeTintColor: "white",
        inactiveBackgroundColor: "#F1F3F3",
        inactiveTintColor: "black",
      }}
      edgeWidth={250}
    >
      <Drawer.Screen
        name="Home"
        component={Main}
        options={{
          title: "Chats",
          drawerIcon: ({ color, size }) => (
            <Icon type="material" name="home" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon type="material" name="settings" color={color} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

const mapStateToProps = (state) => {
  return { username: state.username };
};

export default connect(mapStateToProps)(Home);
