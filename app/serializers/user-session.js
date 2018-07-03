import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({

    normalizeResponse(store, primaryModelClass, payload, id, requestType){
        let data = payload['record'];
        payload = {
            data: {
                email: data.email,
                password: data.password,
                persistence_token: data.persistence_token,
                type: 'user-session',
                id: data.id
            }
        };

        console.log('&&&&&&&&&&&&&&&');
        console.log(data);
        console.log(payload.data);

        return this._super(store, primaryModelClass, payload, id, requestType);
    },

    serialize(snapshot, options){
        let json = this._super(...arguments);

        console.log('^^^^^^^^^^^^^^^^^^^^^^');

        json = json['data']['attributes'];
        console.log(json);
        return json;
    }
});
