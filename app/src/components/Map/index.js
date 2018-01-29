// @flow
import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import { Image, ImageBackground } from "react-native";
import MapView from "react-native-maps";

import Util from "../../util";
import styles from "./styles";
import { Images } from "../../theme";

const DEFAULT_PADDING = { top: 40, right: 40, bottom: 40, left: 40 };

const mapStyle = [
  {
    featureType: "landscape",
    elementType: "labels",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "transit",
    elementType: "labels",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "water",
    elementType: "labels",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "road",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    stylers: [
      {
        hue: "#00aaff"
      },
      {
        saturation: -100
      },
      {
        gamma: 2.15
      },
      {
        lightness: 12
      }
    ]
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      {
        visibility: "on"
      },
      {
        lightness: 24
      }
    ]
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        lightness: 57
      }
    ]
  }
];

class Map extends React.Component {
  static propTypes = {
    markers: PropTypes.array,
    children: PropTypes.node,
    initialRegion: PropTypes.object.isRequired
  };

  static defaultProps = {
    markers: undefined,
    children: undefined
  };

  static Marker = MapView.Marker;

  shouldComponentUpdate(nextProps: Object) {
    return !_.isEqual(nextProps, this.props);
  }

  getRef = () => this.map;

  map: any;

  fitAllMarkers(
    edgePadding: Object = DEFAULT_PADDING,
    animated: boolean = true,
    markers
  ) {
    let _markers;
    if (markers) {
      _markers = markers;
    } else if (this.props.markers) {
      _markers = _.map(this.props.markers, o => ({
        latitude: +this._getData(o, "latitude"),
        longitude: +this._getData(o, "longitude")
      }));
    } else {
      return;
    }

    this.map.fitToCoordinates(_markers, {
      edgePadding,
      animated
    });
  }

  _getData(marker: Object, property1: string, property2: ?string) {
    if (marker.events) {
      return (
        marker.events.attributes[property1] ||
        marker.events.attributes[property2] ||
        undefined
      );
    }
    if (marker) {
      return marker[property1] || marker[property2] || undefined;
    }
  }

  _getImage(marker) {
    if (
      marker.events &&
      marker.events.attributes &&
      marker.events.attributes.categories_list &&
      marker.events.attributes.categories_list.value
    ) {
      if (
        marker.events.attributes.categories_list.value === "Bars Clubs Lounges"
      ) {
        return Images.bar_marker;
      }
      return Images[
        `${marker.events.attributes.categories_list.value
          .replace(/\s/g, "")
          .toLowerCase()}_marker`
      ];
    } else if (
      marker.events &&
      marker.events.attributes &&
      marker.events.attributes.categories_list &&
      marker.events.attributes.categories_list.value
    ) {
      return Images[
        `${marker.events.attributes.categories_list.value
          .replace(/\s/g, "")
          .toLowerCase()}_marker`
      ];
    } else if (marker.events) {
      return Images.personal_marker;
    }

    return Images.friend_marker;
  }

  render() {
    const { children, markers, ...reset } = this.props;
    let _markers;
    if (markers) {
      _markers = markers.map((marker, index) => {
        const location = {
          latitude: +this._getData(marker, "latitude"),
          longitude: +this._getData(marker, "longitude")
        };
        const identifier = marker.events
          ? marker.events.entity_id.toString()
          : marker.entity_id.toString();

        if (!marker.events && marker.platform_id) {
          return (
            <MapView.Marker
              zIndex={index}
              key={identifier}
              coordinate={location}
              identifier={identifier}
              onPress={() => this.props.showDescriptor(index)}
            >
              <ImageBackground
                style={styles.userImageContainer}
                source={this._getImage(marker)}
              >
                <Image
                  style={styles.userImage}
                  source={{ uri: Util.getUserProfile(marker.platform_id) }}
                />
              </ImageBackground>
            </MapView.Marker>
          );
        }
        return (
          <MapView.Marker
            zIndex={index}
            key={identifier}
            coordinate={location}
            identifier={identifier}
            image={this._getImage(marker)}
            onPress={() => this.props.showDescriptor(index)}
          />
        );
      });
    }

    return (
      <MapView
        ref={ref => {
          this.map = ref;
        }}
        {...reset}
        style={styles.container}
        customMapStyle={mapStyle}

      >
        {_markers && _markers}
        {children}
      </MapView>
    );
  }
}

export default Map;
