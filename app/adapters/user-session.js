import RESTAdapter from 'good-reads-ember/adapters/application';
import Ember from 'ember';

const { String: { pluralize, underscore } } = Ember;

export default RESTAdapter.extend({

    // pathForType(type){
    //     console.log('******************');
    //     console.log(type);
        
    //     return  pluralize(type) + '.json';
    // },

    // buildURL(modelName, id, snapshot, requestType, query){

    //     // console.log('**************');
    //     // console.log(modelName);
    //     // console.log(id);
    //     // console.log(snapshot);
    //     // console.log(requestType);
    //     // console.log(query);

    //     let url = this._super(modelName, id, snapshot, requestType, query);

    //     // console.log('**************');
    //     // console.log(url);

    //     url = 'http://localhost:3000/user_sessions.json';
    //     return url;
    // }
});
