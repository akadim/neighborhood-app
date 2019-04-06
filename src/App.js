import React, { Component } from 'react';
import './App.css';
import LocationSearchForm from './LocationSearchForm';
import LocationsList from './LocationsList';
import LocationsMap from './LocationsMap';

class App extends Component {

  state = {
    places: [],
    filteredPlaces: [],
    selectedPlace : null
  }

  componentDidMount() {

    fetch('https://api.foursquare.com/v2/venues/explore?client_id=KDXSZH4CFJLAZOZHO4PXD2S2ZWCMILIFNPDTLY3FBQOPQOG0&client_secret=CLIENT_SECRET&limit=10&v=20180323&ll=50.091521,14.433538&query=food')
      .then(response => response.json())
      .then(data => this.setState({ 
         places: data.response.groups[0].items,
         filteredPlaces: data.response.groups[0].items 
      }));
  }

  onLocationChanged = (evt) => {
       this.setState({ selectedPlace : evt.target.getAttribute('data-id') });
  }

  getFilteredPlaces = (filteredPlaces) => {
     this.setState({ filteredPlaces : filteredPlaces })
  }

  render() {
    return (
      <div className="row mr-0 full-height">
              <div className="col-md-4 col-12">
                  <div className="pl-4 pt-3">
                      <div className="row pb-4" tabIndex="0">
                      <div class="page-header">
                         <h1>Neighborhood App</h1>
                      </div>
                            <LocationSearchForm places={this.state.places} onPlacesFiltered={this.getFilteredPlaces} /> 
                      </div>
                      <div className="row" tabIndex="0">
                            <LocationsList places={this.state.filteredPlaces} onLocationClicked={this.onLocationChanged} />
                      </div>
                  </div>
              </div>
              <div className="col-md-8 col-12">
                  <LocationsMap places={this.state.filteredPlaces} selectedPlace = {this.state.selectedPlace} />
              </div>
      </div>
    );
  }
}

export default App
