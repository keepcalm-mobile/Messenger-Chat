import React from "react";
import { View, Text } from "react-native";
import { Image, Button } from "react-native-elements";
import { connect } from "react-redux";

class Settings extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ flex: 1, padding: 10 }}>
        <View style={{ flexDirection: "row" }}>
          <Image
            style={{ height: 100, width: 100, borderRadius: 50, margin: 10 }}
            source={{
              uri:
                "https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png",
            }}
          />
          <Text style={{ fontSize: 30, alignSelf: "center" }}>
            {this.props.username}
          </Text>
        </View>
        <Button
          title="Edit profile"
          type="outline"
          containerStyle={{ width: "40%" }}
          buttonStyle={{ borderRadius: 10 }}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return { username: state.username };
};

export default connect(mapStateToProps)(Settings);
