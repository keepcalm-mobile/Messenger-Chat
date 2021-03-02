import React from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-elements";

export default class Landing extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text style={{ textAlign: "center", fontSize: 25 }}>Join Chat</Text>
        <Button
          title="Login"
          containerStyle={{ alignSelf: "center", width: "60%", margin: 5 }}
          buttonStyle={{ borderRadius: 25 }}
          onPress={() => this.props.navigation.navigate("Login")}
        />
        <Button
          title="Register"
          containerStyle={{ alignSelf: "center", width: "60%", margin: 5 }}
          buttonStyle={{ borderRadius: 25 }}
          onPress={() => this.props.navigation.navigate("Register")}
        />
      </View>
    );
  }
}
