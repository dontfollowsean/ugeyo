import DS from 'ember-data';
export default Kinvey.Model.extend({
  title: DS.attr('string'),
  start: DS.attr('date'),
  end: DS.attr('date'),
  allDay: DS.attr('boolean'),
  lat: DS.attr(),
  lng: DS.attr()
});