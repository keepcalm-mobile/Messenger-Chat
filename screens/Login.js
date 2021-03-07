import axios from "axios";
import React from "react";
import {
  View,
  Keyboard,
  Text,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { Button, Input } from "react-native-elements";
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

  onCreate() {
    this.props.navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Register" }],
      })
    );
  }

  onSignIn() {
    Keyboard.dismiss();
    if (!this.props.username.length || !this.state.password.length) {
      this.setState({ loginStatus: "Fill in the form" });
      return;
    }
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
      <View style={{ flex: 1, justifyContent: "center", marginBottom: 50 }}>
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Welcome
        </Text>
        <Text
          style={{
            fontSize: 25,
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 50,
            color: "#899088",
          }}
        >
          Sign in to continue
        </Text>
        <Input
          label="Username"
          labelStyle={{ fontSize: 20 }}
          containerStyle={{ alignSelf: "center", width: "70%" }}
          inputStyle={{ fontSize: 20 }}
          value={this.props.username}
          onChangeText={(text) =>
            this.props.dispatch({ type: "SET_USERNAME", payload: text })
          }
        />
        <Input
          label="Password"
          labelStyle={{ fontSize: 20 }}
          secureTextEntry
          containerStyle={{ alignSelf: "center", width: "70%" }}
          inputStyle={{ fontSize: 20 }}
          value={this.state.password}
          onChangeText={(text) => this.setState({ password: text })}
        />
        <Button
          title="Sign In"
          raised
          containerStyle={{
            alignSelf: "center",
            width: "60%",
          }}
          buttonStyle={{ borderRadius: 25, backgroundColor: "#76DC6C" }}
          onPress={() => this.onSignIn()}
        />
        {this.state.loginStatus && (
          <Text
            style={{
              alignSelf: "center",
              fontSize: 20,
              color: "red",
              marginTop: 20,
            }}
          >
            {this.state.loginStatus}
          </Text>
        )}
        <Pressable
          style={{ marginTop: 50, alignSelf: "center" }}
          onPress={() => this.onCreate()}
        >
          <Text style={{ fontSize: 20, color: "#61CF51", fontWeight: "bold" }}>
            Create Account
          </Text>
        </Pressable>
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
