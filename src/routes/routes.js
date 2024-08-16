import Vue from 'vue';
import VueRouter from 'vue-router';
import common from '@/js/common';


import Home from '@/pages/Home';
import Portfolio from '@/pages/Portfolio';
import Contact from '@/pages/Contact';
import PortfolioRoute from '@/routes/PortfolioRoute';

Vue.use(VueRouter);
Vue.use(common);

export default new VueRouter({
    mode: 'hash',
    routes: [
        { path: '/', component: Home },
        { path: '/portfolio', component: Portfolio },
        { path: '/contact', component: Contact },
        { path: '/portfolio/:name', component: PortfolioRoute },
    ]
})