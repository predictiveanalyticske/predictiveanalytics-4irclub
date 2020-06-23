<template>
    <vk-grid class="uk-child-width-1-1 uk-margin-remove" v-if="$route.params.item == undefined">
        <div class="uk-padding-remove uk-margin-remove">
          <vk-card>
            <vk-grid class="uk-child-width-1-1 uk-padding-large@xl uk-padding-large@l uk-padding-large@m uk-padding-small@s" matched>
              <div v-for="(value,key) in data" :key="key">
                <h1 class="uk-text-center br-heading">{{ key }}</h1>
                <vk-grid gutter="small" class="uk-child-width-1-4@xl uk-child-width-1-4@l uk-child-width-1-2@m uk-child-width-1-1@s uk-margin-remove uk-padding-remove">
                  <div v-for="(item,index) in value" :key="index" class="uk-padding-remove">
                    <vk-card class="br-plans" padding="small" ref="plans">
                      <vk-card-title class="br-heading uk-text-center" tag="h2">{{ item.name }}</vk-card-title>
                      <div class="br-plans-content">
                        <h3 class="uk-margin-small uk-width-1-1 uk-text-center uk-text-success">{{ item.monthly_cost }} per month</h3>
                        <h3 class="uk-margin-small uk-width-1-1 uk-text-center uk-text-success">{{ item.annual_cost }} per year</h3>
                        <a class="uk-button uk-button-medium uk-width-1-1 uk-button-red" :href="$router.resolve({name:'plan',params:{ item: item.id }}).href">Buy Now</a>
                        <p v-for="(value, key) in JSON.parse(item.features)" :key="key"><vk-icon icon="check"></vk-icon>{{ value }}</p>
                      </div>
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
                this.$nextTick((fallback) => {
                  let plans = document.getElementsByClassName('br-plans');
                  plans.forEach( function(item, key) {
                    var body = item.getElementsByClassName('uk-card-body');
                    body[0].setAttribute('style','height: 530px !important');
                    var content = body[0].getElementsByClassName('br-plans-content');
                    body[0].innerHTML = body[0].innerHTML + '<a href="#" class="uk-button uk-button-red uk-button-medium uk-width-1-1" style="position:absolute !important; bottom: 0 !important; right:0 !important;">Show More</a>'
                    // console.log(content[0].innerHTML);
                  });
                });
            });
          },
          plansClosed(){

            
          }
        },
        mounted () {
            this.$store.commit('loader',false);
            
        },
    }
</script>

<style scoped lang="scss">
  .uk-card-100{
    height: 100% !important;
  }

  .br-plans{
    position:relative !important;
    
    .uk-card-body{
      height:0;
      overflow:hidden;
    }

  }
</style>
