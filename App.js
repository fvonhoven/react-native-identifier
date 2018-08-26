import React, { Component } from "react"
import { StyleSheet, View, Slider } from "react-native"

export default class App extends Component {
  state = {
    borderActive: false,
    accuracy: 0
  }
  componentDidMount() {
    setInterval(() => {
      this.setState(state => {
        return { borderActive: !state.borderActive }
      })
    }, 750)
  }
  render() {
    const borderColor = this.state.borderActive ? "#00FF00" : "transparent"
    const percent = this.state.accuracy * 100
    const gaugeHeight = `${percent.toString()}%`
    return (
      <View style={styles.container}>
        <View style={{ margin: 50 }}>
          <Slider
            onValueChange={accuracy => this.setState({ accuracy })}
            minimumTrackTintColor="#F6F"
            style={{ width: 300 }}
          />
        </View>
        <View style={styles.root}>
          <View style={{ width: "95%" }}>
            <View style={styles.row}>
              <View style={styles.outerTopLeft}>
                <View style={[styles.innerTopLeft, innerMargin, { borderColor }]} />
              </View>
              <View style={{ width: "40%" }} />
              <View style={styles.outerTopRight}>
                <View style={[styles.innerTopRight, innerMargin, { borderColor }]} />
              </View>
            </View>
            <View style={{ height: "50%" }} />
            <View style={styles.row}>
              <View style={styles.outerBottomLeft}>
                <View style={[styles.innerBottomLeft, innerMargin, { borderColor }]} />
              </View>
              <View style={{ width: "40%" }} />
              <View style={styles.outerBottomRight}>
                <View style={[styles.innerBottomRight, innerMargin, { borderColor }]} />
              </View>
            </View>
          </View>
          <View style={[styles.accuracyGauge, { height: gaugeHeight }]} />
        </View>
      </View>
    )
  }
}

const outer = {
  flex: 1,
  borderColor: "#FFFFFF70"
}

const innerMargin = {
  margin: 5
}
const outerWidth = 5
const innerWidth = 3

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black"
  },
  root: {
    // backgroundColor: "yellow",
    height: 150,
    aspectRatio: 0.8,
    borderWidth: 1,
    borderColor: "black",
    flexDirection: "row"
  },
  row: {
    flexDirection: "row",
    flex: 1
  },
  outerTopLeft: {
    ...outer,
    borderLeftWidth: outerWidth,
    borderTopWidth: outerWidth
  },
  outerTopRight: {
    ...outer,
    borderRightWidth: outerWidth,
    borderTopWidth: outerWidth
  },
  outerBottomLeft: {
    ...outer,
    borderLeftWidth: outerWidth,
    borderBottomWidth: outerWidth
  },
  outerBottomRight: {
    ...outer,
    borderRightWidth: outerWidth,
    borderBottomWidth: outerWidth
  },
  innerTopLeft: {
    ...outer,
    borderLeftWidth: innerWidth,
    borderTopWidth: innerWidth
  },
  innerTopRight: {
    ...outer,
    borderRightWidth: innerWidth,
    borderTopWidth: innerWidth
  },
  innerBottomLeft: {
    ...outer,
    borderLeftWidth: innerWidth,
    borderBottomWidth: innerWidth
  },
  innerBottomRight: {
    ...outer,
    borderRightWidth: innerWidth,
    borderBottomWidth: innerWidth
  },
  accuracyGauge: {
    width: "5%",
    backgroundColor: "green",
    marginLeft: 10,
    bottom: 0,
    top: 0,
    alignSelf: "flex-end"
  }
})
