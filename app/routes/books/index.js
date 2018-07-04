import Route from '@ember/routing/route';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';

export default Route.extend(RouteMixin, {
    perPage: 30,

    model(params){
        // let promise = this.get('store').query('book', {
        //     page: {
        //         number: params.page,
        //         size: params.size
        //     }
        // });

        let promise =  this.findPaged('book', params);
        promise.then((books) =>{
            console.log('****** MODEL ******', books);
        });

        return promise;
    },

    // queryParams: {
    //     page: {
    //       refreshModel: true
    //     },
    //     size: {
    //       refreshModel: true
    //     }
    // }
});
