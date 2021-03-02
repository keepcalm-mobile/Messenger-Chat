import React from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import { Icon } from "react-native-elements";
import { connect } from "react-redux";
import io from "socket.io-client";
import Constants from "expo-constants";
import axios from "axios";
import { url } from "../config";

const { height, width } = Dimensions.get("window");

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "",
      isLoading: true,
    };
  }

  load() {
    axios
      .get(`${url}/get_messages/${this.props.route.params.id}`)
      .then((messages) => {
        this.props.dispatch({ type: "LOAD_MESSAGES", payload: messages.data });
        this.setState({ isLoading: false });
      })
      .catch((err) => console.log(err));
  }

  componentDidMount() {
    this.load();
    this.listen = this.props.navigation.addListener("blur", () => {
      this.socket.disconnect();
      this.props.dispatch({ type: "LOAD_MESSAGES", payload: [] });
    });
    this.socket = io(`${url}/`);
    this.socket.on("get message", (data) => {
      const { text, sender, id } = data;
      if (id === this.props.route.params.id) {
        this.props.dispatch({ type: "REFRESH", payload: { text, sender } });
      }
    });
  }

  componentWillUnmount() {
    this.listen();
  }

  sendMessage() {
    this.socket.emit("chat message", {
      text: this.state.message,
      sender: this.props.username,
      id: this.props.route.params.id,
    });
    this.setState({ message: "" });
  }

  render() {
    if (this.state.isLoading)
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size="large" color="#2EE22F" />
        </View>
      );
    else
      return (
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          keyboardVerticalOffset={
            Platform.OS === "ios"
              ? height * 0.065 + Constants.statusBarHeight
              : 0
          }
          behavior={Platform.OS === "ios" ? "padding" : null}
        >
          <View style={{ flex: 1 }}>
            <ScrollView
              style={{ flex: 1 }}
              showsVerticalScrollIndicator={false}
            >
              {this.props.messages &&
                this.props.messages.map((message, index) => (
                  <View
                    key={index}
                    style={{
                      flexDirection: "row",
                      justifyContent:
                        message.sender === this.props.username
                          ? "flex-end"
                          : "flex-start",
                    }}
                  >
                    <View
                      style={{
                        backgroundColor:
                          message.sender === this.props.username
                            ? "#85DD8D"
                            : "#8AB2DC",
                        borderRadius: 10,
                        margin: 5,
                        padding: 5,
                      }}
                    >
                      <Text style={{ fontSize: 15, color: "white" }}>
                        {message.sender}
                      </Text>
                      <Text
                        style={{
                          textAlign: "center",
                          fontSize: 20,
                          color: "white",
                        }}
                      >
                        {message.text}
                      </Text>
                    </View>
                  </View>
                ))}
            </ScrollView>
            <View
              style={{
                backgroundColor: "#EBECE6",
                padding: 5,
                flexDirection: "row",
              }}
            >
              <TextInput
                style={{
                  flex: 1,
                  borderColor: "#DEE1C9",
                  borderWidth: 1,
                  fontSize: 20,
                  backgroundColor: "white",
                  borderRadius: 25,
                  padding: 5,
                  paddingLeft: 15,
                }}
                placeholder="Type your message here..."
                value={this.state.message}
                onChangeText={(message) => this.setState({ message })}
              />
              <Icon
                type="font-awesome"
                name="send"
                size={25}
                containerStyle={{ alignSelf: "center", margin: 5 }}
                color="#3D7ECF"
                onPress={() => this.sendMessage()}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      );
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.username,
    messages: state.messages,
  };
};

export default connect(mapStateToProps)(Chat);
