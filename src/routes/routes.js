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
    mode: 'history',
    routes: [
        { path: '/HyewonLee/', component: Home },
        { path: '/HyewonLee/portfolio', component: Portfolio },
        { path: '/HyewonLee/contact', component: Contact },
        { path: '/HyewonLee/portfolio/:name', component: PortfolioRoute },
    ]
})