<template>
    <vk-grid class="uk-child-width-1-1 uk-margin-remove">
        <div class="uk-padding-remove uk-margin-remove">
            <vk-card>
                <div v-if="posts.length > 0">
                    <vk-grid class="uk-flex-center uk-margin">
                        <div v-for="(value,index) in postChunk.length" :key="index">
                            <vk-button class="uk-margin-small-right uk-button-red" :target="(parseInt(value) - 1)" v-if="activePage == (parseInt(value) - 1)"  @click="gotToPage">{{ value }}</vk-button>
                            <vk-button class="uk-margin-small-right" v-else @click="gotToPage" :target="(parseInt(value) - 1)">{{ value }}</vk-button>
                        </div>
                    </vk-grid>
                    <div class="uk-flex uk-flex-center" >
                        <Posts :data="activePostChunk" />
                    </div>
                    <vk-grid class="uk-flex-center uk-margin">
                        <div v-for="(value,index) in postChunk.length" :key="index">
                            <vk-button class="uk-margin-small-right uk-button-red" :target="(parseInt(value) - 1)" v-if="activePage == (parseInt(value) - 1)"  @click="gotToPage">{{ value }}</vk-button>
                            <vk-button class="uk-margin-small-right" v-else @click="gotToPage" :target="(parseInt(value) - 1)">{{ value }}</vk-button>
                        </div>
                    </vk-grid>
                </div>
                <div v-else-if="posts.length == 0" class="uk-text-center">
                    <h3 class="uk-text-warning"><vk-icon icon="info"></vk-icon> Nothing Found Here</h3>
                </div>
                <div v-else class="uk-text-center uk-flex uk-flex-center uk-flex-middle uk-padding-large uk-margin-large">
                    <vk-spinner ratio="4"></vk-spinner>
                </div>
            </vk-card>
        </div>
    </vk-grid>
</template>

<script>
    import { chunk } from 'lodash';
    import Posts from './show/PostsComponent'

    export default {
        components: {
            Posts
        },
        name: 'landing',
        props: ['pageData'],
        data () {
            return {
                activePage: 0,
                page: {
                    title: "Documentaries",
                    description: "",
                },
                perPage: 5,
                pages: 0,
                postChunk: {},
                posts: {},
            }
        },
        computed: {
            activePostChunk: {
                get () {
                    return this.postChunk[this.activePage];
                },
                set (newvalue){
                    return newvalue;
                }
            },
            total () {
                return this.posts.length;
            }
        },
        beforeRouteEnter (to,from,next) {
            next( vm => {
                vm.initData(),
                next()
            });
        },
        methods: {
            initData() {
                this.bralcoaxios({ url: this.$store.state.app.env.backend_url + "/api/v1/home/posts", request: "GET" }).then( (response) => {
                    var resolve = this.bralcoresponse(response);
                    this.posts = resolve.data.posts;
                    this.posts = Object.entries(this.posts).map( ([, value]) => {return value;});
                    this.postChunk = chunk(this.posts, this.perPage);
                    this.activePostChunk = this.postChunk[0];
                });
                this.$store.commit('banner_title','Documentaries');
                this.$store.commit('banner_content','');
            },
            gotToPage (event) {
                let el = event.target;
                this.activePage = parseInt(el.attributes.target.value);
                el.attributes.class
            }
        }
    }
</script>

<style scoped>
    .uk-card-red {
        background-color:#bf040f !important;
        box-shadow: none !important;
    }
    .uk-button-red {
        background-color:#bf040f !important;
        color: #fff;
    }
</style>
