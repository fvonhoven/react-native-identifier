<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

### Table of Contents

- [Description](#description)
- [Introduction](#introduction)
- [Installation](#installation)
- [GIF](#gif)
  - [Typical Usage](#typical-usage)
  - [With Optional Image Overlay](#with-optional-image-overlay)
- [Example Usage](#example-usage)
- [Props](#props)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

#### Description

A reticle for image detection

#### Introduction

This library is intended for identifying and highlighting part of an image (usually a face) with an accuracy indicator on a mobile device.

#### Installation

`npm i react-native-identifier`
or
`yarn add react-native-identifier`

### GIFs

#### Typical Usage

![Typical Usage Example](https://i.imgur.com/cR9QysY.gif)

##### Optional Image Overlay

![Optional Image Example](https://i.imgur.com/bmDG3UH.gif)

#### Horizontal Meter

![Horizontal Meter Example](https://i.imgur.com/LU2gIoo.gif)

#### Horizontal Meter with Pulse

![Horizontal Meter with Pulse Example](https://i.imgur.com/xx5nTfN.gif)

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
|      `key`   | An optional style override for the component key                                                 | N/A     |    NO    |       `String`        |
|      `style` | An optional style override for the component - can be used to set its position on the screen     | N/A     |   YES    |       `Object`        |
|   `accuracy` | The accuracy rate of the identification from 0-1                                                 | `0`     |    NO    |       `Number`        |
|  `blinkRate` | The starting rate for the blinking indicators - increase for more delay - decrease for craziness | `750`   |    NO    |       `Number`        |
|      `image` | An optional image to blink on the identifier when accuracy is > 0.85 (85%)                       | N/A     |    NO    | `Object` or `require` |
| `gaugeWidth` | Width of the accuracy indicator gauge                                                            | `8`     |    NO    |       `Number`        |
| `horizontal` | Whether the accuracy gauge should be horizontal - underneath the reticle                         | `false` |    NO    |       `Boolean`       |
|      `pulse` | Whether the horizontal gauge should pulse out                                                    | `false` |    NO    |       `Boolean`       |

##### License

[MIT License](./license.md)
