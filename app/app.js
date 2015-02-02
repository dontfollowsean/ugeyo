import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import config from './config/environment';

Ember.MODEL_FACTORY_INJECTIONS = true;

var App = Ember.Application.extend({
	modulePrefix: config.modulePrefix,
	podModulePrefix: config.podModulePrefix,
	Resolver: Resolver
});


var kinveyOptions = {
	appKey : 'kid_TeqDzWKufm',
	appSecret : 'dc90c1194202411db99472bde66bdc26',//TODO: MASTER KEY!!!
	debug : true // Show debug messages.
};
//dont forget to Add kinvey to .jshintrc predefinitions
Ember.Application.initializer({
	name : 'kinvey',
	initialize : function(container, application) {
		// `Kinvey.init` returns a boolean indicating whether there is an
		// active user. If so, reload the user to fetch all its attributes
		// (username, e-mail etc.).
		var isLoggedIn = Kinvey.init(container, application, kinveyOptions);
		if(isLoggedIn) {
			Kinvey.getActiveUser().reload();
		}
	}
});

// Add an additional initializer which injects the active user into your
// controllers and routers. This is optional.
Ember.Application.initializer({
	name : 'activeUser',
	after : 'kinvey',
	initialize : function(container, application) {
		application.inject('controller', 'activeUser', 'user:active');
		application.inject('router', 'activeUser', 'user:active');
	}
}); 



loadInitializers(App, config.modulePrefix);

export default App;
