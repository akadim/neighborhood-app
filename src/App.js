import React, { Component } from 'react';
import './App.css';
import LocationSearchForm from './LocationSearchForm';
import LocationsList from './LocationsList';

class App extends Component {

  state = {
    places: [],
    filteredPlaces: [],
    selectedPlace : 'null',
    markers: []
  }

  componentDidMount() {

    fetch('https://api.foursquare.com/v2/search/recommendations?client_id=KDXSZH4CFJLAZOZHO4PXD2S2ZWCMILIFNPDTLY3FBQOPQOG0&client_secret=UL440FTV4FOYFGIR2EW4DWWTT4GQZG5MY2ZH2T4GB5AUHTPB&limit=10&v=20180323&ll=50.091521,14.433538&query=food')
      .then(response => response.json())
      .then(data => {
        this.setState({ 
          places: data.response.group.results,
          filteredPlaces: data.response.group.results 
       })
       this.renderMap();
      });
      
      this.renderMap();
  }

  renderMap = () => {
      loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyDiSl8YnROsGNFrUA40vmOgB8xMcV3VJ48&v=3&callback=initMap");
      window.initMap = this.initMap;
  }

  initMap = () => {
      var self=this;
      const { filteredPlaces } = this.state;

      var map = new window.google.maps.Map(document.getElementById('map'), {
          center: {lat: 50.091521, lng: 14.433538},
          zoom: 13
      });

      if(filteredPlaces.length > 0) {
          var bounds = new window.google.maps.LatLngBounds();
          var infoWindow = new window.google.maps.InfoWindow();

          var markers = [];


          for(var i=0; i < filteredPlaces.length; i++) {
              
              var marker = new window.google.maps.Marker({
                  map: map,
                  title: filteredPlaces[i].venue.name,
                  position: {lat: filteredPlaces[i].venue.location.lat, lng: filteredPlaces[i].venue.location.lng },
                  id: i,
                  placeId: filteredPlaces[i].venue.id,
                  photo: filteredPlaces[i].photo.prefix + '100x100' + filteredPlaces[i].photo.suffix
              });

              if(self.state.selectedPlace === filteredPlaces[i].venue.location.lat + ',' + filteredPlaces[i].venue.location.lng ) {
                  marker.setAnimation(window.google.maps.Animation.BOUNCE);
                  window.setTimeout(function() {
                  marker.setAnimation(null);
                  }, 2000);  
              }

              bounds.extend({lat: filteredPlaces[i].venue.location.lat, lng: filteredPlaces[i].venue.location.lng});

              marker.addListener('click', function() {
                  if(infoWindow.marker !== marker) {
                      infoWindow.marker = marker;
                      infoWindow.setContent('<div>'+
                                              '<center>' +
                                              '<img class="infoWindow-image" src="'+ this.photo  +'" alt="'+ this.title +'"/><br/><br/>' +
                                              '<p>' + this.title  +'</p>' +
                                              '<a alt="'+ this.title +' details" href="https://foursquare.com/v/' + this.title +'/'+ this.placeId +'" target="_blank">See more details</a>' +
                                              '</center>' + 
                                          '</div>');
                      infoWindow.open(map, this);
          
                      infoWindow.addListener('closeclick', function() {
                          infoWindow.marker = null;
                      });
          
                  }
              });

              markers.push(marker);
          }


          map.fitBounds(bounds);
      }
  }

  showLocationInfoWindow = (marker, infoWindow, map, place) => {
      if(infoWindow.marker !== marker) {
          infoWindow.marker = marker;
          infoWindow.setContent('<div>'+
                                  '<strong>' + marker.title  +'</strong>' +
                                  '<img class="infoWindow-image" src="'+ place.venue.photo.prefix +'36x36"'+ place.venue.photo.suffix +'/>' + 
                              '</div>');
          infoWindow.open(map, marker);

          infoWindow.addListener('closeclick', function() {
              infoWindow.marker = null;
          });

      }
  }

  onLocationChanged = (evt) => {
       this.setState({ selectedPlace : evt.target.getAttribute('data-lat') + ',' + evt.target.getAttribute('data-lng') }, () => {
          window.initMap();
       });
  }

  getFilteredPlaces = (filteredPlaces) => {
     this.setState({ filteredPlaces : filteredPlaces }, () => {
        window.initMap();
     })
  }

  render() {
    
    return (
      <div className="row mr-0 full-height">
              <div className="col-md-4 col-12">
                  <div className="pl-4 pt-3">
                      <div className="row pb-4" tabIndex="0">
                      <div className="page-header">
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
                 <div id="map">
                    <span className="font-weight-bold pt-1 pl-1">Google Maps requires an internet connection and will not load until your connection has been re-established</span>
                 </div> 
              </div>
      </div>
    );
  }
}

function loadScript(url) {
   var index = document.getElementsByTagName('script')[0];
      var script = document.createElement('script');
      script.src = url;
      script.async = true;
      script.defer = true;
      script.onerror = function () {
          console.log("Something went wrong");
          document.getElementById('map').style.backgroundColor = "grey";
          document.getElementById('searchLocation').style.display = 'none';
      }

      index.parentNode.insertBefore(script, index);
}

export default App
