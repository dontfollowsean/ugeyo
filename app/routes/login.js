import Ember from 'ember';

export default Ember.Route.extend({
	beforeModel: function() {
		Ember.$('#map-nav').removeClass('active');
		Ember.$('#cal-nav').removeClass('active');
		if (this.get('controllers.application.isAuthenticated')) {
			this.transitionToRoute('index');
		}  
	}
});
