import React, { Component } from 'react';

class LocationsList extends Component {
    render() {
        const { places, onLocationClicked } = this.props;

        return (
            <div id="locations-list" className="list-group">
               {places.map( (place, index) => (
                   <a href="#" className="list-group-item list-group-item-action" data-id={index} key={index} onClick={onLocationClicked}>{place.venue.name}</a>
               ) )} 
            </div>
        );
    }
}

export default LocationsList;