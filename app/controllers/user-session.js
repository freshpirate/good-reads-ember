import Controller from 'good-reads-ember/controllers/application';
import { inject as service } from '@ember/service';

// let $ = Ember.$;

export default Controller.extend({
    ajax: Ember.inject.service(),
    cookies: service(),

    email: '',
    password: '',

    responseMessage: '',

    actions: {
        login(){
            let cookieService = this.get('cookies');
            cookieService.clear('gr_api_key');

            let { email, password } = this.getProperties('email', 'password');

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

                if (response.error){
                    this.get('flashMessages').danger(response.status.messages);
                }else{
                    let token = response.user.record.persistence_token;
                    cookieService.write('gr_api_key', token);
                    console.log(cookieService.read());

                    this.get('flashMessages').success('Logged in Successfully!');
                    this.transitionToRoute('index');
                    setTimeout(() => {
                        this.set('userSignedIn', true);
                        console.log('SEMAPHORE: ', this.get('userSignedIn'));
                    }, 2500);
                }
            })

        }
    }
});
