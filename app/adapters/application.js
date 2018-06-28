import RESTAdapter from 'ember-data/adapters/rest';
import Ember from 'ember';

const { String: { pluralize, underscore } } = Ember;

export default RESTAdapter.extend({
    host: 'http://localhost:3000',
    pathForType(type){
        console.log(type);
        
        return  pluralize(type) + '.json';
    }
});
