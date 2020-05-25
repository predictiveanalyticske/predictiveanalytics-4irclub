<template>
    <vk-grid class="uk-child-width-1-1 uk-margin-remove" v-if="$route.params.item == undefined">
        <div class="uk-padding-remove uk-margin-remove">
            <vk-card class="br-banner uk-width-1-1 uk-light uk-padding-large">
                <vk-grid class="uk-child-width-1-2">
                    <div>
                        <h1>Package Plans</h1>
                        <h4>Here are the existing plans to our clients.</h4>
                    </div>
                </vk-grid>
            </vk-card>
        </div>
        <div class="uk-padding-remove uk-margin-remove" v-if="count > 0">
          <vk-grid class="uk-child-width-1-1 uk-padding-large">
            <div v-for="(value,key) in data" :key="key">
              <h1 class="uk-text-center">{{ key }}</h1>
              <vk-grid gutter="small" :class="'uk-child-width-1-' + value.length">
                <div v-for="(item,index) in value" :key="index">
                  <vk-card class="uk-card-100 uk-padding-small">
                    <h4 class="uk-margin-remove-bottom">{{ item.name }}</h4>
                    <div v-html="item.summary"></div>
                    <a :href="$router.resolve({name:'plan',params:{ item: item.id}}).href" class="uk-button uk-button-default">View More</a>
                  </vk-card>
                </div>
              </vk-grid>
            </div>
          </vk-grid>
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
    export default {
        name: 'plans',
        data () {
          return {
            data: {},
            count: 0,
          }
        },
        beforeCreate () {
            this.bralcoaxios({ url: this.$store.state.app.env.backend_url + "/api/v1/subscriptions/fetch", request: "GET" }).then( (response) => {
                var resolve = this.bralcoresponse(response);
                this.data   = resolve.data.subscriptions;
                this.count = Object.values(this.data).length;
            });
        }
    }
</script>

<style>
  .uk-card-100{
    height: 100% !important;
  }
</style>
