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
import HomePlan from './components/home/layouts/PlanComponent.vue';
import HomeAuth from './components/home/layouts/AuthComponent.vue';

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
                        name: "documentaries",
                        path: '/documentaries',
                        components: {
                            view: HomeDocumentaries,
                        },
                        beforeEnter (to,from, next) {
                            if( this.$store.state.app.auth.isAuthenticated ){
                                next();
                            } else {
                                next({name: "auth"});
                            }
                        }
                    },
                    {
                        name: "plans",
                        path: '/plans',
                        children: [
                            {
                                name: "plan",
                                path: ':item',
                                component: HomePlan
                            },
                        ],
                        components: {
                            view: HomePlans,
                        }
                    },
                    {
                        name: "auth",
                        path: '/login',
                        components: {
                            view: HomeAuth,
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
