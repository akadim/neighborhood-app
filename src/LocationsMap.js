import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

class LocationsMap extends Component {
    
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {}
    };

    onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
    
    render() {

        var bounds = new this.props.google.maps.LatLngBounds();

        const { places } = this.props;
 
        for(var i=0; i < places.length; i++) {
            bounds.extend({lat: places[i].venue.location.lat, lng: places[i].venue.location.lng});
        }

        return (
            <Map 
                google={this.props.google} 
                zoom={14} 
                initialCenter={{
                lat: 50.091521,
                lng: 14.433538
                }}
                aria-label="Maps of Places with food"
                bounds={bounds}
                >
                
                {places.map( (place, index) => (
                    <Marker
                        id={index}
                        name={place.venue.name}
                        position={{lat: place.venue.location.lat, lng: place.venue.location.lng}} 
                        onClick={this.onMarkerClick}
                        animation={ ((parseInt(this.props.selectedPlace) === parseInt(index)) ? this.props.google.maps.Animation.BOUNCE : '0') }
                        key={index}
                    />
                ) )}
                
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}>
                    <div>
                      <strong>{this.state.selectedPlace.name}</strong>
                    </div>
                </InfoWindow>

            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: ("API_KEY")
  })(LocationsMap)