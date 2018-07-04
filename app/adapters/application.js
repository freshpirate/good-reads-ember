import RESTAdapter from 'ember-data/adapters/rest';
import Ember from 'ember';
import { inject as service } from '@ember/service';

export default RESTAdapter.extend({
    host: 'http://localhost:3000',
    cookies: service(),

    init(){
        this._super(...arguments);

        let cookieService = this.get('cookies');
        let key = cookieService.read('gr_api_key');
        console.log('KEY: ');
        console.log(key);

        this.set('headers', {
            'API_KEY': key
        })
    },

    buildURL(modelName, id, snapshot, requestType, query){

        var url = this._super(modelName, id, snapshot, requestType, query);
        console.log(url);
        return url + '.json';
    }

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
