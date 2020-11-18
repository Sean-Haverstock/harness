import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%'
};

const maps_api_key = process.env.MAPS_API_KEY

export class MapContainer extends Component {
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={
          {
            lat: 5,
            lng: 55,
          }
        }
      />
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.MAPS_API_KEY
})(MapContainer);