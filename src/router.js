import Vue from 'vue';
import Router from 'vue-router';

/**
 * Import components from the
 */
import App from './App.vue';

// Home Landing View
import Home from './components/global/HomeComponent.vue';
import HomeIndex from './components/home/layouts/LandingComponent.vue';
import HomeDocumentaries from './components/home/layouts/DocumentariesComponent.vue';
import HomePlans from './components/home/layouts/PlansComponent.vue';

Vue.use(Router);

export default new Router({
   routes: [
        {
            path: '/',
            children:[
            {
                path: '',
                components: {
                    view: HomeIndex,
                }
            },
            {
                path: '/documentaries',
                components: {
                    view: HomeDocumentaries,
                }
            },
            {
                name: "plans",
                path: '/plans',
                components: {
                    view: HomePlans,
                }
            },
            ],
            components: {
                default: App,
                global: Home,
            }
        },
   ]

});
