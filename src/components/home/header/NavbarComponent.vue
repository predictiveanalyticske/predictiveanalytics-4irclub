<template>
<div class="uk-position-relative br-parallax">
    <transition name="slide-fade">
      <vk-card type="blank" padding="small" class="br-footer uk-text-center uk-light" v-if="alert">
        <h5><vk-icon icon="info"></vk-icon> Kindly select a package plan to get full access to the member's experience. Click <a class="uk-text-danger" :href="$router.resolve({name:'plans'}).href">here</a> to purchase a plan</h5>
      </vk-card>
    </transition>
    <vk-navbar transparent class="uk-hidden@xl uk-hidden@l uk-hidden@m">
        <vk-navbar-toggle title="Menu" @click="$store.commit('sidebar',true)"></vk-navbar-toggle>
        <vk-navbar-logo slot="center">
            <img src="@/assets/images/logo-full-white.png" width="50%"/>
        </vk-navbar-logo>
    </vk-navbar>
    <vk-navbar transparent class="br-navbar uk-visible@s uk-visible@m">
        <vk-navbar-logo slot="left">
            <img src="@/assets/images/logo-full-white.png" width="70%"/>
        </vk-navbar-logo>
        <vk-navbar-nav slot="right">
            <vk-nav-item 
                v-for="(value,index) in this.links" 
                :key="index" 
                :title="value.title"
                :href="value.to"
            ></vk-nav-item>
            <vk-nav-item href="#" title="Logout" @click.prevent="logout" v-if="$store.getters.isAuthenticated"></vk-nav-item>
        </vk-navbar-nav>
    </vk-navbar>
    <div class="uk-width-1-1 uk-inline" id="banner">
      <img src="@/assets/images/banner-full.png" v-if="banner"/>
      <img src="@/assets/images/banner-small.png" v-else/>
      <div class="uk-position-cover uk-overlay uk-overlay-default uk-flex uk-text-center uk-flex-center uk-light uk-flex-middle uk-padding-large">
        <div class="uk-width-2-3">
           <h1 class="uk-text-bolder br-banner-title uk-visible@s uk-visible@m">{{ title }}</h1>
           <h4 class="uk-hidden@xl uk-hidden@l uk-hidden@m uk-margin-remove">{{ title }}</h4>
           <h2 class="uk-heading-large br-banner-sub_title uk-visible@s uk-visible@m">{{ message }}</h2>
           <h5 class="uk-hidden@xl uk-hidden@l uk-hidden@m uk-margin-remove">{{ message }}</h5>
           <a v-if="banner" :href="$router.resolve({name:'about'}).href" class="uk-button uk-visible@s uk-visible@m uk-button-default uk-button-large">Read More</a>
           <a v-if="banner" :href="$router.resolve({name:'about'}).href" class="uk-margin uk-button uk-hidden@xl uk-hidden@l uk-hidden@m uk-button-default uk-button-small">Read More</a>
       </div>
      </div>
    </div>
</div>
</template>

<script>
    export default {
        name: 'homenavbar',
        props: ['data'],
        data () {
            return {
                count: {
                  type: Number,
                  value: 4
                },
                links: []
            }
        },
        computed: {
            alert:{
              get(){
                return false;
              },
              set(val){
                return val;
              }
            },
            authenticated:{
              get(){
                return this.$store.getters.isAuthenticated;
              },
              set(val){
                return val;
              }
            },
            banner:{
              get(){
                return this.$store.getters.banner_show;
              },
              set(val){
                return val;
              }
            },
            subscribed:{
              get(){
                return this.$store.getters.isSubscribed;
              },
              set(val){
                return val;
              }
            },
            title:{
              get(){
                return this.$store.getters.banner_title;
              },
              set(val){
                return val;
              }
            },
            message:{
              get(){
                return this.$store.getters.banner_message;
              },
              set(val){
                return val;
              }
            },
        },
        watch: {
          authenticated () {
           this.calculateLinks();
           switch(this.subscribed){
              case false:
                this.countDownTimer();
              break;
            }
          },
        },
        beforeMount(){
          this.calculateLinks();
        },
        methods: {
          logout (){
              this.bralcoaxios({ url: this.$store.state.app.env.backend_url + '/api/v1/auth/logout', request:'POST' }).then( () => {
                this.$store.commit('isAuthenticated',false);
                this.authenticated = false;
                this.alert = false;
                window.localStorage.clear();
                this.$router.push({name:"auth"});
                this.$store.commit('loader',false);
              });
          },
          calculateLinks(){
            switch(this.authenticated){
              case true:
                switch(this.subscribed){
                  case true:
                    this.links = [
                      { title: "Home",          icon: "home",    to: this.$router.resolve({name:"home"}).href,  },
                      { title: "About",         icon: "users",   to: this.$router.resolve({name:"about"}).href,  },                
                      { title: "Documentaries", icon: "play", to: this.$router.resolve({name:"documentaries"}).href},
                      { title: "Resources",     icon: "bookmark", to: this.$router.resolve({name:"resources"}).href      },
                      { title: "Glossary",      icon: "bookmark", to: this.$router.resolve({name:"glossary"}).href   },
                      { title: "Profile",       icon: "user", to: this.$router.resolve({name:"profile"}).href},
                    ]
                  break;
                  case false:
                      this.links = [
                        { title: "Home",          icon: "home",    to: this.$router.resolve({name:"home"}).href,  },
                        { title: "About",         icon: "users",   to: this.$router.resolve({name:"about"}).href,  },                
                        { title: "Plans",         icon: "star",    to: this.$router.resolve({name:"plans"}).href, },
                        { title: "Profile",       icon: "user", to: this.$router.resolve({name:"profile"}).href},
                      ]
                  break;
                }
                break;
              case false:
                this.links = [
                  { title: "Home",          icon: "home",    to: this.$router.resolve({name:"home"}).href,  },
                  { title: "About",         icon: "users",   to: this.$router.resolve({name:"about"}).href,  },
                  { title: "Plans",         icon: "star",    to: this.$router.resolve({name:"plans"}).href, },
                  { title: "Login",         icon: "sign-in", to: this.$router.resolve({name:"auth"}).href,  },
                  { title: "Signup",        icon: "lock",    to: this.$router.resolve({name:"signup"}).href},
                ]
                break;
            }
          },
          countDownTimer() {
            let self = this;
            if(this.count.value > 0) {
                setTimeout(function() {
                    self.count.value -= 1;
                    self.countDownTimer()
                }, 1000)
            } else {
              this.alert = true;
              document.body.scrollTop = 0;
              document.documentElement.scrollTop = 0;
            }
          },
          scrollToAbout (){
            let about = document.getElementById('about');
            about.scrollIntoView();
          }
        },
        mounted () {
          // Scroll Sticky
          // window.onscroll = function () {
          //   let navbar = document.getElementById("navbar");
          //   let banner = document.getElementById("banner");
          //   let content = document.getElementById("content");
          //   let sticky = banner.offsetHeight;
          //   if (window.pageYOffset >= sticky) {
          //     navbar.classList.add("br-sticky");
          //     content.classList.add("uk-padding-top")
          //   } else {
          //     navbar.classList.remove("br-sticky");
          //     content.classList.remove("uk-padding-top");
          //   }
          // };
        }
    }
</script>

