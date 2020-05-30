<template>
      <vk-grid class="uk-child-width-1-1 uk-margin-remove">
          <div class="uk-padding-remove uk-margin-remove">
              <vk-card class="br-banner uk-width-1-1 uk-light uk-padding-large">
                  <vk-grid class="uk-child-width-1-2">
                      <div>
                        <h1>{{ data.name }}</h1>
                        <h4 class="uk-margin-remove">{{ data.category }}</h4>
                      </div>
                  </vk-grid>
              </vk-card>
          </div>
          <div class="uk-margin-remove uk-padding-remove">
            <vk-card class="uk-padding-small">
              <div class="uk-flex uk-flex-center">
                <vk-card type="blank" class="uk-width-2-3 uk-padding-remove">
                  <h3>Review & Checkout</h3>
                  <h4>View Product</h4>
                  <accordion v-if="items.length > 0" :contents="items" class="uk-width-1-1 uk-padding-remove-bottom uk-padding-remove-top"/>
                  <vk-button class="uk-button-red uk-margin" size="large" @click="showpurchase" v-if="showbuy">Buy</vk-button>
                  <transition name="slideDown">
                    <div class="uk-width-1-1" v-if="showpurchasediv">
                      <h4>Billing Details</h4>
                      <billinginfo :fields="billing" class="uk-width-1-1 uk-padding-remove-top"/>
                      <h4>Subscription etails</h4>
                      <subscriptions :fields="subscription" :data="{'monthly_cost':data.monthly_cost,'annual_cost':data.annual_cost}" class="uk-width-1-1 uk-padding-remove-top"/>
                      <transition name="slide-fade">
                        <div v-if="subscription.showPayment">
                          <h4>Payment Details</h4>
                          <paymentmethod :fields="payment" class="uk-width-1-1 uk-padding-remove-top"/>
                          <vk-button class="uk-button-red uk-light" size="large">Checkout</vk-button>
                        </div>
                      </transition>
                    </div>
                  </transition>
                </vk-card>
              </div>
            </vk-card>
          </div>
      </vk-grid>
</template>

<script>
    import accordion from '@/components/plugins/AccordionComponent'
    import billinginfo from '@/components/home/layouts/extra/BillingInfoComponent'
    import paymentmethod from '@/components/home/layouts/extra/PaymentMethodComponent'
    import subscriptions from '@/components/home/layouts/extra/SubscriptionComponent'
    export default {
        components: {
          accordion,
          billinginfo,
          paymentmethod,
          subscriptions
        },
        computed: {
          payment () {
            return {
              amount: this.subscription.amount,
              card: {
                cardholder: "",
                cardnumber: "",
                cvv: "",
                month: "",
                year: ""
              },
              type: "",
              mpesa: {},
            }
          }
        },
        name: 'plan',
        data () {
          return {
            data: {},
            fields:{
              email: '',
              password:'',
              confirmpassword:'',
              amount: 0,
              subscription:{
                amount:0
              }
            },
            items: [],
            subscription: {
                amount: 0,
                showPayment: false,
            },
            billing: {
              existingaccount: {
                  email:    '',
                  password: ''
              },
              newaccount: {
                confirmpassword: '',
                email: '',
                firstname: '',
                lastname: '',
                password: '',
                phone:    ''
              }
            },
            showbuy: true,
            showpurchasediv: false,
            showExisting: false,
            showNewAccount:false
          }
        },
        beforeCreate () {
            this.bralcoaxios({ url: this.$store.state.app.env.backend_url + "/api/v1/subscriptions/fetch/view/" + this.$route.params.item, request: "GET" }).then( (response) => {
                let resolve = this.bralcoresponse(response);
                this.data   = resolve.data;
                this.items.push({title:"What's in the package ?", active: true, html: this.data.details});
                this.$store.state.app.loader = false;
            });
        },
        methods: {
          // buyPackage(value){
            // this.fields.payment = value;
            // this.showPayment = true;
            // event.target.scrollTop = this.$el.lastElementChild.offsetTop;
          // },
          showpurchase(){
            this.showbuy = false;
            this.showpurchasediv = true;
          },
          selectPayment () {
            let el = event.target;
            console.log(el);
          }
        }
    }
</script>
