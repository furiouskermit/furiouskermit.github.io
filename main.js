import Vue from 'vue';
import Router from '@/routes/Router';
import routes from '@/routes/routes';
import store from '@/store/store';
import 'remixicon/fonts/remixicon.css';
import '@/css/root.css';
import '@/css/common.css';

// Vue instance
new Vue({
    routes,
    render: h => h(Router),
    store,
}).$mount('#root');