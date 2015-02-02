import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login', {path: '/login'});
  this.route('map', {path: '/map'});
  this.route('calendar', {path: '/calendar'});
});

export default Router;