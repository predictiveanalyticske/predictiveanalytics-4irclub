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
import HomePlanItem from './components/home/layouts/show/PlanItemComponent.vue';
import HomeAuth from './components/home/layouts/AuthComponent.vue';
import HomeAuthChallenge from './components/home/layouts/AuthChallengeComponent.vue';
import HomeSignup from './components/home/layouts/SignupComponent.vue';
import HomeProfile from './components/home/layouts/ProfileComponent.vue';
import HomeVerify from './components/home/layouts/VerifyComponent.vue';
import HomeCheckout from './components/home/layouts/CheckOutComponent.vue';
import HomeResources from './components/home/layouts/ResourcesComponent.vue';
import HomeGlossary from './components/home/layouts/GlossaryComponent.vue';
import NotFound from './components/global/NotFoundComponent.vue';

Vue.use(Router);

const router = new Router({
   mode: "history",
   routes: [
            {
            path: '/',
            children:[
                    {
                        name:"home",
                        path: '',
                        components: {
                            view: HomeIndex,
                        },
                        meta: {
                            title: 'Home - 4IRCLUB',
                            metaTags: [
                              {
                                name: 'description',
                                content: 'Life Long Learning to re-engineer your career, institution and business to be adaptive to the demands of the emerging 4th Industrial Revolution.'
                              },
                              {
                                property: 'og:description',
                                content: "Reskilling – the process of learning new skills so you can do a different job, or of training people to do a different job. ... While upskilling points out the same, it focuses more on improving worker's skills so they can work within the same job."
                              }
                            ]
                          }
                    },
                    {
                        name:"about",
                        path: '/aboutus',
                        components: {
                            view: HomeAbout,
                        },
                        meta: {
                            title: 'About Us - 4IRCLUB',
                            metaTags: [
                              {
                                name: 'description',
                                content: 'Life Long Learning to re-engineer your career, institution and business to be adaptive to the demands of the emerging 4th Industrial Revolution.'
                              },
                              {
                                property: 'og:description',
                                content: "Reskilling – the process of learning new skills so you can do a different job, or of training people to do a different job. ... While upskilling points out the same, it focuses more on improving worker's skills so they can work within the same job."
                              }
                            ]
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
                        },
                        meta: {
                        title: 'Documentaries - 4IRCLUB',
                        metaTags: [
                            {
                            name: 'description',
                            content: 'Life Long Learning to re-engineer your career, institution and business to be adaptive to the demands of the emerging 4th Industrial Revolution.'
                            },
                            {
                            property: 'og:description',
                            content: "Reskilling – the process of learning new skills so you can do a different job, or of training people to do a different job. ... While upskilling points out the same, it focuses more on improving worker's skills so they can work within the same job."
                            }
                        ]
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
                        },
                        meta: {
                            title: 'Profile - 4IRCLUB',
                            metaTags: [
                              {
                                name: 'description',
                                content: 'Life Long Learning to re-engineer your career, institution and business to be adaptive to the demands of the emerging 4th Industrial Revolution.'
                              },
                              {
                                property: 'og:description',
                                content: "Reskilling – the process of learning new skills so you can do a different job, or of training people to do a different job. ... While upskilling points out the same, it focuses more on improving worker's skills so they can work within the same job."
                              }
                            ]
                          }
                    },
                    {
                        name: "plans",
                        path: '/plans',
                        components: {
                            view: HomePlans,
                        },
                        meta: {
                            title: 'Plans - 4IRCLUB',
                            metaTags: [
                              {
                                name: 'description',
                                content: 'Life Long Learning to re-engineer your career, institution and business to be adaptive to the demands of the emerging 4th Industrial Revolution.'
                              },
                              {
                                property: 'og:description',
                                content: "Reskilling – the process of learning new skills so you can do a different job, or of training people to do a different job. ... While upskilling points out the same, it focuses more on improving worker's skills so they can work within the same job."
                              }
                            ]
                          }
                    },
                    {
                        path: '/plan',
                        children: [
                            {
                                name: "plan",
                                path: ':item',
                                component: HomePlanItem
                            },
                        ],
                        components: {
                            view: HomePlan
                        },
                        beforeEnter (to,from, next) {
                            if( to.params['item'] != undefined ){
                                next();
                            } else {
                                next({name: "notfound"});
                            }
                        },
                        meta: {
                            title: 'Plan - 4IRCLUB',
                            metaTags: [
                              {
                                name: 'description',
                                content: 'Life Long Learning to re-engineer your career, institution and business to be adaptive to the demands of the emerging 4th Industrial Revolution.'
                              },
                              {
                                property: 'og:description',
                                content: "Reskilling – the process of learning new skills so you can do a different job, or of training people to do a different job. ... While upskilling points out the same, it focuses more on improving worker's skills so they can work within the same job."
                              }
                            ]
                          }
                    },
                    {
                        name: "resources",
                        path: '/resources',
                        components: {
                            view: HomeResources,
                        },
                        meta: {
                            title: 'Resources - 4IRCLUB',
                            metaTags: [
                              {
                                name: 'description',
                                content: 'Life Long Learning to re-engineer your career, institution and business to be adaptive to the demands of the emerging 4th Industrial Revolution.'
                              },
                              {
                                property: 'og:description',
                                content: "Reskilling – the process of learning new skills so you can do a different job, or of training people to do a different job. ... While upskilling points out the same, it focuses more on improving worker's skills so they can work within the same job."
                              }
                            ]
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
                        name: "glossary",
                        path: '/glossary',
                        components: {
                            view: HomeGlossary,
                        },
                        meta: {
                            title: 'Glossary - 4IRCLUB',
                            metaTags: [
                              {
                                name: 'description',
                                content: 'Life Long Learning to re-engineer your career, institution and business to be adaptive to the demands of the emerging 4th Industrial Revolution.'
                              },
                              {
                                property: 'og:description',
                                content: "Reskilling – the process of learning new skills so you can do a different job, or of training people to do a different job. ... While upskilling points out the same, it focuses more on improving worker's skills so they can work within the same job."
                              }
                            ]
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
                        meta: {
                            title: 'Checkout - 4IRCLUB',
                            metaTags: [
                              {
                                name: 'description',
                                content: 'Life Long Learning to re-engineer your career, institution and business to be adaptive to the demands of the emerging 4th Industrial Revolution.'
                              },
                              {
                                property: 'og:description',
                                content: "Reskilling – the process of learning new skills so you can do a different job, or of training people to do a different job. ... While upskilling points out the same, it focuses more on improving worker's skills so they can work within the same job."
                              }
                            ]
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
                        meta: {
                            title: 'SignUp - 4IRCLUB',
                            metaTags: [
                                {
                                    name: 'description',
                                    content: "Create a free account to access the features in the platform"
                                },
                                {
                                    property: 'og:description',
                                    content: "Register requires personal details sent to the email address provided by the user."
                                }
                            ]
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
                        },
                        meta: {
                            title: 'Email Verify - 4IRCLUB',
                            metaTags: [
                              {
                                name: 'description',
                                content: "Verify if the email is authenticated & accepted"
                              },
                              {
                                property: 'og:description',
                                content: "Activates the account made by the user. This allows users to be able to login to the platform and interact with the features."
                              }
                            ]
                          }
                    },
                    {
                        path: '/login',
                        children: [
                            {
                              name: "auth",
                              path: "",
                              components:{
                                view: HomeAuth,
                              }
                            },
                            {
                              name: "authchallenge",
                              path: "/:user",
                              components: HomeAuthChallenge
                            }
                        ],

                        meta: {
                            title: 'SignIn - 4IRCLUB',
                            metaTags: [
                              {
                                name: 'description',
                                content: "Create a free account to access the features in the platform"
                              },
                              {
                                property: 'og:description',
                                content: "Register requires personal details sent to the email address provided by the user."
                              }
                            ]
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
                        },
                        meta: {
                            title: 'Page Not Found - 4IRCLUB',
                            metaTags: [
                              {
                                name: 'description',
                                content: 'Resource could not be located.'
                              },
                              {
                                property: 'og:description',
                                content: "Fetching resource but nothing was found."
                              }
                            ]
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
    // This goes through the matched routes from last to first, finding the closest route with a title.
    // eg. if we have /some/deep/nested/route and /some, /deep, and /nested have titles, nested's will be chosen.
    const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);

    // Find the nearest route element with meta tags.
    const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);
    // const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

    // If a route with a title was found, set the document (page) title to that value.
    if(nearestWithTitle) document.title = nearestWithTitle.meta.title;

    // Remove any stale meta tags from the document using the key attribute we set below.
    Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));

    // Skip rendering meta tags if there are none.
    if(!nearestWithMeta) return next();

    // Turn the meta tag definitions into actual elements in the head.
    nearestWithMeta.meta.metaTags.map(tagDef => {
        const tag = document.createElement('meta');

        Object.keys(tagDef).forEach(key => {
        tag.setAttribute(key, tagDef[key]);
        });

        // We use this to track which meta tags we create, so we don't interfere with other ones.
        tag.setAttribute('data-vue-router-controlled', '');
        return tag;
    })
    // Add the meta tags to the document head.
    .forEach(tag => document.head.appendChild(tag));
    stored.commit('loader',true);
    // console.log(next);
    next[0]();
});

export default router;
