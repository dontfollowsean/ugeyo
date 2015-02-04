import Ember from 'ember';

export default Ember.Route.extend({
	afterModel: function(model, transition) {

		var isAuthenticated = sessionStorage.getItem('isAuthenticated'),
		currentRoute = Ember.get(transition, 'targetName');

		if(isAuthenticated) {
			this.transitionTo(currentRoute || 'index');
		} else {
			//this.transitionTo('login');
		}
	},
	actions: {
		pingKinvey: function(){
			var promise = Kinvey.ping();
			promise.then(function(response) {
				alert('Kinvey Ping Success. Kinvey Service is alive, version: ' + response.version + ', response: ' + response.kinvey);
			}, function(error) {
				alert('Kinvey Ping Failed. Response: ' + error.description);
			});
		}
	}
});
