import axios from "axios";
import React from "react";
import { View, TextInput, Text, ActivityIndicator } from "react-native";
import { Button } from "react-native-elements";
import { connect } from "react-redux";
import { CommonActions } from "@react-navigation/native";
import { url } from "../config";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      password: "",
      loginStatus: null,
      isLoading: false,
    };
  }

  componentDidMount() {
    this.props.dispatch({ type: "SET_USERNAME", payload: "" });
  }

  onSignIn() {
    this.setState({ isLoading: true });
    axios
      .post(`${url}/login`, {
        username: this.props.username,
        password: this.state.password,
      })
      .then((response) => {
        this.setState({ isLoading: false });
        if (response.data === "Success")
          this.props.navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "Home" }],
            })
          );
        else if (response.data === "Login failed")
          this.setState({ loginStatus: "Wrong password" });
        else if (response.data === "Not registered")
          this.setState({ loginStatus: "User not registered" });
      });
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <TextInput
          style={{
            alignSelf: "center",
            width: "60%",
            padding: 5,
            borderWidth: 1,
            borderColor: "#3D7ECF",
            borderRadius: 10,
            margin: 5,
            fontSize: 20,
          }}
          placeholder="Username"
          textAlign="center"
          value={this.props.username}
          onChangeText={(text) =>
            this.props.dispatch({ type: "SET_USERNAME", payload: text })
          }
        />
        <TextInput
          style={{
            alignSelf: "center",
            width: "60%",
            padding: 5,
            borderWidth: 1,
            borderColor: "#3D7ECF",
            borderRadius: 10,
            margin: 5,
            fontSize: 20,
          }}
          placeholder="Password"
          secureTextEntry
          textAlign="center"
          value={this.state.password}
          onChangeText={(text) => this.setState({ password: text })}
        />
        <Button
          title="Sign In"
          containerStyle={{ alignSelf: "center", width: "60%" }}
          buttonStyle={{ borderRadius: 25 }}
          onPress={() => this.onSignIn()}
        />
        {this.state.loginStatus && (
          <Text style={{ alignSelf: "center", fontSize: 15, color: "red" }}>
            {this.state.loginStatus}
          </Text>
        )}
        {this.state.isLoading && (
          <ActivityIndicator
            size="large"
            color="#2EE22F"
            style={{ margin: 10 }}
          />
        )}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.username,
  };
};

export default connect(mapStateToProps)(Login);
