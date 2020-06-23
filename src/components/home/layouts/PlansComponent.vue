<template>
    <vk-grid class="uk-child-width-1-1 uk-margin-remove" v-if="$route.params.item == undefined">
        <div class="uk-padding-remove uk-margin-remove">
          <vk-card>
            <vk-grid class="uk-child-width-1-1 uk-padding-large" matched>
              <div v-for="(value,key) in data" :key="key">
                <h1 class="uk-text-center br-heading">{{ key }}</h1>
                <vk-grid gutter="small" class="uk-child-width-1-4@xl uk-child-width-1-4@l uk-child-width-1-2@m uk-child-width-1-1@s uk-margin-remove uk-padding-remove">
                  <div v-for="(item,index) in value" :key="index" class="uk-padding-remove">
                    <vk-card class="br-plans" padding="small">
                      <vk-card-title class="br-heading">{{ item.name }}</vk-card-title>
                      <h3 class="uk-margin-small uk-width-1-1 uk-text-center uk-text-success">{{ item.monthly_cost }} per month</h3>
                      <h3 class="uk-margin-small uk-width-1-1 uk-text-center uk-text-success">{{ item.annual_cost }} per year</h3>
                      <a class="uk-button uk-button-medium uk-width-1-1 uk-button-red" :href="$router.resolve({name:'plan',params:{ item: item.id }}).href">Buy Now</a>
                      <p v-for="(value, key) in JSON.parse(item.features)" :key="key"><vk-icon icon="check"></vk-icon>{{ value }}</p>
                    </vk-card>
                  </div>
                </vk-grid>
              </div>
            </vk-grid>
          </vk-card>
        </div>
    </vk-grid>
    <router-view v-else></router-view>
</template>

<script>
    export default {
        name: 'plans',
        data () {
          return {
            data: {},
            cards: {},
          }
        },
        beforeRouteEnter (to,from,next) {
          next( vm => {
            vm.initData(),
            next()
          });
        },
        beforeMount(){
             this.$store.commit('banner_title','Package Plans')
             this.$store.commit('banner_content','List of available plans.');
             if( this.$store.getters.sidebar ){
                this.$store.commit('sidebar',false);
             }
        },
        methods:{
          initData(){
            this.bralcoaxios({ url: this.$store.state.app.env.backend_url + "/api/v1/subscriptions/fetch", request: "GET" }).then( (response) => {
                var resolve = this.bralcoresponse(response);
                this.data   = resolve.data.subscriptions;
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
            });
          }
        },
        mounted () {
            this.$store.commit('loader',false);
        },
    }
</script>

<style>
  .uk-card-100{
    height: 100% !important;
  }
</style>
