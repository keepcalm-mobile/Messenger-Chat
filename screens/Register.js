import React from "react";
import { View, TextInput, Text, ActivityIndicator } from "react-native";
import { Button } from "react-native-elements";
import { connect } from "react-redux";
import axios from "axios";
import { url } from "../config";

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

  onSignUp() {
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
          this.props.navigation.navigate("Login");
        } else {
          this.setState({ success: false });
        }
      });
    this.setState({ password: "" });
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <TextInput
          placeholder="Username"
          style={{
            width: "65%",
            padding: 5,
            fontSize: 20,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "#3D7ECF",
            alignSelf: "center",
            margin: 5,
          }}
          textAlign="center"
          value={this.props.username}
          onChangeText={(text) =>
            this.props.dispatch({ type: "SET_USERNAME", payload: text })
          }
        />
        <TextInput
          placeholder="Password"
          style={{
            width: "65%",
            padding: 5,
            fontSize: 20,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "#3D7ECF",
            alignSelf: "center",
            margin: 5,
          }}
          textAlign="center"
          secureTextEntry
          value={this.state.password}
          onChangeText={(text) => this.setState({ password: text })}
        />
        <Button
          title="Sign Up"
          containerStyle={{ width: "60%", alignSelf: "center" }}
          buttonStyle={{ borderRadius: 25, backgroundColor: "#3D7ECF" }}
          onPress={() => this.onSignUp()}
        />
        {!this.state.success && (
          <Text style={{ alignSelf: "center", fontSize: 20, color: "red" }}>
            Username is already taken
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
  return { username: state.username };
};

export default connect(mapStateToProps)(Register);
