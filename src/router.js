import Vue from 'vue';
import Router from 'vue-router';
import Itineraries from "./components/Itineraries.vue";

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/itineraries',
            name: 'Itineraries',
            component: Itineraries,
        }
    ]
})