<template>
    <nav class="uk-navbar uk-navbar-container">

        <div class="uk-navbar-center">

            <ul class="uk-navbar-nav">
                <li v-for="(item,index) in this.links" :key="index">
                  <a :href="item.to" v-if="item.auth && $store.state.app.auth.isAuthenticated"> <span :class="'uk-icon-'+item.icon"></span> {{ item.title }}</a>
                  <a :href="item.to" v-else><span :class="'uk-icon-'+item.icon"></span> {{ item.title }}</a>
                </li>
                <li  v-if="$store.state.app.auth.isAuthenticated" >
                  <a @click.prevent="logout" href="#">Logout</a>
                </li>
            </ul>

        </div>

    </nav>

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
            }
        },
        watch: {
          authenticated () {
            switch(this.authenticated){
              case true:
                this.links = [
                  { title: "Home",          icon: "home",     to: this.$router.resolve({name:"home"}).href,          },
                  { title: "About",         icon: "users",   to: this.$router.resolve({name:"about"}).href,  },                  
                  { title: "Documentaries", icon: "play",     to: this.$router.resolve({name:"documentaries"}).href  },
                  { title: "Resources",     icon: "bookmark", to: this.$router.resolve({name:"resources"}).href      },
                  { title: "Profile",       icon: "user",     to: this.$router.resolve({name:"profile"}).href         },
                ];
              break;
              case false:
                this.links = [
                  { title: "Home",          icon: "home",    to: this.$router.resolve({name:"home"}).href,  },
                  { title: "About",         icon: "users",   to: this.$router.resolve({name:"about"}).href,  },
                  { title: "Plans",         icon: "star",    to: this.$router.resolve({name:"plans"}).href, },
                  { title: "Login",         icon: "sign-in", to: this.$router.resolve({name:"auth"}).href,  },
                  { title: "Signup",        icon: "lock",    to: this.$router.resolve({name:"signup"}).href},
                ];
              break;
            }
          }
        },
        beforeMount () {
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
        methods: {
          logout (){
              this.bralcoaxios({ url: this.$store.state.app.env.backend_url + '/api/v1/auth/logout', request:'POST' }).then( () => {
                this.$store.state.app.auth.isAuthenticated = false;
                this.authenticated = false;
                window.localStorage.clear();
                this.$router.push({name:"auth"});
                this.$store.state.app.loader = false;
              });
          }
        }
    }
</script>
