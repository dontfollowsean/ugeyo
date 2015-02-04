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
      events: calendarEvents,
      header: {
      	left: 'prev,next today',
      	center: 'title',
      	right: 'month,agendaWeek,agendaDay'
      },
      editable: false,
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
	//console.log('renderE '+calendarEvents);

}),


actions: {
	addEvent: function() {
		var newEvent = {title: this.eventTitle, start: this.newEvent, allDay: false};
		this.theEvents.pushObject(newEvent);
		this.$("#calendar").fullCalendar('renderEvent', newEvent, true);

	}
}


});
