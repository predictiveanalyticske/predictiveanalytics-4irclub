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
            <img src="@/assets/images/logo-full-white.png" width="90%"/>
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
                :icon="value.icon"
                :class="$route.fullPath == value.route.resolved.fullPath ? 'br-active' : 'br-light'"
            ></vk-nav-item>
            <vk-nav-item href="#" title="Logout" icon="sign-out" class="br-light" @click.prevent="logout" v-if="$store.getters.isAuthenticated"></vk-nav-item>
        </vk-navbar-nav>
    </vk-navbar>
    <div class="uk-width-1-1 uk-inline uk-visible@s uk-visible@m uk-visible@l" id="banner">
      <img src="@/assets/images/banner-full.png" v-if="banner"/>
      <img src="@/assets/images/banner-small.png" v-if="!banner"/>
      <div class="uk-position-cover uk-overlay uk-overlay-default uk-flex uk-flex-center uk-light uk-flex-middle uk-padding-large">
        <div class="uk-width-2-3 uk-visible@s uk-visible@m uk-text-center">
           <h1 class="uk-text-bolder br-banner-title uk-visible@s uk-visible@m">{{ title }}</h1>
           <h2 class="uk-heading-large br-banner-sub_title uk-visible@s uk-visible@m">{{ message }}</h2>
           <a v-if="banner" :href="$router.resolve({name:'about'}).href" class="uk-button uk-visible@s uk-visible@m uk-button-default uk-button-large">Read More</a>
       </div>
      </div>
    </div>
    <div class="uk-width-1-1 uk-inline uk-hidden@xl uk-hidden@l uk-hidden@m" id="banner">
      <img src="@/assets/images/banner-full-small.png" class="uk-hidden@xl uk-hidden@l uk-hidden@m" v-if="banner"/>
      <img src="@/assets/images/banner-small-mini.png" v-else/>
      <div class="uk-position-cover uk-overlay uk-overlay-default uk-flex uk-flex-center uk-light uk-flex-middle uk-padding-large">
        <div class="uk-width-1-1">
           <h1 class="br-heading">{{ title }}</h1>
           <h3 class="uk-margin-remove">{{ message }}</h3>
           <a v-if="banner" :href="$router.resolve({name:'about'}).href" class="uk-margin uk-button uk-button-default uk-button-large">Read More</a>
       </div>
      </div>
    </div>
    <vk-modal-full :show.sync="show" class="br-modal-fixed uk-hidden@xl uk-hidden@l">
      <vk-modal-full-close large @click="$store.commit('sidebar',false)"></vk-modal-full-close>
        <div>
        <vk-nav class="uk-margin-vertical uk-padding-large">
            <vk-nav-item 
                v-for="(value,index) in this.links" 
                :key="index" 
                :title="value.title"
                :href="value.to"
                :icon="value.icon"
                :class="$route.fullPath == value.route.resolved.fullPath ? 'uk-active' : false"
            ></vk-nav-item>
            <vk-nav-item href="#" title="Logout" @click.prevent="logout" v-if="$store.getters.isAuthenticated"></vk-nav-item>
        </vk-nav>
        </div>
    </vk-modal-full>
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
                links: [],
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
            paid:{
              get(){
                return JSON.parse(this.$store.getters.isPaid);
              },
              set(val){
                return val;
              }
            },
            payment:{
              get(){
                return JSON.parse(this.$store.getters.pendingPayment);
              },
              set(val){
                return val;
              }
            },
            show:{
              get(){
                return this.$store.getters.sidebar;
              },
              set(val){
                return val;
              }
            },
            subscribed:{
              get(){
                return JSON.parse(this.$store.getters.isSubscribed);
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
                    switch(this.paid){
                      case true:
                      this.links = [
                        { title: "Home",          icon: "home",    to: this.$router.resolve({name:"home"}).href,       route:this.$router.resolve({name:"home"})   },
                        { title: "About",         icon: "users",   to: this.$router.resolve({name:"about"}).href,      route:this.$router.resolve({name:"about"})   },                
                        { title: "Documentaries", icon: "play", to: this.$router.resolve({name:"documentaries"}).href, route:this.$router.resolve({name:"documentaries"})   },
                        { title: "Resources",     icon: "bookmark", to: this.$router.resolve({name:"resources"}).href, route:this.$router.resolve({name:"resources"})   },
                        { title: "Glossary",      icon: "bookmark", to: this.$router.resolve({name:"glossary"}).href,  route:this.$router.resolve({name:"glossary"})   },
                        { title: "Profile",       icon: "user", to: this.$router.resolve({name:"profile"}).href,       route:this.$router.resolve({name:"profile"})   },
                      ]
                      break;
                      case false: 
                        this.links = [
                          { title: "Home",          icon: "home",    to: this.$router.resolve({name:"home"}).href,       route:this.$router.resolve({name:"home"})   },
                          { title: "About",         icon: "users",   to: this.$router.resolve({name:"about"}).href,      route:this.$router.resolve({name:"about"})   },                
                          { title: "Payment",       icon: "credit-card",   to: this.$router.resolve({name:"checkout",params:{ payment: this.$store.getters.pendingPayment }}).href,      route:this.$router.resolve({name:"checkout",params:{ payment: this.$store.getters.pendingPayment }})   },                
                          { title: "Profile",       icon: "user", to: this.$router.resolve({name:"profile"}).href,       route:this.$router.resolve({name:"profile"})   },
                        ]
                      break;
                    }
                  break;
                  case false:
                      this.links = [
                        { title: "Home",          icon: "home",    to: this.$router.resolve({name:"home"}).href,       route:this.$router.resolve({name:"home"})   },
                        { title: "About",         icon: "users",   to: this.$router.resolve({name:"about"}).href,      route:this.$router.resolve({name:"about"})   },                
                        // { title: "Plans",         icon: "star",    to: this.$router.resolve({name:"plans"}).href,      route:this.$router.resolve({name:"plans"})  },
                        { title: "Profile",       icon: "user", to: this.$router.resolve({name:"profile"}).href,       route:this.$router.resolve({name:"profile"})   },
                      ]
                  break;
                }
                break;
              case false:
                this.links = [
                  { title: "Home",          icon: "home",    to: this.$router.resolve({name:"home"}).href,       route:this.$router.resolve({name:"home"})   },
                  { title: "About",         icon: "users",   to: this.$router.resolve({name:"about"}).href,      route:this.$router.resolve({name:"about"})   },                
                  // { title: "Plans",         icon: "star",    to: this.$router.resolve({name:"plans"}).href,      route:this.$router.resolve({name:"plans"})  },
                  { title: "Login",         icon: "sign-in", to: this.$router.resolve({name:"auth"}).href,       route:this.$router.resolve({name:"auth"})    },
                  { title: "Signup",        icon: "lock",    to: this.$router.resolve({name:"signup"}).href,     route:this.$router.resolve({name:"signup"}) },
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

<style lang="scss">
  .uk-modal-full{

      .uk-modal-dialog{
        top:0 !important;
        bottom: 0 !important;
        position: fixed !important;
        align-items: center !important;
        justify-content: center;
        display: flex;

        .uk-nav > li > a{
          font-size: 20pt;
          font-family: 'Dosis', sans-serif !important;
        }
      }

  }
</style>