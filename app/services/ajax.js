import Ember from 'ember';
import AjaxService from 'ember-ajax/services/ajax';
import ENV from '../config/environment';

export default AjaxService.extend({
  host: ENV.APP.API_URL,
  contentType: 'application/json; charset=utf-8'
});