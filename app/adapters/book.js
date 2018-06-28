import RESTAdapter from 'ember-data/adapters/rest';
import Ember from 'ember';

const { String: { pluralize, underscore } } = Ember;

export default RESTAdapter.extend({
    host: 'http://localhost:3000',

    // pathForType(type){
    //     console.log('******************');
    //     console.log(type);
        
    //     return  pluralize(type) + '.json';
    // },

    buildURL(modelName, id, snapshot, requestType, query){
        console.log(modelName);
        console.log(id);
        console.log(snapshot);
        console.log(requestType);
        console.log(query);

        var url = this._super(modelName, id, snapshot, requestType, query);
        console.log(url);
        return url + '.json';
    }
});
