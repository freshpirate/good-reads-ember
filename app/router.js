import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('register');
  this.route('books', function(){
    this.route('show', { path: '/:book_id' });
    this.route('edit', { path: '/edit/:book_id' });
  });
});

export default Router;
