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
import axios from "axios";
import { url } from "../config";
import { CommonActions } from "@react-navigation/routers";

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      password: "",
      success: true,
      isLoading: false,
    };
  }

  componentDidMount() {
    this.props.dispatch({ type: "SET_USERNAME", payload: "" });
  }

  onLogin() {
    this.props.navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Login" }],
      })
    );
  }

  onSignUp() {
    Keyboard.dismiss();
    this.setState({ isLoading: true });
    axios
      .post(`${url}/register`, {
        username: this.props.username,
        password: this.state.password,
      })
      .then((response) => {
        this.setState({ isLoading: false });
        if (response.data === "Success") {
          this.setState({ success: true });
          this.onLogin();
        } else {
          this.setState({ success: false });
        }
      });
    this.setState({ password: "" });
    this.props.dispatch({ type: "SET_USERNAME", payload: "" });
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", marginBottom: 100 }}>
        <Text style={{ fontSize: 30, textAlign: "center", fontWeight: "bold" }}>
          Create Account
        </Text>
        <Text
          style={{
            fontSize: 25,
            textAlign: "center",
            fontWeight: "bold",
            color: "#899088",
            marginBottom: 50,
          }}
        >
          Sign up to get started
        </Text>
        <Input
          label="Username"
          containerStyle={{ alignSelf: "center", width: "70%" }}
          labelStyle={{ fontSize: 20 }}
          inputStyle={{ fontSize: 20 }}
          value={this.props.username}
          onChangeText={(text) =>
            this.props.dispatch({ type: "SET_USERNAME", payload: text })
          }
        />
        <Input
          label="Pasword"
          containerStyle={{ alignSelf: "center", width: "70%" }}
          labelStyle={{ fontSize: 20 }}
          inputStyle={{ fontSize: 20 }}
          secureTextEntry
          value={this.state.password}
          onChangeText={(text) => this.setState({ password: text })}
        />
        <Button
          title="Sign Up"
          raised
          containerStyle={{ width: "60%", alignSelf: "center" }}
          buttonStyle={{ borderRadius: 25, backgroundColor: "#76DC6C" }}
          onPress={() => this.onSignUp()}
        />
        {!this.state.success && (
          <Text style={{ alignSelf: "center", fontSize: 20, color: "red" }}>
            Username is already taken
          </Text>
        )}
        <Text
          style={{
            fontSize: 20,
            color: "#899088",
            fontWeight: "bold",
            textAlign: "center",
            marginTop: 50,
          }}
        >
          Already have an account?
        </Text>
        <Pressable
          style={{ alignSelf: "center" }}
          onPress={() => this.onLogin()}
        >
          <Text style={{ fontSize: 20, color: "#61CF51", fontWeight: "bold" }}>
            Sign In
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
  return { username: state.username };
};

export default connect(mapStateToProps)(Register);
