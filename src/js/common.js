import AOS from 'aos';
import 'aos/dist/aos.css';

export default {
    install(Vue) {
        Vue.prototype.$checkMaxLength = function(target, maxlength) {
            let thisLength = target.value.length;
            if(thisLength > maxlength) {
                target.value = target.value.slice(0, target.value.length - 1);
            }
        },
        Vue.prototype.$getContentfulClient = function(){
            const contentful = require('contentful')

            const client = contentful.createClient({
                space: process.env.VUE_APP_CONTENTFUL_SPACE_ID,
                environment: 'master', // defaults to 'master' if not set
                accessToken: process.env.VUE_APP_CONTENTFUL_CONTENT_DELIVERY_ID
            })

            return client;
        },
        Vue.prototype.$initAOS = function(){
            AOS.init({
                duration: 1500,
            })
        }
    }
}