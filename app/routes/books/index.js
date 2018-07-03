import Route from '@ember/routing/route';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';

export default Route.extend(RouteMixin, {
    perPage: 10,

    model(params){
        return this.get('store').query('book', {
            page: {
                number: params.page,
                size: params.size
            }
        });

        // return this.findPaged('book', params);
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
