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

	//the model for this route is a promise. FullCalendar expects a simple Array of objects
	//use setup controller to take data from response array of classes and create array of
	//event objects
	setupController: function(controller, model) {
		var eventClasses = model.toArray();
		var allEvents =[];

		console.log("newEvents");
		eventClasses.forEach(function(e){
			var newEvent={};
			newEvent.title = e.get('title');
			newEvent.start =  e.get('start');
			newEvent.end = e.get('end');
			newEvent.allDay = e.get('allDay');
			console.log(newEvent);
			allEvents.push(newEvent);
		});

		controller.set('events', allEvents);
	}
});
