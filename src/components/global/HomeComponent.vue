<template>
    <div class="uk-child-width-1-1" uk-grid>
        <alerts />
        <navbar :data="navbar"></navbar>
        <loader :isActive="isLoading" />
        <router-view name="view" :pageData="viewRoute"></router-view>
        <footernav :data="footer"></footernav>
    </div>
</template>

<script>
    import alerts from '@/components/global/AlertsComponent'
    import loader from '@/components/global/LoaderComponent'
    import navbar from '@/components/home/header/NavbarComponent'
    import footernav from '@/components/home/header/FooterComponent'

    export default {
        components: {
            alerts,
            footernav,
            loader,
            navbar
        },
        data () {
            return {
                company: {},
            }
        },
        computed: {
            navbar () {
                return {
                    company: this.company.name,
                    logo: this.company.logo,
                }
            },
            footer () {
                return {
                    company: this.company.name
                }
            },
            viewRoute () {
                return {
                      company: this.company.index
                }
            },
            isLoading:{
              get(){
                return this.$store.getters.loader;
              },
              set(val){
                return val;
              }
            },
            isSubscribe () {
                return false;
            }
        }
        
    }
</script>

<style>
    .div-table{
        overflow: auto;
    }
</style>