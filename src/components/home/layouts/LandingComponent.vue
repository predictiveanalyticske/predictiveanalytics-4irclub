<template>
    <vk-grid class="uk-child-width-1-1 uk-margin-remove">
        <div class="uk-padding-remove">
         <vk-card>
            <vk-grid class="uk-child-width-1-2@xl uk-child-width-1-2@l uk-child-width-1-2@m uk-child-width-1-1@s uk-padding-large@xl uk-padding-large@l uk-padding-large@m uk-padding-small@s">
                <div class="uk-padding-small">
                    <div class="uk-flex uk-flex-center uk-flex-middle uk-text-center">
                        <div>
                            <img src="@/assets/images/analyze.gif" class="uk-visible@s" width="90%">
                        </div>
                    </div>
                </div>
                <div>
                    <h1 class="br-heading">Amazing Package Plans</h1>
                    <h2 class="uk-margin">
                        Starting from a free account and trial period, the club members get access to various resource features based on their package plan
                        allowing individual to business accounts participate in interacting with the content provided by us.
                    </h2>
                    <a class="uk-button uk-button-red uk-button-large" :href="$router.resolve({name:'plans'}).href"> View More </a>
                </div>
            </vk-grid>
         </vk-card>
        </div>
        <div  class="uk-padding-remove uk-margin-remove">
         <vk-card type="secondary" padding="large">
            <vk-grid class="uk-child-width-1-2@xl uk-child-width-1-2@l uk-child-width-1-2@m uk-child-width-1-1@s">
                <div>
                    <h1 class="br-heading">Are you looking for a career rejuvenation ?</h1>
                    <h4>
                        Technology is growing very fast. 
                        So much so we are not able to catch up with emerging issues of the current world.
                        The 4th Industrial Revolution Club, provides scopes such as resources, documentaries and glossary items
                        to help you be up-to-date with the current and developing environment in which disruptive technologies and trends such as the Internet of Things (IoT), robotics, virtual reality (VR) and artificial intelligence (AI) are changing the way we live and work.
                    </h4>
                    <a :href="$router.resolve({name:'signup'}).href" class="uk-button uk-button-red uk-button-large" v-if="!$store.getters.isAuthenticated">Become A Member</a>
                </div>
                <div>
                    <div class="uk-flex uk-flex-center uk-flex-middle uk-text-center">
                        <div>
                            <img src="@/assets/images/bar-chart.gif" class="uk-visible@s">
                        </div>
                    </div>
                </div>
            </vk-grid>
            <div class="uk-width-1-1 uk-text-center uk-margin">
                <vk-button type="link" class="animated bounce"><vk-icon icon="chevron-down" ratio="5"></vk-icon></vk-button>
            </div>
         </vk-card>
        </div>
        <div class="uk-margin-remove uk-padding-large">
            <div class="uk-width-1-1 uk-padding-small">
                <vk-grid class="uk-child-width-1-2@xl uk-child-width-1-2@l uk-margin">
                    <div>
                        <h1 class="br-heading uk-heading-line">Members Access Features</h1>
                    </div>
                    <div class="uk-text-right">
                        <a class="uk-text-bottom " :href="$router.resolve({name:'about'}).href"> View More <vk-icon icon="arrow-right"></vk-icon></a>
                    </div>
                </vk-grid>
                <vueper-slides
                    class="no-shadow"
                    :visible-slides="2"
                    :slide-ratio="1 / 3"
                    :gap="5"
                    :dragging-distance="70">
                    <vueper-slide v-for="(slide, i) in slides" :key="i" :image="slide.image" :title="slide.title" :loading="true"  />
                </vueper-slides>
            </div>
        </div>
    </vk-grid>
</template>

<script>
    // In your Vue.js component.
    import { VueperSlides, VueperSlide } from 'vueperslides'
    import 'vueperslides/dist/vueperslides.css'

    export default {
        name: 'landing',
        components: {
            VueperSlides, VueperSlide 
        },
        data () {
            return {
                plansLink:this.$router.resolve({name:"plans"}).href,
                slides: [
                    { image: "/../assets/images/webinars.png", title: " Monthly Topical Webinairs." },                
                    { image: "/../assets/images/business-coach.jpg", title: " Business Consulting Opportunities." },                
                    { image: "/../assets/images/coach.png", title: "Free monthly group coaching (Career or Business)" },                
                    { image: "/../assets/images/code.png", title: " Free online courses." },                
                ]
            }
        },
        beforeRouteEnter (to,from,next) {
            next( vm => {
                vm.initData(),
                next()
            });
        },
        beforeRouteUpdate () {
            this.$store.commit('loader',true);
        },
        beforeDestroy(){
            this.$store.commit('banner_show',false);
        },
        methods: {
            initData(){
                this.$store.commit('banner_show',true);
                this.$store.commit('banner_title','4th Industrial Revolution Club')
                this.$store.commit('banner_content','Life Long Learning to re-engineer your career and business to be adaptive to the demands of the emerging 4th Industrial Revolution.');
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
                this.$store.commit('loader',false);
                if( this.$store.getters.sidebar ){
                    this.$store.commit('sidebar',false);
                }
            }
        }
    }
</script>
