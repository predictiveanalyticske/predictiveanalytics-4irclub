<template>
      <vk-grid class="uk-child-width-1-1 uk-margin-remove">
          <div class="uk-padding-remove uk-margin-remove">
              <vk-card class="br-banner uk-width-1-1 uk-light uk-padding-large">
                  <vk-grid class="uk-child-width-1-2">
                      <div>
                        <h1>Plan Checkout</h1>
                        <h4 class="uk-margin-remove">Choose how to pay the amount.</h4>
                      </div>
                  </vk-grid>
              </vk-card>
          </div>
          <div class="uk-margin-remove uk-padding-remove">
            <vk-card class="uk-padding-large">
              <div class="uk-flex uk-flex-center">
                <vk-grid class="uk-child-width-2-3">
                  <div>
                    <h2>Review & Checkout</h2><hr>

                    <h3>Product details</h3>
                    <vk-card class="uk-padding-small uk-card-red uk-light">
                      <h4 class="uk-margin-remove">Title</h4><hr class="uk-margin-small">
                      <p>{{ data.subscription.category }}</p>
                      <h4 class="uk-margin-remove">Category</h4><hr class="uk-margin-small">
                      <p>{{ data.subscription.category }}</p>
                      <h4 class="uk-margin-remove">Features</h4><hr class="uk-margin-small">
                      <div v-html="data.subscription.details"></div>
                    </vk-card>

                  </div>
                  <div>
                    <h3>Payment Method</h3>
                    <payment :fields="paymentFields" :data="{mpesa_paybill:global.mpesa_paybill,stripeKey:global.stripe_key,amount:data.payment.amount,currency:global.currency}"/>
                  </div>
                </vk-grid>
              </div>
            </vk-card>
            <div class="uk-width-1-1 br-banner uk-light">
              <vk-card type="blank">
                <div class="uk-flex uk-padding-small">
                  <div class="uk-flex-left">
                    <vk-button size="large">Cancel</vk-button>
                  </div>
                  <div class="uk-flex-center uk-width-1-1 uk-text-center"></div>
                  <div class="uk-flex-right">
                    <transition name="slide-fade">
                      <vk-button size="large" @click="initCheckout" v-if="paymentFields.checkout" >Checkout</vk-button>
                    </transition>
                  </div>
                </div>
              </vk-card>
            </div>
          </div>
      </vk-grid>
</template>

<script>
    import payment from '@/components/home/layouts/extra/PaymentMethodComponent'
    export default {
        components: {
          payment
        },
        name: 'checkout',
        data () {
          return {
            data: {},
            fields: {},
            global: {},
            paymentFields:{
              method: null,
              checkout: false,
            }
          }
        },
        created () {
            this.bralcoaxios({ url: this.$store.state.app.env.backend_url + "/api/v1/4irclub/subscription/payment/" + this.$route.params.payment, request: "GET" }).then( (response) => {
                let resolve = this.bralcoresponse(response);
                this.data   = resolve.data;
            });
            this.bralcoaxios({ url: this.$store.state.app.env.backend_url + "/api/v1/home", request: "GET" }).then( (response) => {
                let resolve = this.bralcoresponse(response)
                this.global = resolve.data.company;
            });
        },
        methods: {
          initCheckout () {
            let formData = new FormData();
            formData.append('method', this.paymentFields.method);

            this.bralcoaxios({ url: this.$store.state.app.env.backend_url + "/api/v1/4irclub/subscribe/challenge/checkout", request: "POST", form: formData }).then( (response) => {
               let resolve = this.bralcoresponse(response);
               this.bralcoswal({t:"success",m: resolve.data.m, h:resolve.data.h});
               this.$router.push({name:"profile"});
            });
          },
          submitForm () {
            let formData = new FormData();

            for( let value in this.fields ){
              formData.append(value,this.fields[value]);
            }
            formData.append('plan', this.$route.params.item);

            this.bralcoaxios({url: this.$store.state.app.env.backend_url + "/api/v1/4irclub/subscribe/challenge/1", request: 'POST', form: formData}).then( (response) => {
              this.bralcoresponse(response);
            });
          }
        }
    }
</script>
