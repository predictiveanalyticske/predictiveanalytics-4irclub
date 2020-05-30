import Vue from 'vue';
import Router from 'vue-router';
import stored from './stores'
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
import HomeSignup from './components/home/layouts/SignupComponent.vue';
import HomeProfile from './components/home/layouts/ProfileComponent.vue';
import HomeVerify from './components/home/layouts/VerifyComponent.vue';
import NotFound from './components/global/NotFoundComponent.vue';

Vue.use(Router);

export default new Router({
   routes: [
            {
            path: '/',
            children:[
                    {
                        name:"home",
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
                        beforeCreate (to,from, next) {
                            if( stored.state.app.auth.isAuthenticated ){
                                next();
                            } else {
                                next({name: "auth"});
                            }
                        }
                    },
                    {
                        name: "profile",
                        path: '/profile',
                        components: {
                            view: HomeProfile,
                        },
                        beforeCreate (to,from, next) {
                            if( stored.state.app.auth.isAuthenticated ){
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
                        name: "signup",
                        path: '/signup',
                        components: {
                            view: HomeSignup,
                        },
                        beforeCreate (to,from, next) {
                            if( stored.state.app.auth.isAuthenticated ){
                              next({name: "home"});
                            } else {
                              next();
                            }
                        }
                    },
                    {
                        name: "verify",
                        path: '/verify/email/:token',
                        components: {
                            view: HomeVerify,
                        }
                    },
                    {
                        name: "auth",
                        path: '/login',
                        components: {
                            view: HomeAuth,
                        },
                        beforeEnter (to,from, next) {
                            if( stored.state.app.auth.isAuthenticated ){
                              next({name: "home"});
                            } else {
                              next();
                            }
                        }
                    },
                    {
                        name: "notfound",
                        path: '/404',
                        components: {
                            view: NotFound,
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
