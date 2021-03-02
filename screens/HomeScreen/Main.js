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
import Modal from "react-native-modal";
import { url } from "../../config";
import BottomSheet from "reanimated-bottom-sheet";

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
      this.setState({ newChat: true });
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
                <Text style={{ textAlign: "center", fontSize: 25, margin: 5 }}>
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
            color="#639CD5"
            onPress={() => this.getChats()}
          />
          <Modal
            isVisible={this.state.newChat}
            onBackButtonPress={() => this.setState({ newChat: false })}
            style={{ margin: 0, marginTop: height * 0.2 }}
            backdropOpacity={0}
            animationInTiming={500}
            animationOutTiming={500}
            hideModalContentWhileAnimating
            swipeDirection="down"
            onSwipeComplete={() => this.setState({ newChat: false })}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: "#639CD5",
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
              }}
            >
              <Text
                style={{
                  marginTop: 10,
                  textAlign: "center",
                  fontSize: 25,
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                Start new chat
              </Text>
              {this.props.users.map((user) => (
                <TouchableOpacity
                  key={user._id}
                  style={{
                    height: "10%",
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
            </View>
          </Modal>
        </View>
      );
  }
}

const mapStateToProps = (state) => {
  return { username: state.username, chats: state.chats, users: state.users };
};

export default connect(mapStateToProps)(Main);
