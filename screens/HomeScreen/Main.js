import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Icon } from "react-native-elements";
import { connect } from "react-redux";
import axios from "axios";
import Constants from "expo-constants";
import { url } from "../../config";

const { height } = Dimensions.get("window");

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chats: [],
      isLoading: true,
      isLoadingUsers: false,
      newChat: false,
    };

    this.onStartChat = this.onStartChat.bind(this);
  }

  componentDidMount() {
    this.listener = this.props.navigation.addListener("focus", () => {
      axios.get(`${url}/user_chats/${this.props.username}`).then((response) => {
        this.props.dispatch({ type: "LOAD_CHATS", payload: response.data });
        this.setState({ isLoading: false });
      });
    });
  }

  componentWillUnmount() {
    this.listener();
  }

  onChat(id) {
    this.props.navigation.navigate("Chat", { id });
  }

  getChats() {
    axios.get(`${url}/get_chats/${this.props.username}`).then((response) => {
      this.props.dispatch({ type: "GET_USERS", payload: response.data });
      this.props.navigation.navigate("NewChat");
    });
  }

  onStartChat(username) {
    this.setState({ newChat: false });
    axios
      .post(`${url}/start_chat`, {
        user1: username,
        user2: this.props.username,
      })
      .then((response) => {
        this.props.navigation.navigate("Chat", { id: response.data });
      });
  }

  getMargin() {
    if (Platform.OS === "ios") return Constants.statusBarHeight;
    else return 0;
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
        <View style={{ flex: 1 }}>
          {this.props.chats.map((chat) => (
            <TouchableOpacity
              key={chat._id}
              style={{
                height: "10%",
                justifyContent: "center",
                borderBottomColor: "#C1C3C5",
                borderBottomWidth: 1,
              }}
              onPress={() => this.onChat(chat._id)}
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
                  {chat.users.find((user) => user !== this.props.username)}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
          <Icon
            type="material"
            name="add"
            reverse
            raised
            containerStyle={{
              position: "absolute",
              bottom: 10,
              right: 10,
            }}
            color="#76DC6C"
            onPress={() => this.getChats()}
          />
        </View>
      );
  }
}

const mapStateToProps = (state) => {
  return { username: state.username, chats: state.chats, users: state.users };
};

export default connect(mapStateToProps)(Main);
