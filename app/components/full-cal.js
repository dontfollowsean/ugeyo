import Ember from 'ember';

export default Ember.Component.extend({
	newEvent: "",
	eventTitle: "",

	_initializeCalendar: (function() {

		var self = Ember.$('#calendar');


		//console.log( this.theEvents  );
    // console.log('init theEvents: '+this.theEvents[0].get('start'));
    var calendarEvents = this.theEvents;
    console.log("calendarEvents>");
    console.log(calendarEvents);
    return self.fullCalendar({
      events: calendarEvents,//access array of events here
      //TODO: show events from kinvey in calendar
      // events: [
      // {
      // 	title: 'All Day Event',
      // 	start: '2015-01-01'
      // },
      // {
      // 	title: 'Long Event',
      // 	start: '2015-01-07',
      // 	end: '2015-01-10'
      // },
      // {
      // 	id: 999,
      // 	title: 'Repeating Event',
      // 	start: '2015-01-09T16:00:00'
      // },
      // {
      // 	id: 999,
      // 	title: 'Repeating Event',
      // 	start: '2015-01-16T16:00:00'
      // },
      // {
      // 	title: 'Conference',
      // 	start: '2015-01-01',
      // 	end: '2015-01-13'
      // },
      // {
      // 	title: 'Meeting',
      // 	start: '2015-01-12T10:30:00',
      // 	end: '2015-01-12T12:30:00'
      // },
      // {
      // 	title: 'Lunch',
      // 	start: '2015-01-12T12:00:00'
      // },
      // {
      // 	title: 'Meeting',
      // 	start: '2015-01-12T14:30:00'
      // },
      // {
      // 	title: 'Happy Hour',
      // 	start: '2015-01-12T17:30:00'
      // },
      // {
      // 	title: 'Dinner',
      // 	start: '2015-01-12T20:00:00'
      // },
      // {
      // 	title: 'Birthday Party',
      // 	start: '2015-01-13T07:00:00'
      // },
      // {
      // 	title: 'Click for Google',
      // 	url: 'http://google.com/',
      // 	start: '2015-01-28'
      // }
      // ],
      header: {
      	left: 'prev,next today',
      	center: 'title',
      	right: 'month,agendaWeek,agendaDay'
      },
      editable: true,
      theme: false,
      eventLimit: true,
      dayClick: function(date, jsEvent, view) {

      	console.log('Clicked on: ' + date.format());

      	console.log('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);

      	console.log('Current view: ' + view.name);

        // change the day's background color just for fun
        //Ember.$(this).css('background-color', 'red');

        self.fullCalendar('gotoDate', date);
        self.fullCalendar('changeView', 'agendaDay');
    },
    eventMouseOver: function( event, jsEvent, view ) { 
    	console.log('Hover over: ' + event.title);
    },
    eventClick: function(calEvent, jsEvent, view) {

    	console.log('Event: ' + calEvent.title);
    	console.log('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
    	console.log('View: ' + view.name);

        // change the border color just for fun
        // $(this).css('border-olor', 'red');
        Ember.$(this).toggleClass('red-outline');

    }
});
}).on("didInsertElement"),

renderEvents: (function(){
	var self = Ember.$('#calendar');
	self.fullCalendar( 'rerenderEvents' );
	console.log('renderE '+this.theEvents);

}),


actions: {
	addEvent: function() {
		var newEvent = {title: this.eventTitle, start: this.newEvent, allDay: false};
		this.theEvents.pushObject(newEvent);
		this.$("#calendar").fullCalendar('renderEvent', newEvent, true);

	},
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
