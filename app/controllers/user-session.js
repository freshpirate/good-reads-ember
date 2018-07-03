import Controller from 'good-reads-ember/controllers/application';
import { inject as service } from '@ember/service';

// let $ = Ember.$;

export default Controller.extend({
    ajax: Ember.inject.service(),
    cookies: service(),

    email: '',
    password: '',

    responseMessage: '',
    flashMessage: '',
    flashType: '',
    
    getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    },

    init(params){
        this.set('flashMessage', this.getParameterByName('flash_message'));
        this.set('flashType', this.getParameterByName('flash_type'));
    },

    actions: {
        login(){
            let cookieService = this.get('cookies');
            cookieService.clear('gr_api_key');

            let { email, password } = this.getProperties('email', 'password');

            // const session = this.get('store').createRecord('user-session', {
            //     email: email,
            //     password: password
            // });

            // session.save().then(response => {
            //     console.log("^^^^^^^^^^^^^^^^");
            //     console.log(typeof response);
            //     console.log(JSON.stringify(response));
            //     this.set('responseMessage', 'Logged in successfully!');
            // });

            let request = this.ajax.post(
                '/user_sessions.json',
                {
                    data: JSON.stringify(
                        {
                            email: email,
                            password: password
                        }
                    )
                }
            );

            request.then(response => {
                console.log(response);

                let token = response.user.record.persistence_token;
                cookieService.write('gr_api_key', token);
            
                console.log(cookieService.read());
                this.set('responseMessage', 'Logged in successfully!');
                
                setTimeout(()=>{
                    this.transitionToRoute('index');
                }, 2000);

                setTimeout(() => {
                    this.set('userSignedIn', true);
                    console.log('SEMAPHORE: ', this.get('userSignedIn'));
                }, 2500);
            })

        }
    }
});
