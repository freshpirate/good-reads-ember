import RESTAdapter from 'good-reads-ember/adapters/application';
import Ember from 'ember';

const { String: { pluralize, underscore } } = Ember;

export default RESTAdapter.extend({

    // pathForType(type){
    //     console.log('******************');
    //     console.log(type);
        
    //     return  pluralize(type) + '.json';
    // },

    buildURL(modelName, id, snapshot, requestType, query){

        var url = this._super(modelName, id, snapshot, requestType, query);
        console.log(url);
        return url + '.json';
    }
});
