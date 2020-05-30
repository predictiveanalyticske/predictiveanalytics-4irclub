<template>
    <nav class="uk-navbar uk-navbar-container">

        <div class="uk-navbar-left">

        </div>

        <div class="uk-navbar-right">

            <ul class="uk-navbar-nav">
                <li v-for="(item,index) in this.links" :key="index">
                  <a :href="item.to" v-if="item.auth && $store.state.app.auth.isAuthenticated"> <span :class="'uk-icon-'+item.icon"></span> {{ item.title }}</a>
                  <a :href="item.to" v-else><span :class="'uk-icon-'+item.icon"></span> {{ item.title }}</a>
                  <div class="uk-navbar-dropdown" v-if="item.children != undefined && item.children.length > 0">
                      <ul class="uk-nav uk-navbar-dropdown-nav">
                          <li v-for="(value,key) in item.children" :key="key">
                            <a :href="value.to">{{ value.title }}</a>
                          </li>
                      </ul>
                  </div>
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
                url: this.data.appurl,
                links: [
                     { title: "Home",          icon: "home",    to: this.$router.resolve({name:"home"}).href,  },
                     { title: "Plans",         icon: "star",    to: this.$router.resolve({name:"plans"}).href, },
                ]
            }
        },
        created() {
          switch(this.$store.state.app.auth.isAuthenticated){
            case true:
              var authlinks = [
                { title: "Documentaries", icon: "play", to: this.$router.resolve({name:"documentaries"}).href},
                { title: "Profile",       to: "#", children: [
                   { title: "Settings",   icon: "cogs",     to: this.$router.resolve({name:"profile"}).href },
                   { title: "Logout",     icon: "sign-out", to: this.$router.resolve({name:"logout"}).href }
                ]},
              ];
              authlinks.forEach( (value, ) => {
                this.links.push(value);
              });
            break;
            case false:
              var notauthlinks = [
                { title: "Login",         icon: "sign-in", to: this.$router.resolve({name:"auth"}).href,  },
                { title: "Signup",        icon: "lock",    to: this.$router.resolve({name:"signup"}).href},
              ];
              notauthlinks.forEach( (value, ) => {
                this.links.push(value);
              });
            break;
          }
        }
    }
</script>
