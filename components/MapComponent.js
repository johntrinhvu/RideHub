import { View, Text } from 'react-native';
import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import MapView, { Marker } from 'react-native-maps';
import { selectDestination, selectOrigin, setTravelTimeInformation } from '../slices/navSlice';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_APIKEY } from "@env";

const MapComponent = () => {
  const origin = useSelector(selectOrigin);

  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: origin?.location?.lat || 37.78825,
        longitude: origin?.location?.lng || -122.4324,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
    >
      {origin?.location && (
        <Marker
          coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
          }}
          title="Origin"
          description={origin.description}
          identifier="origin"
        />
      )}
    </MapView>
  );
}

export default MapComponent;