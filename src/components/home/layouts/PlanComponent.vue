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
                  <h2>View Product</h2>
                  <accordion v-if="items.length > 0" :contents="items" class="uk-width-1-1 uk-padding-remove-bottom uk-padding-remove-top"/>
                  <vk-button class="uk-button-red uk-margin" size="large" @click="showpurchase" v-if="showbuy">Buy</vk-button>
                  <transition name="slideDown">
                    <vk-grid class="uk-child-width-1-1 uk-margin" v-if="showpurchasediv">
                      <div>
                        <h3>Review & Checkout</h3>
                      </div>
                      <div>
                        <h4 class="uk-margin-small">Billing Details</h4>
                        <billinginfo :fields="billing" class="uk-width-1-1 uk-padding-remove-top"/>
                      </div>
                      <div>
                        <h4>Subscription details</h4>
                        <subscriptions :fields="subscription" :data="{'monthly_cost':data.monthly_cost,'annual_cost':data.annual_cost}" class="uk-width-1-1 uk-padding-remove-top"/>
                      </div>
                      <div>
                        <vk-button class="uk-button-red uk-light" @click="submitForm" size="large">Next</vk-button>
                      </div>
                    </vk-grid>
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
    import subscriptions from '@/components/home/layouts/extra/SubscriptionComponent'
    export default {
        components: {
          accordion,
          billinginfo,
          subscriptions
        },
        name: 'plan',
        data () {
          return {
            data: {},
            billing: {
              type: null,
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
            items: [],
            showbuy: true,
            showpurchasediv: false,
            showExisting: false,
            showNewAccount:false,
            subscription: {
                amount: 0,
            },
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
          },
          submitForm () {
            let formData = new FormData();
            let data = this.fields;
            var result = Object.values(data).map(function(value) {
              return value;
              // return [String(key), data[key]];
            });
            console.log(Object.entries(data));
            // Object.entries(this.fields).map( ([key,value]) => {
            //   if( typeof value == 'object'){
            //     Object.entries(value).map( ([index,item]) => {
            //        if( typeof item == 'object'){
            //          Object.entries(item).map( ([k,v]) => { 
            //            formData.append(k,v);
            //          });
            //         } else {
            //            formData.append(index,value);
            //         }
            //     });
            //   } else {
            //     formData.append(key,value);
            //   }
            // });

            // Display the key/value pairs
            // for(var pair of formData.entries()) {
            //   console.log(pair[0]+ ', '+ pair[1]); 
            // }

            // this.bralcoaxios({ url:this.$store.state.app.env.backend_url + '/api/v1/4irclub/subscribe/challenge/1', request: 'POST', form: formData}).then( (response) => {
            //   // this.bralcoresponse(response);
            // });

          }
        }
    }
</script>
