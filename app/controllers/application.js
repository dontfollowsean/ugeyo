import Ember from 'ember';

export default Ember.Controller.extend({
	isAuthenticated: sessionStorage.getItem('isAuthenticated'),
	mapShown: false,
	calShown: true,

	authenticate: function() {
		var self = this,
		isAuthenticated;
		this.store.find('user', 1).then(function(user) {
			if(user) {
				self.set('user.username', user.get('username'));
				self.set('user.password', user.get('password'));
			} 
		}, function(err) {
			isAuthenticated = sessionStorage.getItem('isAuthenticated');
			if(isAuthenticated) {
				self.set('user.username', sessionStorage.getItem('username'));
				self.set('user.password', sessionStorage.getItem('password'));
			} else {
				self.set('user.username', '');
				self.set('user.password', '');
			}	
		});
	}.observes('isAuthenticated'),

	user: {	
		username: sessionStorage.getItem('username'),
		password: sessionStorage.getItem('password')
	},
	actions: {
		showMap: function(){

			this.set('mapShown',true);
			this.set('calShown',false);
			this.transitionToRoute('map');
			Ember.$('#map-nav').addClass('active');
			Ember.$('#cal-nav').removeClass('active');


		},
		showCal: function(){

			this.set('mapShown',false);
			this.set('calShown',true);	
			this.transitionToRoute('calendar');
			Ember.$('#cal-nav').addClass('active');
			Ember.$('#map-nav').removeClass('active');
			
			//Ember.$('#calendar').fullCalendar('render');
			


		}
	}
});
