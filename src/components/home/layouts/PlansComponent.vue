<template>
    <vk-grid class="uk-child-width-1-1 uk-margin-remove" v-if="$route.params.item == undefined">
        <div class="uk-padding-remove uk-margin-remove">
            <vk-card class="br-banner uk-light uk-padding-large">
                <vk-grid class="uk-child-width-1-1 uk-text-center">
                    <div>
                        <h1>Package Plans</h1>
                    </div>
                </vk-grid>
                <div class='box'>
                    <div class='wave -one'></div>
                    <div class='wave -two'></div>
                    <div class='wave -three'></div>
                </div>
            </vk-card>
        </div>
        <div class="uk-padding-remove uk-margin-remove" v-if="count > 0">
          <vk-card>
            <vk-grid class="uk-child-width-1-1 uk-padding-large">
              <div v-for="(value,key) in cards" :key="key">
                <h1 class="uk-text-center">{{ key }}</h1>
                <vk-grid gutter="small" :class="'uk-child-width-1-3'">
                  <div v-for="(item,index) in value" :key="index">
                    <accordion :contents="item" />

                  </div>
                </vk-grid>
              </div>
            </vk-grid>
          </vk-card>
        </div>

        <div class="uk-padding-remove uk-margin-remove" v-else-if="count == 0">
          <vk-card type="blank" class="uk-padding-large uk-text-center">
            <h2><vk-icon icon="info" ratio="2"></vk-icon> Nothing Found Here</h2>
          </vk-card>
        </div>

        <div class="uk-padding-remove uk-margin-remove" v-else>
          <vk-card type="blank" class="uk-padding-large uk-text-center">
            <vk-spinner ratio="8"></vk-spinner>
          </vk-card>
        </div>
    </vk-grid>
    <router-view v-else></router-view>
</template>

<script>
    import accordion from '@/components/plugins/AccordionComponent'
    export default {
        components: {
          accordion
        },
        name: 'plans',
        data () {
          return {
            data: {},
            cards: {},
            count: 0,
          }
        },
        beforeCreate () {
            this.bralcoaxios({ url: this.$store.state.app.env.backend_url + "/api/v1/subscriptions/fetch", request: "GET" }).then( (response) => {
                var resolve = this.bralcoresponse(response);
                this.data   = resolve.data.subscriptions;
                this.count = Object.values(this.data).length;
                let items = [];
                for(let index in this.data){
                  for(let value of this.data[index]){
                    items.push([{
                      active: true,
                      title: value.name,
                      html: value.summary + '<a href="'+window.location.origin+"/"+this.$router.resolve({name:'plan',params:{ item: value.id}}).href+'" class="uk-button uk-button-default">View More</a>'
                    }]);
                  }
                  this.cards[index] = items; 
                }
            });
        }
    }
</script>

<style>
  .uk-card-100{
    height: 100% !important;
  }
</style>
