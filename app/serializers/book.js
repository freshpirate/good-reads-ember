import DS from 'ember-data';

export default DS.RESTSerializer.extend({

    normalizeResponse(store, primaryModelClass, payload, id, requestType){
        console.log(payload);

        if (payload.hasOwnProperty('error') && payload.error){
            window.location = "/user-session?flash_type=danger&flash_message=Login required"
            return;
        }
        
        payload = {
            books: payload
        };

        // console.log(payload);

        return this._super(store, primaryModelClass, payload, id, requestType);
    }
});
