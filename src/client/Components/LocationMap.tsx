import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
	width: '100%',
	height: '100%',
};

const maps_api_key = process.env.REACT_APP_MAPS_API_KEY;
console.log('API KEY', process.env.NODE_ENV);

class MapContainer extends Component<any, any> {
	constructor(props: any){
		super(props)
	}
	render(){
		return (
			<Map
				google={this.props.google}
				zoom={4}
				style={mapStyles}
				initialCenter={{
					lat: 41,
					lng: -100,
				}}
			>
				<Marker position={{lat: 41, lng: -100}}></Marker>
			</Map>
		);
	}	
}	


const MapWrapper = GoogleApiWrapper({
	apiKey: maps_api_key,
})(MapContainer);

export default MapWrapper;