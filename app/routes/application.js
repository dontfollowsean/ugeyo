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
	}
});
