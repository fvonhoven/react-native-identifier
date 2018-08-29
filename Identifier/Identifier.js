import React, { Component } from "react"
import { StyleSheet, View, Image, Animated, Easing } from "react-native"

const INNER_MARGIN = { margin: 5 }
const OUTER_WIDTH = 5
const INNER_WIDTH = 3

export class Identifier extends Component {
  constructor(props) {
    super(props)
    this.state = { borderActive: false, showImage: false }
    this.animatedMeter = new Animated.Value(0)
  }

  static defaultProps = {
    accuracy: 0,
    blinkRate: 750,
    gaugeWidth: 8,
    horizontal: true,
    pulse: true
  }

  static getDerivedStateFromProps(props, state) {
    props.accuracy > 0.85 ? this.startImage : this.stopImage
    return state
  }

  componentDidMount() {
    const { blinkRate, accuracy, pulse, horizontal } = this.props
    const timer = () => {
      setTimeout(() => {
        this.setState(state => {
          return { borderActive: !state.borderActive }
        })
        timer()
      }, blinkRate * (1 - accuracy) + 60)
    }
    timer()
    this.startImage()
    horizontal && pulse && this.pulse()
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

  handlePulseRate() {
    const { accuracy } = this.props
    if (accuracy > 0.85) {
      return 400
    } else if (accuracy < 0.5) {
      return 700
    } else if (0.5 > accuracy < 0.85) {
      return 600
    }
  }

  renderImage() {
    const {
      image,
      imageStyle,
      style: { height, width }
    } = this.props
    return (
      <View
        style={{
          position: "absolute",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Image style={[styles.image, { height, width }, imageStyle]} source={image} />
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

  pulse() {
    this.animatedMeter.setValue(0.1)
    Animated.timing(this.animatedMeter, {
      toValue: 1,
      duration: this.handlePulseRate(),
      easing: Easing.sin
    }).start(() => this.pulse())
  }

  render() {
    const { accuracy, image, gaugeWidth, style, pulse, horizontal } = this.props
    const { showImage } = this.state
    const gaugeHeight = `${(accuracy * 100).toString()}%`
    const imageActive = accuracy > 0.85 && showImage && image
    const pulser = this.animatedMeter.interpolate({
      inputRange: [0, 1],
      outputRange: [0, accuracy]
    })
    console.log("HEY", pulser)
    const gaugeTransform = [{ scaleX: horizontal && pulse ? pulser : 1 }]
    return (
      <View
        style={{
          flexDirection: horizontal ? "column" : "row",
          marginLeft: horizontal ? 0 : gaugeWidth + 10,
          marginTop: horizontal ? gaugeWidth + 10 : 0,
          ...style
        }}
      >
        <View style={{ flex: 1 }}>
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
        <Animated.View
          style={[
            styles.accuracyGauge,
            {
              height: horizontal ? gaugeWidth : gaugeHeight,
              width: horizontal ? gaugeHeight : gaugeWidth,
              backgroundColor: this.handleGaugeColor(),
              marginLeft: horizontal ? 0 : 10,
              marginTop: horizontal ? 10 : 0,
              alignSelf: horizontal ? "center" : "flex-end",
              transform: gaugeTransform
            }
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
    bottom: 0,
    top: 0
  },
  image: {
    resizeMode: "contain",
    alignSelf: "center"
  }
})
