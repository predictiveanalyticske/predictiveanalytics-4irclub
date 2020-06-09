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
            <vk-grid class="uk-child-width-1-1 uk-padding-large" matched>
              <div v-for="(value,key) in data" :key="key">
                <h1 class="uk-text-center">{{ key }}</h1>
                <vk-grid gutter="small" :class="'uk-child-width-1-4'">
                  <div v-for="(item,index) in value" :key="index" class="uk-padding-remove">
                    <vk-card class="br-plans" padding="small">
                      <vk-card-title>{{ item.name }}</vk-card-title>
                      <h3 class="uk-margin-small uk-width-1-1 uk-text-center uk-text-success">{{ item.monthly_cost }} per month</h3>
                      <a class="uk-button uk-button-medium uk-width-1-1 uk-button-red" :href="$router.resolve({name:'plan',params:{ item: item.id }}).href">Buy Now</a>
                      <p v-for="(value, key) in JSON.parse(item.features)" :key="key"><vk-icon icon="check"></vk-icon>{{ value }}</p>
                    </vk-card>
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
    export default {
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
            });
        }
    }
</script>

<style>
  .uk-card-100{
    height: 100% !important;
  }
</style>
