import React, { Component } from "react"
import { StyleSheet, View, Image } from "react-native"

const INNER_MARGIN = { margin: 5 }
const OUTER_WIDTH = 5
const INNER_WIDTH = 3

export class Identifier extends Component {
  state = { borderActive: false, showImage: false }

  static defaultProps = {
    style: { height: 150, width: null },
    accuracy: 0,
    blinkRate: 750,
    gaugeWidth: 8
  }

  static getDerivedStateFromProps(props, state) {
    props.accuracy > 0.85 ? this.startImage : this.stopImage
    return state
  }

  componentDidMount() {
    const timer = () => {
      const { blinkRate, accuracy } = this.props
      setTimeout(() => {
        this.setState(state => {
          return { borderActive: !state.borderActive }
        })
        timer()
      }, blinkRate * (1 - accuracy) + 60)
    }
    timer()
    this.startImage()
  }

  handleBorderColor() {
    const { borderActive } = this.state
    const { accuracy } = this.props
    if (borderActive && accuracy > 0.85) {
      return "#00FF00"
    } else if (borderActive && accuracy < 0.5) {
      return "red"
    } else if (borderActive && 0.5 > accuracy < 0.85) {
      return "yellow"
    } else {
      return "transparent"
    }
  }

  handleGaugeColor() {
    const { accuracy } = this.props
    if (accuracy > 0.85) {
      return "#00FF00"
    } else if (accuracy < 0.5) {
      return "red"
    } else if (0.5 > accuracy < 0.85) {
      return "yellow"
    } else {
      return "transparent"
    }
  }

  renderImage() {
    const {
      image,
      imageStyle,
      style: { height, width }
    } = this.props
    const aspectRatio = width ? null : 0.8
    return (
      <View
        style={{
          position: "absolute",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Image style={[styles.image, { height, width, aspectRatio }, imageStyle]} source={image} />
      </View>
    )
  }

  startImage() {
    this.interval = setInterval(() => {
      this.setState(state => {
        return { showImage: !state.showImage }
      })
    }, 500)
  }

  stopImage() {
    this.interval && this.interval.clear()
  }

  render() {
    const {
      accuracy,
      image,
      style,
      style: { width, height },
      gaugeWidth
    } = this.props
    const { showImage } = this.state
    const gaugeHeight = `${(accuracy * 100).toString()}%`
    const aspectRatio = width ? null : 0.8
    const imageActive = accuracy > 0.85 && showImage && image

    return (
      <View style={[styles.root, style]}>
        <View>
          {imageActive && this.renderImage()}
          <View style={styles.row}>
            <View style={styles.outerTopLeft}>
              <View
                style={[
                  styles.innerTopLeft,
                  INNER_MARGIN,
                  { borderColor: this.handleBorderColor() }
                ]}
              />
            </View>
            <View style={{ width: "40%" }} />
            <View style={styles.outerTopRight}>
              <View
                style={[
                  styles.innerTopRight,
                  INNER_MARGIN,
                  { borderColor: this.handleBorderColor() }
                ]}
              />
            </View>
          </View>
          <View style={{ height: "50%" }} />
          <View style={styles.row}>
            <View style={styles.outerBottomLeft}>
              <View
                style={[
                  styles.innerBottomLeft,
                  INNER_MARGIN,
                  { borderColor: this.handleBorderColor() }
                ]}
              />
            </View>
            <View style={{ width: "40%" }} />
            <View style={styles.outerBottomRight}>
              <View
                style={[
                  styles.innerBottomRight,
                  INNER_MARGIN,
                  { borderColor: this.handleBorderColor() }
                ]}
              />
            </View>
          </View>
        </View>
        <View
          style={[
            styles.accuracyGauge,
            { height: gaugeHeight, width: gaugeWidth, backgroundColor: this.handleGaugeColor() }
          ]}
        />
      </View>
    )
  }
}

const outer = {
  flex: 1,
  borderColor: "#FFFFFF70"
}

const styles = StyleSheet.create({
  root: {
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
    borderLeftWidth: OUTER_WIDTH,
    borderTopWidth: OUTER_WIDTH
  },
  outerTopRight: {
    ...outer,
    borderRightWidth: OUTER_WIDTH,
    borderTopWidth: OUTER_WIDTH
  },
  outerBottomLeft: {
    ...outer,
    borderLeftWidth: OUTER_WIDTH,
    borderBottomWidth: OUTER_WIDTH
  },
  outerBottomRight: {
    ...outer,
    borderRightWidth: OUTER_WIDTH,
    borderBottomWidth: OUTER_WIDTH
  },
  innerTopLeft: {
    ...outer,
    borderLeftWidth: INNER_WIDTH,
    borderTopWidth: INNER_WIDTH
  },
  innerTopRight: {
    ...outer,
    borderRightWidth: INNER_WIDTH,
    borderTopWidth: INNER_WIDTH
  },
  innerBottomLeft: {
    ...outer,
    borderLeftWidth: INNER_WIDTH,
    borderBottomWidth: INNER_WIDTH
  },
  innerBottomRight: {
    ...outer,
    borderRightWidth: INNER_WIDTH,
    borderBottomWidth: INNER_WIDTH
  },
  accuracyGauge: {
    backgroundColor: "green",
    marginLeft: 10,
    bottom: 0,
    top: 0,
    alignSelf: "flex-end"
  },
  image: {
    resizeMode: "contain",
    alignSelf: "center"
  }
})
