import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed, observer } from '@ember/object';
import { not, reads} from '@ember/object/computed';

export default Controller.extend({
    cookies: service(),
    flashMessages: service(),

    userSignedIn: false,

    // flashMessage: '',
    // flashType: '',
    
    getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    },

    init(){
        let cookieService = this.get('cookies');

        if (cookieService.exists('gr_api_key')  && cookieService.read('gr_api_key').length != 0){
            this.set('userSignedIn', true);
        }else{
            this.set('userSignedIn', false);
        }

        let flashService = this.get('flashMessages');

        let flashType = this.getParameterByName('flash_type');
        let flashMessage = this.getParameterByName('flash_message');

        // this.set('flashMessage', flashMessage);
        // this.set('flashType', flashType);

        if (flashMessage && flashType){
            switch(flashType){
                case 'danger':
                case 'error':
                    flashService.danger(flashMessage);
                    break;
    
                case 'warning':
                    flashService.warning(flashMessage);
                    break;
    
                case 'info':
                    flashService.info(flashMessage);
                    break;
    
                case 'success':
                default:
                    flashService.success(flashMessage);
                    break;
    
            }
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
