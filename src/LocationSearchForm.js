import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp';

class LocationSearchForm extends Component {

    state = {
        query: ''
    }

    updateQuery = (query) => {
        this.setState({ query: query.trim() });
    }

    searchPlace = (event) => {
         console.log(this.state.query);
         event.preventDefault();
         let filteredPlaces;
         if(this.state.query && this.state.query !== '') {
            const match = new RegExp(escapeRegExp(this.state.query), 'i');
            filteredPlaces = this.props.places.filter( (place) => match.test(place.venue.name) );
         } else {
            filteredPlaces = this.props.places;
         }

         this.props.onPlacesFiltered(filteredPlaces);
    }

    render() {
        return (
            <form className="full-width" onSubmit={ (event) => {
                this.searchPlace(event)
            } }>
                <div className="form-group">
                    <label htmlFor="locationName">Place to search</label>
                    <input type="text" 
                           className="form-control" 
                           id="locationName" 
                           aria-label="Enter a Place to search" 
                           placeholder="Ex: Sansho" 
                           value={this.state.query}
                           onChange={ (event) => {this.updateQuery(event.target.value)} }
                    />
                </div>
                <button type="submit" className="btn btn-primary" id="searchLocation">Search</button>
            </form>
        );
    }
}

export default LocationSearchForm;