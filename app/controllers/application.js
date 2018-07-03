import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed, observer } from '@ember/object';
import { not, reads} from '@ember/object/computed';

export default Controller.extend({
    cookies: service(),
    userSignedIn: false,
    init(){
        let cookieService = this.get('cookies');

        if (cookieService.exists('gr_api_key')  && cookieService.read('gr_api_key').length != 0){
            this.set('userSignedIn', true);
        }else{
            this.set('userSignedIn', false);
        }
    },
    anc: observer('userSignedIn', function(){
        console.log('in observer');
        window.location.reload(true);
        // this.set('userSignedIn', cookies._documentCookies.gr_api_key)
    }),
    userNotSignedIn: not('userSignedIn'),

    actions: {
        signOut(){
            console.log('In Sign Out Helper');
            let cookieService = this.get('cookies');

            if (cookieService.exists('gr_api_key')){
                cookieService.write('gr_api_key', '');
                this.set('userSignedIn', false);
            }
        }
    }
});
