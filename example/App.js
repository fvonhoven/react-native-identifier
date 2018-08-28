import React, { Component } from "react"
import { View, Slider, Text } from "react-native"
import { Identifier } from "react-native-identifier"

export default class App extends Component {
  state = {
    borderActive: false,
    accuracy: 0
  }

  render() {
    const { accuracy } = this.state
    return (
      <View style={{ flex: 1, justifyContent: "space-between", backgroundColor: "black" }}>
        <View style={{ margin: 50 }}>
          <Slider
            onValueChange={accuracy => this.setState({ accuracy })}
            minimumTrackTintColor="#F6F"
            style={{ width: 300 }}
          />
          <Text style={{ fontSize: 24, color: "white", alignSelf: "center" }}>
            {accuracy.toFixed(4)}
          </Text>
        </View>
        <View style={{ bottom: 100, alignItems: "center" }}>
          <Identifier accuracy={accuracy} />
        </View>
      </View>
    )
  }
}
