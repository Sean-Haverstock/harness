import React, { Component, useState } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import ClimbCard from './ClimbCard';

const mapStyles = {
	width: '100%',
	height: '100%',
};

const maps_api_key = process.env.REACT_APP_MAPS_API_KEY;
console.log('API KEY', process.env.NODE_ENV);



class MapContainer extends Component<any, any> {
	constructor(props: any){
		super(props)
		console.log(this.props.routes)
		this.state = {
			climb: props.routes[0],
			open: false,
		}
	}
	
	displayMarkers = () => {
    return this.props.routes.map((route, index) => {
			return (
				<Marker					
					key={index} 
					position={{
						lat: route.latitude,
						lng: route.longitude
    			}}
					onClick={() => {
						this.setState({
						climb: route,
						open: true,	
					})
				}}
				/>
			)}
		)
  }

	handleClose = () => {
		this.setState({
			climb: this.state.climb,
			open: false,
		})
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
				containerStyle={{ width: '1280px', height: '1024px' }}
			>
				{this.displayMarkers()}
				<Modal
					style={{display:'flex', alignItems: 'center', justifyContent: 'center'}}
					open={this.state.open}
					onClose={this.handleClose}
					aria-labelledby="simple-modal-title"
					aria-describedby="simple-modal-description"
				>
					<ClimbCard
						key={this.state.climb.id}
						// style={{width: '500px'}}						
						name={this.state.climb.name}
						img={this.state.climb.raw.imgMedium}
						cssType={this.state.climb.type}
						type={this.state.climb.type}
						rating={this.state.climb.rating}
						stars={this.state.climb.stars} />
      	</Modal>
			</Map>
		);
	}	
}	

const MapWrapper = GoogleApiWrapper({
	apiKey: maps_api_key,
})(MapContainer);

export default MapWrapper;

