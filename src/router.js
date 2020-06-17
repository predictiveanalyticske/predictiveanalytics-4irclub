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
import HomeAbout from './components/home/layouts/AboutusComponent.vue';
import HomeDocumentaries from './components/home/layouts/DocumentariesComponent.vue';
import HomePlans from './components/home/layouts/PlansComponent.vue';
import HomePlan from './components/home/layouts/PlanComponent.vue';
import HomeAuth from './components/home/layouts/AuthComponent.vue';
import HomeSignup from './components/home/layouts/SignupComponent.vue';
import HomeProfile from './components/home/layouts/ProfileComponent.vue';
import HomeVerify from './components/home/layouts/VerifyComponent.vue';
import HomeCheckout from './components/home/layouts/CheckOutComponent.vue';
import HomeResources from './components/home/layouts/ResourcesComponent.vue';
import NotFound from './components/global/NotFoundComponent.vue';

Vue.use(Router);

const router = new Router({
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
                        name:"about",
                        path: '/aboutus',
                        components: {
                            view: HomeAbout,
                        }
                    },
                    {
                        name: "documentaries",
                        path: '/documentaries',
                        components: {
                            view: HomeDocumentaries,
                        },
                        beforeEnter (to,from, next) {
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
                        beforeEnter (to, from, next) {
                            if( stored.getters.isAuthenticated ){
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
                        name: "resources",
                        path: '/resources',
                        components: {
                            view: HomeResources,
                        },
                        beforeEnter (to, from, next) {
                            if( stored.getters.isAuthenticated ){
                                next();
                            } else {
                                next({name: "auth"});
                            }
                        }
                    },
                    {
                        name: "checkout",
                        path: '/payment/:payment',
                        components: {
                            view: HomeCheckout,
                        },
                        beforeEnter (to, from, next) {
                            if( stored.getters.isAuthenticated ){
                                next();
                            } else {
                                next({name: "auth"});
                            }
                        }
                    },
                    {
                        name: "signup",
                        path: '/signup',
                        components: {
                            view: HomeSignup,
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
                        name: "verify",
                        path: '/email/verify/:token',
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

router.beforeEach((to,from, ...next) => {
    stored.commit('loader',true);
    // console.log(next);
    next[0]();
});

export default router;