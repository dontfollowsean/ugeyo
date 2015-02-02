import Ember from 'ember';

export default Ember.Controller.extend({
	needs: ['application'],

	application: Ember.computed.alias('controllers.application'),

	username: '',
	password: '',
	//TODO: use this for logout
	reset: function() {
		this.setProperties({
			username: '',
			password: ''
		});
		this.store.deleteRecord('user', 1);
	},

	isLoginCorrect: function() {
		return (this.get('username') === 'sean' && 
			this.get('password') === 'admin');
	},

	actions: {

		login: function() {
			var self = this,
			store = this.store;

			if(self.isLoginCorrect()) {

				// set the username, password in the ember data store (cache)
				store.push("user", {
					id: 1, // should be something better
					username: self.get('username'),
					password: self.get('password')
				});

				// set the username, password and authentication flag in the session storage
				sessionStorage.setItem('isAuthenticated', true);
				sessionStorage.setItem('username', self.get('username'));
				sessionStorage.setItem('password', self.get('password'));

				// set the authentication flag in the application controller
				this.set('application.isAuthenticated', true);

				this.transitionToRoute('index');
			} else {
				this.reset();
			}
		},

	}
});
