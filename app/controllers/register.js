import Controller from '@ember/controller';
import { gte, and, not, match } from '@ember/object/computed';
import { computed } from '@ember/object';
import ENV from '../config/environment';
import Ember from 'ember';

let $ = Ember.$;

export default Controller.extend({
    ajax: Ember.inject.service(),
    // session: Ember.inject.service('session'),
    
    name: '',
    email: '',
    password: '',
    password_confirm: '',

    errorMessages: [],
    isErrorPresent: gte('errorMessages.length', 1),

    successMessages: [],
    isSuccessPresent: gte('successMessages.length', 1),

    isEmailValid: match('emailAddress', /^.+@.+\..+$/),
    isNamePresent: gte('name.length', 3),
    isPasswordPresent: gte('password.length', 8),
    isPasswordValid: computed('password', 'password_confirm', function(){
        let password = this.get('password');
        let password_confirm = this.get('password_confirm');

        return password === password_confirm;
    }),
    
    isValid: and('isEmailValid', 'isNamePresent', 'isPasswordPresent', 'isPasswordValid'),
    isDisabled: not('isValid'),
    actions: {
        register(){
            let _that = this;

            let data = {
                name: this.get('name'),
                email: this.get('email'),
                password: this.get('password'),
                password_confirmation: this.get('password_confirm')
            };

            let request =  this.get('ajax').post(
                '/users.json',
                {
                    data: JSON.stringify(data)
                }
            );

            request.then((response)=> {
                _that.set('errorMessages', '');
                _that.set('successMessages', '');

                console.log(response);
                if (response.error){
                    _that.set('errorMessages', response.status.messages);
                    _that.set('password', '');
                    _that.set('password_confirm', '');
                }else{
                    _that.set('successMessages', ['Registered Successfully!']);
                    _that.set('name', '');
                    _that.set('email', '');
                    _that.set('password', '');
                    _that.set('password_confirm', '');

                    setTimeout(function(){
                        _that.transitionToRoute('index');
                    }, 3000);
                }
            });

            console.log(request);
        }
    }
});
