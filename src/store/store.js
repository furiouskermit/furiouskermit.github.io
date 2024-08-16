import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import alertStore from '@/store/modules/alertStore';

const store = new Vuex.Store({
    modules: {
        alertStore: alertStore,
    }
});

export default store;