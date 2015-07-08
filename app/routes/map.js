import Ember from 'ember';

export default Ember.Route.extend({
	model: function() {
		//get all events for calendar to render
		var promise = this.store.find('event');
		promise.then(fulfill,reject);

		function fulfill(response) {
			console.log("Kinvey response: " + response);
		}
		function reject(error) {
			console.log("Kinvey response error: " + error.error);
		}

		return promise;
		
	},
	setupController: function(controller, model) {
		var eventClasses = model.toArray();
		var markers =[];

		eventClasses.forEach(function(e){
			var lat = e.get('lat');
			var lng = e.get('lng');
			var newMarker = new google.maps.Marker({
				title: e.get('title'),
				position: new window.google.maps.LatLng(lat, lng)
			});
			markers.push(newMarker);
		});
		//console.log(model);
		controller.set('markers',markers );
	}
});
