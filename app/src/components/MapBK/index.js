// @flow
import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import MapView from "react-native-maps";
import { Images } from "../../theme";
import styles from "./styles";

const DEFAULT_PADDING = { top: 40, right: 40, bottom: 40, left: 40 };

class Map extends React.Component {
  static propTypes = {
    markers: PropTypes.array,
    children: PropTypes.node,
    initialRegion: PropTypes.object
  };

  static defaultProps = {
    markers: undefined,
    children: undefined,
    initialRegion: {
      latitude: 24.8690857,
      longitude: 67.0856047,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121
    }
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
        latitude: o.latitude,
        longitude: o.longitude
      }));
    } else {
      console.error("No markers found");
      return;
    }

    this.map.fitToCoordinates(_markers, {
      edgePadding,
      animated
    });
  }

  render() {
    const { children, markers, initialRegion, ...rest } = this.props;

    let _markers;

    if (markers) {
      _markers = markers.map((marker, index) => {
        const location = {
          latitude: marker.latitude,
          longitude: marker.longitude
        };
        return (
          <MapView.Marker
            title={marker.name || marker.title}
            // eslint-disable-next-line react/no-array-index-key
            key={`marker_${index}`}
            onPress={() => this.props.showDescriptor(index)}
            coordinate={location}
            identifier={`marker_${index}`}
            description={marker.description}
            image={
              Images[`${marker.categories_list_id.title.toLowerCase()}_marker`]
            }
          />
        );
      });
    }

    return (
      <MapView
        onPress={() => this.props.hideDescriptor()}
        ref={ref => {
          this.map = ref;
        }}
        initialRegion={initialRegion}
        {...rest}
        style={styles.container}
      >
        {_markers && _markers}
        {children}
      </MapView>
    );
  }
}

export default Map;
