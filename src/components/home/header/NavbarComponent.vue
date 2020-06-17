<template>
<div class="uk-position-relative br-parallax">
    <div class="uk-width-1-1 uk-inline" id="banner">
      <img src="@/assets/images/banner-full.png" v-if="banner"/>
      <img src="@/assets/images/banner-small.png" v-else/>
      <div class="uk-position-cover uk-overlay uk-overlay-default uk-flex uk-flex-center uk-text-center uk-light uk-flex-middle">
        <div class="uk-width-1-2">
           <img src="@/assets/images/logo-full-white.png" v-if="banner"/>
           <h1 class="uk-text-bolder uk-text-italic ">{{ title }}</h1>
           <blockquote>
           <h2 class="uk-heading-large	uk-text-break">{{ message }}</h2>
           </blockquote>
           <a @click.prevent="scrollToAbout" v-if="banner" href="#" size="large"><vk-icon icon="chevron-down" ratio="6"></vk-icon></a>
       </div>
      </div>
    </div>
    <div id="navbar" class="uk-height-1-2">
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
          </vk-navbar-nav>
      </vk-navbar>
    </div>
</div>
</template>

<script>
    export default {
        name: 'homenavbar',
        props: ['data'],
        data () {
            return {
                links: []
            }
        },
        computed: {
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
          }
        },
        beforeMount(){
          this.calculateLinks();
        },
        methods: {
          logout (){
              this.bralcoaxios({ url: this.$store.state.app.env.backend_url + '/api/v1/auth/logout', request:'POST' }).then( () => {
                this.$store.state.app.auth.isAuthenticated = false;
                this.authenticated = false;
                window.localStorage.clear();
                this.$router.push({name:"auth"});
                this.$store.state.app.loader = false;
              });
          },
          calculateLinks(){
            switch(this.authenticated){
              case true:
                this.links = [
                  { title: "Home",          icon: "home",    to: this.$router.resolve({name:"home"}).href,  },
                  { title: "About",         icon: "users",   to: this.$router.resolve({name:"about"}).href,  },                
                  { title: "Documentaries", icon: "play", to: this.$router.resolve({name:"documentaries"}).href},
                  { title: "Resources",     icon: "bookmark", to: this.$router.resolve({name:"resources"}).href      },
                  { title: "Profile",       icon: "user", to: this.$router.resolve({name:"profile"}).href},
                ]
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
          scrollToAbout (){
            let about = document.getElementById('about');
            about.scrollIntoView();
          }
        },
        mounted () {
          // Scroll Sticky
          window.onscroll = function () {
            let navbar = document.getElementById("navbar");
            let banner = document.getElementById("banner");
            let content = document.getElementById("content");
            let sticky = banner.offsetHeight;
            if (window.pageYOffset >= sticky) {
              navbar.classList.add("br-sticky");
              content.classList.add("uk-padding-top")
            } else {
              navbar.classList.remove("br-sticky");
              content.classList.remove("uk-padding-top");
            }
          };
        }
    }
</script>

