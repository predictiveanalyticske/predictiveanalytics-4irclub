<template>
    <vk-navbar class="uk-width-1-1">
    <vk-navbar-logo slot="left" :class="'uk-light'">
        <img v-if="data.logo != null">
        <vk-icon v-else icon="home" ratio="1.3"></vk-icon>
    </vk-navbar-logo>
    <vk-navbar-nav slot="right">
        <vk-nav-item  v-for="(item,index) in this.links" :key="index" :title="item.title" :icon="item.icon" :href="item.to"></vk-nav-item>
    </vk-navbar-nav>
    </vk-navbar>
</template>

<script>
    export default {
        name: 'homenavbar',
        props: ['data'],
        data () {
            return {
                url: this.data.appurl,
                links: [
                     { title: "Home",  icon: "home", to: this.$router.resolve({name:"home"}).href },
                     { title: "Plans", icon: "star", to: this.$router.resolve({name:"plans"}).href },
                     { title: "Login", icon: "lock", to: this.$router.resolve({name:"auth"}).href },
                ]
            }
        },
        created(){
            if( this.$store.state.app.auth.isAuthenticated ){
                let authlinks = [
                        { title: "Documentaries", icon: "play", to: this.$router.resolve({name:"documentaries"}).href }
                ];
                authlinks.forEach( function (value,) {
                    this.links.push(value);
                });
            }
        }
    }
</script>

<style scoped>
    .uk-navbar,.uk-navbar-dropdown {
        background-color:#bf040f !important;
    }
    .uk-navbar a {
        color: #ffffff !important;
    }
</style>