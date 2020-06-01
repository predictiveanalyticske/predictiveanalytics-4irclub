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
            isLoading () {
                return this.$store.state.app.loader;
            },
            isSubscribe () {
                return false;
            }
        },
        beforeCreate () {
            this.bralcoaxios({ url: this.$store.state.app.env.backend_url + "/api/v1/home", request: "GET" }).then( (response) => {
                let resolve = this.bralcoresponse(response)
                this.company = resolve.data.company;
                this.$store.state.app.data.global['company'] = resolve.data.company;
            });
        }
    }
</script>
