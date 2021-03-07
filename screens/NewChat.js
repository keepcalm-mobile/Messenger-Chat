import React from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { connect } from "react-redux";
import axios from "axios";
import { url } from "../config";

const { height } = Dimensions.get("window");

class NewChat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  onStartChat(username) {
    this.setState({ newChat: false });
    axios
      .post(`${url}/start_chat`, {
        user1: username,
        user2: this.props.username,
      })
      .then((response) => {
        this.props.navigation.goBack();
        this.props.navigation.navigate("Chat", { id: response.data });
      });
  }

  render() {
    if (this.state.loading)
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size="large" color="#2EE22F" />
        </View>
      );
    return (
      <ScrollView style={{ flex: 1 }}>
        {this.props.users.map((user) => (
          <TouchableOpacity
            key={user._id}
            style={{
              height: height * 0.1,
              justifyContent: "center",
              backgroundColor: "white",
              margin: 5,
              borderRadius: 10,
            }}
            onPress={() => this.onStartChat(user.username)}
          >
            <View style={{ flexDirection: "row" }}>
              <Image
                source={{
                  uri:
                    "https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png",
                }}
                style={{
                  borderRadius: height * 0.35,
                  height: height * 0.07,
                  width: height * 0.07,
                  margin: 5,
                }}
              />
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 25,
                  margin: 5,
                }}
              >
                {user.username}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.username,
    users: state.users,
  };
};

export default connect(mapStateToProps)(NewChat);
