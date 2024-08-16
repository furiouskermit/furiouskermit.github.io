import Vue from 'vue';
import Router from '@/routes/Router';
import routes from '@/routes/routes';
import store from '@/store/store';
import 'remixicon/fonts/remixicon.css';
import '@/assets/css/root.css';
import '@/assets/css/common.css';

// Vue instance
new Vue({
    routes,
    render: h => h(Router),
    store,
}).$mount('#root');