import DS from 'ember-data';
import { belongsTo } from 'ember-data/relationships';

export default DS.Model.extend({
    review: DS.attr('string'),
    rating: DS.attr('string'),

    user: belongsTo('user'),
    book: belongsTo('book')
});
