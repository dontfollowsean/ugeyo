import Ember from 'ember';

export default Ember.Route.extend({
  model: function (params) {
  	console.log(this.loadGoogleMap());
    return this.loadGoogleMap();
  }
});
