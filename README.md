#### Description

A reticle for image detection

#### Introduction

This library is intended for identifying and highlighting part of an image (usually a face) with an accuracy indicator on a mobile device.

#### Installation

`npm i react-native-identifier`
or
`yarn add react-native-identifier`

### GIF

#### Typical Usage

![Typical Usage Example]("https://i.imgur.com/cR9QysY.gif")

##### With Optional Image Overlay

![Optional Image Example]("https://i.imgur.com/bmDG3UH.gif")

#### Example Usage

```
import { Identifier } from "react-native-identifier
...
<Identifier
  accuracy={this.state.accuracy}
  image={{ uri: "https://placekitten.com/201/201" }}
/>

----------------------------------------------------------------------------------------

import { Identifier } from "react-native-identifier
...
const myImage = require("./my-image.png")

<Identifier
  accuracy={this.state.accuracy}
  image={myImage}
  blinkRate={1000}
  gaugeWidth={12}
/>
```

#### Props

|         Name | Description                                                                                      | Default | Required |         Type          |
| -----------: | :----------------------------------------------------------------------------------------------- | :------ | :------: | :-------------------: |
|   `accuracy` | The accuracy rate of the identification from 0-1                                                 | `0`     |    NO    |       `Number`        |
|  `blinkRate` | The starting rate for the blinking indicators - increase for more delay - decrease for craziness | `750`   |    NO    |       `Number`        |
|      `image` | An optional image to blink on the identifier when accuracy is > 0.85 (85%)                       | N/A     |    NO    | `Object` or `require` |
|      `style` | An optional style override for the component - can be used to set its position on the screen     | N/A     |    NO    |       `Object`        |
| `gaugeWidth` | Width of the accuracy indicator gauge                                                            | `8`     |    NO    |       `Number`        |

##### License

[MIT License](./license.md)
