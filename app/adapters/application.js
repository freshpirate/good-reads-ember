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
    }

});
