<template>
      <vk-grid class="uk-child-width-1-1 uk-margin-remove">
          <div class="uk-padding-remove uk-margin-remove">
              <vk-card class="uk-card-red uk-width-1-1 uk-light uk-padding-large">
                  <vk-grid class="uk-child-width-1-2">
                      <div>
                        <h1>{{ data.name }}</h1>
                        <h4 class="uk-margin-remove">{{ data.category }}</h4>
                      </div>
                  </vk-grid>
              </vk-card>
          </div>
          <div class="uk-padding-large uk-margin-remove" v-if="Object.entries(data).length > 0">

              <vk-grid class="uk-flex uk-flex-center uk-child-width-1-2@xl uk-child-width-1-2@l uk-child-width-1-2@m">
                <div class="uk-padding-large">
                    <vk-card type="primary">
                      <h3>Monthly Fee</h3>
                      <h2 class="uk-margin-remove">{{ data.monthly_cost }}</h2>
                      <vk-button class="uk-margin" @click="showMonthly = true">Pay</vk-button>
                    </vk-card>
                    <vk-card  class="uk-card-green uk-margin">
                      <h3>Monthly Fee</h3>
                      <h2 class="uk-margin-remove">{{ data.monthly_cost }}</h2>
                      <vk-button class="uk-margin" @click="showMonthly = true">Pay</vk-button>
                    </vk-card>
                </div>
                <div>
                    <vk-card class="uk-text-primary">
                        <h3>Features</h3>
                        <div v-html="data.details"></div>
                    </vk-card>
                </div>
              </vk-grid>
          </div>

          <div class="uk-padding-remove uk-margin-remove" v-else>
            <vk-card type="blank" class="uk-padding-large uk-text-center">
              <vk-spinner ratio="8"></vk-spinner>
            </vk-card>
          </div>

      </vk-grid>
</template>

<script>
    export default {
        name: 'plan',
        data () {
          return {
            data: {},
            showMonthly: false 
          }
        },
        beforeCreate () {
            this.bralcoaxios({ url: this.$store.state.app.env.backend_url + "/api/v1/subscriptions/fetch/view/" + this.$route.params.item, request: "GET" }).then( (response) => {
                var resolve = this.bralcoresponse(response);
                this.data   = resolve.data;
            });
        }
    }
</script>

<style>
  .uk-card-100{
    height: 100% !important;
  }
</style>
