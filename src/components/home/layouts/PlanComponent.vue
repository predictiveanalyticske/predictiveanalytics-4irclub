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
                        <subscriptions :fields="fields" :data="{'monthly_cost':data.monthly_cost,'annual_cost':data.annual_cost}" class="uk-width-1-1 uk-padding-remove-top"/>
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
            billing: {
              type: null,
              existingaccount: {
                  email:    '',
                  password: ''
              },
              newaccount: {
                email: '',
                first_name: '',
                last_name: '',
                password: '',
                password_confirmation: '',
                phone:    ''
              }
            },
            data: {},
            fields: {},
            items: [],
            showbuy: true,
            showpurchasediv: false,
            showExisting: false,
            showNewAccount:false,
            subscription: {
                subcription_type: null,
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

            for( let value in this.fields ){
              formData.append(value,this.fields[value]);
            }
            formData.append('plan', this.$route.params.item);

            this.bralcoaxios({url: this.$store.state.app.env.backend_url + "/api/v1/4irclub/subscribe/challenge/1", request: 'POST', form: formData}).then( (response) => {
              let resolve = this.bralcoresponse(response);
              localStorage.setItem('access_token',resolve.data.token.access_token);
              localStorage.setItem('token_type',resolve.data.token.type);
              localStorage.setItem('expires_in',resolve.data.token.expires_at);
              this.$store.state.app.auth.access_token      = resolve.data.token.access_token;
              this.$store.state.app.auth.expires_in        = resolve.data.token.expires_in;
              this.$store.state.app.auth.token_type        = resolve.data.token.token_type;
              this.$store.state.app.auth.isAuthenticated   = true;
              this.$router.push( { name:"checkout",params:{ payment: resolve.data.payment.id } } );
            });
          }
        },
        watch: {
          billing: {
             handler(val){
               this.fields.type = this.billing.type;
               if( val.type != null ){
                 switch( val.type ){
                   case 'existingaccount':
                    if( Object.keys(this.fields).length > 0){
                      for(let value in val.existingaccount){
                        this.fields[value] = val.existingaccount[value];
                      }
                    } else {
                        this.fields = val.existingaccount;
                    }

                   break;
                   case 'newaccount':
                     if( Object.keys(this.fields).length > 0){
                       for(let value in val.newaccount){
                         this.fields[value] = val.newaccount[value];
                       }
                     } else {
                         this.fields = val.newaccount;
                     }

                   break;
                 }
               }
             },
             deep: true
          },
          subscription: {
            handler(val){
              this.fields.subscription.amount = val.amount;
            },
            deep: true
          }
        }
    }
</script>
