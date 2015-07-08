import Ember from 'ember';

export default Ember.Component.extend({ 
    centerLat: 25.7216, //TODO: base initial lat/lon on user location.
    centerLon: -80.2793,
    map: null,
    getLocation: function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.get('currentPostion').bind(this));
        } else {
            console.log('Geolocation is not supported');
        }
    }.on('willInsertElement'),
    currentPostion: function(pos) {
        this.set('centerLat', pos.coords.latitude);
        this.set('centerLon', pos.coords.longitude);
    }, 
    insertMap: function() {
        var self = this;
    	var container = Ember.$('.map-canvas')[0];
        var options = {
            center: new window.google.maps.LatLng(
                this.get('centerLat'),
                this.get('centerLon')
            ),
            zoom: 15
        };
        this.set('map', new window.google.maps.Map(container, options));
        this.eventMarkers.forEach(function(e) {
            e.setMap(self.get('map'));
        });
    }.on('didInsertElement')
});