import React, { Component } from "react"
import { View, Slider, Text, StyleSheet } from "react-native"
import { Identifier } from "react-native-identifier"

export default class App extends Component {
  state = {
    borderActive: false,
    accuracy: 0
  }

  render() {
    const { accuracy } = this.state
    const gaugeHeight = `${(accuracy * 100).toString()}%`
    return (
      <View style={styles.root}>
        <View style={styles.topContainer}>
          <Text style={styles.description}>Use slider to simulate accuracy change</Text>
          <Slider
            onValueChange={accuracy => this.setState({ accuracy })}
            minimumTrackTintColor="#F6F"
            style={styles.slider}
          />
          <Text style={styles.accuracy}>{accuracy.toFixed(4)}</Text>
        </View>
        <Identifier accuracy={accuracy} style={styles.identifier} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "black"
  },
  topContainer: {
    margin: 50
  },
  slider: {
    width: 300
  },
  description: {
    color: "white",
    marginBottom: 15,
    alignSelf: "center"
  },
  accuracy: {
    fontSize: 24,
    color: "white",
    alignSelf: "center"
  },
  identifier: {
    position: "absolute",
    top: "40%",
    left: "32%",
    width: "50%",
    height: "20%"
  }
})
