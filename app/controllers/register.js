import Controller from '@ember/controller';
import { gte, and, not, match } from '@ember/object/computed';
import { computed } from '@ember/object';
import ENV from '../config/environment';
import Ember from 'ember';
import { inject as service } from '@ember/service';


export default Controller.extend({
    ajax: Ember.inject.service(),
    cookies: service(),

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
            console.log("***************");
            let cookieService = this.get('cookies');
            cookieService.clear('gr_api_key');

            console.log(this.get('cookies').read());

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

            request.then(response=> {
                this.set('errorMessages', '');
                this.set('successMessages', '');

                console.log(response);
                if (response.error){
                    this.set('errorMessages', response.status.messages);
                    this.set('password', '');
                    this.set('password_confirm', '');
                }else{
                    this.set('successMessages', ['Registered Successfully!']);
                    this.set('name', '');
                    this.set('email', '');
                    this.set('password', '');
                    this.set('password_confirm', '');

                    cookieService.write('gr_api_key', response.user.persistence_token);

                    setTimeout(() => {
                        this.transitionToRoute('index');
                    }, 3000);
                }
            });

            console.log(request);
        }
    }
});
