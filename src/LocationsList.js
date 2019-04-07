import React, { Component } from 'react';

class LocationsList extends Component {
    render() {
        const { places, onLocationClicked } = this.props;

        return (
            <div id="locations-list" className="list-group">
               {places.map( (place, index) => (
                   <button type="button" className="list-group-item list-group-item-action" data-lat={place.venue.location.lat} data-lng={place.venue.location.lng} key={index} onClick={onLocationClicked}>{place.venue.name}</button>
               ) )} 
            </div>
        );
    }
}

export default LocationsList;