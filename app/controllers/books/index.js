import Controller from '@ember/controller';

export default Controller.extend({
    queryParams: ['page', 'perPage'],
    
    // binding the property on the paged array
  // to the query params on the controller
//   page: Ember.computed.alias("content.page"),
//   perPage: Ember.computed.alias("content.perPage"),
//   totalPages: Ember.computed.alias("content.totalPages")
});
