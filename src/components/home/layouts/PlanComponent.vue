<template>
    <vk-grid class="uk-child-width-1-1 uk-margin-remove">
        <div class="uk-padding-remove uk-margin-remove">
            <vk-card class="uk-card-red uk-width-1-1 uk-light uk-padding-large">
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
                  <vk-card padding="large" class="uk-card-100">
                    <h3>{{ item.details }}</h3>
                  </vk-card>
                </div>
              </vk-grid>
            </div>
          </vk-grid>
        </div>

        <div class="uk-padding-remove uk-margin-remove" v-else-if="count == 0">

        </div>

        <div class="uk-padding-remove uk-margin-remove" v-else>
          {{data.length}}
          <vk-card type="blank" class="uk-padding-large uk-text-center">
            <vk-spinner ratio="8"></vk-spinner>
          </vk-card>
        </div>

    </vk-grid>
</template>

<script>
    export default {
        name: 'plans',
        data () {
          return {
            data: {},
            count: 0
          }
        },
        beforeCreate () {
            this.bralcoaxios({ url: "/api/v1/subscriptions/fetch", request: "GET" }).then( (response) => {
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
