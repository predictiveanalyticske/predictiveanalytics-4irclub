<template>
    <vk-grid class="uk-child-width-1-1 uk-margin-remove">
        <div class="uk-padding-remove uk-margin-remove">
          <vk-card class="uk-padding-large">
              <vk-grid class="uk-child-width-1-1 uk-margin-remove">
                  <div class="uk-card-dark">
                    <h1 class="uk-text-center uk-heading-2xlarge">Search</h1>
                    <div class="uk-inline uk-width-1-1 uk-margin-remove">
                        <form :action="$store.getters.backendurl + '/api/v1/4irclub/glossary/search'" method="POST" @submit.prevent="searchForm">
                            <input class="uk-input br-search-input uk-form-large uk-visible@s uk-visible@m" type="text" name="itemsearch">
                            <input type="hidden" value="PUT" name="_method" />
                            <a class="uk-form-icon uk-form-icon-flip uk-visible@s uk-visible@m" href="#"><vk-icon icon="search" ratio="2"></vk-icon></a>
                        </form>
                        </div>
                  </div>

                    
                    <div class="uk-width-1-1" v-if="data.length < 1">
                        <vk-card class="uk-width-1-1 uk-text-center">
                            <vk-card-title>Nothing Found</vk-card-title>
                        </vk-card>
                    </div>
                    <div v-else>
                        <vk-pagination align="center" :page.sync="table.pageNumber" :perPage="table.perPage" :total="table.length.value">
                            <vk-pagination-page-prev></vk-pagination-page-prev>
                            <vk-pagination-pages></vk-pagination-pages>
                            <vk-pagination-page-next></vk-pagination-page-next>
                        </vk-pagination>

                        <div v-for="(value,index) in table.activePage" :key="index">
                            <h1 :id="index">{{ index + 1 }}</h1><hr>
                            <main>
                                <div class="item">
                                    <h2>{{ value.name }}</h2>
                                    <h4>{{ value.definition }}</h4>
                                    <h4 v-if="value.formula != null">{{ value.formula }}</h4>
                                    <div v-if="value.related == 'Yes'">
                                        <div class="item">
                                            <main v-for="(item,key) in value.related_items" :key="key" >
                                                <h2>{{ item.name }}</h2>
                                                <p>{{ item.definition }}</p>
                                            </main>
                                        </div>
                                    </div>
                                    <vk-label class="uk-text-right">{{ value.category }}</vk-label>
                                </div>
                            </main>
                        </div>
                        <vk-pagination align="center" :page.sync="table.pageNumber" :perPage="table.perPage" :total="table.length.value">
                            <vk-pagination-page-prev></vk-pagination-page-prev>
                            <vk-pagination-pages></vk-pagination-pages>
                            <vk-pagination-page-next></vk-pagination-page-next>
                        </vk-pagination>
                    </div>

                 <div>
                 </div>
              </vk-grid>
          </vk-card>
        </div>
    </vk-grid>
</template>

<script>
    import { chunk } from 'lodash';

    export default {
        name: 'glossary',
        data () {
          return {
            cards: {},
            data: {},
            table: {
                activePage: {},
                chunk: [],
                pages: 0,
                pageNumber: 0,
                perPage: 35,
                length: {
                    type:Number,
                    value: 0
                }
            },
            loader: false
          }
        },
        beforeRouteEnter (to,from,next) {
            next( vm => {
                vm.checkSubscription(),
                next()
            });
        },
        methods: {
            assignData(){
                if( this.data.length > 0){
                    this.table.pages        =  this.data.length % this.table.perPage;
                    this.table.chunk        =  chunk(this.data, this.table.perPage);
                    this.table.activePage   =  this.table.chunk[0];
                    this.table.length.value =  this.data.length;
                }
            },
            checkSubscription(){
                switch( JSON.parse(this.$store.getters.isSubscribed) && JSON.parse(this.$store.getters.isPaid) ){
                    case true:
                        this.iniData();
                    break;
                    case false:
                        this.$router.push({name:"home"});
                    break;
                }
            },
            iniData(){
                this.bralcoaxios({ url: this.$store.state.app.env.backend_url + "/api/v1/glossary", request: "GET" }).then( (response) => {
                    let resolve = this.bralcoresponse(response);
                    this.data   = resolve.data.glossary 
                    this.assignData();
                });
            },
            searchForm() {
                let el = event.target;
                let formData = new FormData(el);
                this.bralcoaxios({ url: el.attributes.action.value, request: el.attributes.method.value, form:formData}).then( (response) => {
                    let resolve = this.bralcoresponse(response);
                    this.data   = resolve.data.glossary 
                    this.assignData();
                });
            }
        },
        mounted (){
            this.$store.commit('banner_title','Glossary')
            this.$store.commit('banner_content','');
            if( this.$store.getters.sidebar ){
                this.$store.commit('sidebar',false);
            }
        },
        watch: {
            'table.pageNumber': {
                handler(val){
                    this.table.activePage = this.table.chunk[val - 1];
                }
            }
        }
    }
</script>
