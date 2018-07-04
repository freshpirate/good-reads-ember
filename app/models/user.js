import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr('string'),
    email: DS.attr('string'),
    
    reviews: DS.hasMany('review'),
    bookmarks: DS.hasMany('bookmark')
});