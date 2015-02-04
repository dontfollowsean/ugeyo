import Ember from 'ember';
import {MAP_TYPES} from '../components/google-map';

export default Ember.Controller.extend({
	lat:         10,
	lng:         10,
	zoom:        5,
	type:        'road',
	mapTypes:    MAP_TYPES,
	markers: [
	{title: 'one', lat: 5, lng: 5, description: 'hello 1', isDraggable: true},
	{title: 'two', lat: 5, lng: 0, hasInfoWindow: false},
	{
		title:                  'three',
		lat:                    0,
		lng:                    5,
		infoWindowTemplateName: 'marker-info-window',
		helloWorld:             'Hello World!'
	}
	]
});