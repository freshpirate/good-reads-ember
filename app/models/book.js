import DS from 'ember-data';

export default DS.Model.extend({
    title: DS.attr('string'),
    isbn_number: DS.attr('string'),
    author: DS.attr('string'),
    synopsis: DS.attr('string'),
    published_year: DS.attr('string'),
    language: DS.attr('string'),
    cover: DS.attr('string'),
    publisher: DS.attr('string'),
    average_rating: DS.attr('number', {
        defaultValue: 0.0
    }),
    rating_count: DS.attr('number', {
        defaultValue: 0
    }),
});
