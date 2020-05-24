<template>
    <div class="uk-child-width-1-1" uk-grid>
        <navbar :data="navbar"></navbar>
        <router-view name="view" :pageData="viewRoute"></router-view>
        <footernav :data="footer"></footernav>
    </div>
</template>

<script>    
    import navbar from '../home/header/NavbarComponent'
    import footernav from '../home/header/FooterComponent'

    export default {
        components: {
            footernav,
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
            isLoading () {
                return this.$store.state.app.loader;
            },
            isSubscribe () {
                return false;
            }
        },
        beforeCreate () {      
            this.bralcoaxios({ url: this.$store.state.app.env.backend_url + "/api/v1/home", request: "GET" }).then( (response) => {
                var resolve = this.bralcoresponse(response)
                this.company = resolve.data.company;
                this.$store.state.app.env.url = resolve.data.company.appurl;
            }); 
        }
    }
</script>