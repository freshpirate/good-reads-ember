import DS from 'ember-data';

export default DS.RESTSerializer.extend({
    // normalizeFindAllResponse(store, type, payload) {
    //     // payload = [];

    //     payload.forEach(function(p){
    //         console.log(p);
    //         p['type'] = type;
    //     });

    //     console.log(JSON.stringify(payload));

    //     return {
    //       data: payload
    //     };
    //   }
    // serialize(store, type)

    normalizeResponse(store, primaryModelClass, payload, id, requestType){
        payload = {
            books: payload
        };

        // console.log(payload);

        return this._super(store, primaryModelClass, payload, id, requestType);
    }
});
