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
      <View style={{ flex: 1, backgroundColor: "lightgray" }}>
        <Identifier
          accuracy={0.5}
          style={{
            position: "absolute",
            top: "20%",
            left: "20%",
            width: "40%",
            height: "20%"
          }}
        />
      </View>
    )
  }
}
