<template>
      <vk-grid class="uk-child-width-1-1 uk-margin-remove">
          <div class="uk-margin-remove uk-padding-remove">
            <vk-card padding="small">
              <div class="uk-flex uk-flex-center">
                <vk-card type="blank" class="uk-width-1-1 uk-padding-remove" padding="small">
                  <vk-grid class="uk-child-width-expand uk-flex uk-flex-center">
                    <div class="uk-width-2-3@xl uk-width-2-3@l uk-width-3-4@m uk-width-1-1@s">
                      <h2>Select your plan</h2>
                      <subscriptions 
                          :currency="data.currency || ''"
                          :data="data.amounts || []" 
                          :callback="selectSubscription"
                          class="uk-width-1-1 uk-padding-remove-top"/>
                      <vk-button class="uk-button-red uk-margin" size="large" @click="showpurchase" v-if="showbuy && !$store.getters.isAuthenticated">Next</vk-button>
                      <vk-button class="uk-button-red uk-margin" size="large" @click="goToCheckout" v-if="$store.getters.isAuthenticated">Next</vk-button>
                      <transition name="slideDown">
                        <vk-grid class="uk-child-width-1-1 uk-margin" v-if="showpurchasediv">
                          <div>
                            <h4 class="uk-margin-small">Billing Details</h4>
                            <billinginfo :fields="billing" class="uk-width-1-1 uk-padding-remove-top"/>
                          </div>
                          <div>
                            <vk-button class="uk-button-red uk-light" @click="submitForm" size="large">Next</vk-button>
                          </div>
                        </vk-grid>
                      </transition>
                    </div>
                  </vk-grid>
                </vk-card>
              </div>
            </vk-card>
          </div>
      </vk-grid>
</template>

<script>
    import billinginfo from '@/components/home/layouts/extra/BillingInfoComponent'
    import subscriptions from '@/components/home/layouts/extra/SubscriptionComponent'
    export default {
        components: {
          billinginfo,
          subscriptions
        },
        computed: {
          subscription_fields:{
            get(){
              return {};
            },
            set(val){
              return val;
            }
          },
          subscriptionFields:{
            get(){
              return {};
            },
            set(val){
              return val;
            }
          }
        },
        name: 'planItem',
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
            summary: {},
            items: [],
            showbuy: false,
            showpurchasediv: false,
            showExisting: false,
            showNewAccount:false,
            subscription: ''
          }
        },
        beforeRouteEnter (to,from,next) {
          next( vm => {
            vm.initData(),
            next()
          });
        },
        methods: {
          selectSubscription () {
            let el = event.currentTarget;
            this.subscription = el;
          },
          goToCheckout(){
            let formData = new FormData();

            for( let value in this.subscription_fields ){
              formData.append(value,this.subscription_fields[value]);
            }
            formData.append('plan', this.$route.params.item);
            this.bralcoaxios({ url: this.$store.state.app.env.backend_url + "/api/v1/4irclub/subscribe/challenge/subscription/store", request: "POST", form: formData }).then( (response) => {
                let resolve = this.bralcoresponse(response);
                this.$router.push( { name:"checkout",params:{ payment: resolve.data.payment.id } } );
            });
          },
          initData(){
            this.bralcoaxios({ url: this.$store.state.app.env.backend_url + "/api/v1/subscriptions/fetch/view/" + this.$route.params.item, request: "GET" }).then( (response) => {
                let resolve = this.bralcoresponse(response);
                this.data   = resolve.data;
                this.items.push({title:"What's in the package ?", active: true, description: this.data.features});
                this.$store.commit('loader',false);
                this.$store.commit('banner_title',this.data.name);
                this.$store.commit('banner_content',this.data.category);
            });
          },
          showpurchase(){
            this.showbuy = false;
            this.showpurchasediv = true;
          },
          submitForm () {
            let formData = new FormData();

            for( let value in this.subscription_fields ){
              formData.append(value,this.subscription_fields[value]);
            }
            formData.append('plan', this.$route.params.item);
            formData.append('client_key',    btoa(process.env.VUE_APP_PASSPORT_KEY));
            formData.append('client_secret', btoa(process.env.VUE_APP_PASSPORT_SECRET));

            if( this.$router.mode == "hash"){
                formData.append('base_url', window.location.origin + '/#/');
            } else {
                formData.append('base_url', window.location.origin + '/');
            }

            this.bralcoaxios({url: this.$store.state.app.env.backend_url + "/api/v1/4irclub/subscribe/challenge/1", request: 'POST', form: formData}).then( (response) => {
              let resolve = this.bralcoresponse(response);
              if( Object.keys(resolve.data).length > 0 ){
                localStorage.setItem('access_token',resolve.data.token.access_token);
                localStorage.setItem('token_type',resolve.data.token.token_type);
                localStorage.setItem('expires_in',resolve.data.token.expires_in);
                this.$store.commit('access_token',resolve.data.token.access_token);
                this.$store.commit('expires_in',resolve.data.token.expires_in);
                this.$store.commit('token_type',resolve.data.token.token_type);
                this.$store.commit('isAuthenticated',true);
                this.$router.push( { name:"checkout",params:{ payment: resolve.data.payment.id } } );
              } else {
                  this.bralcoswal({t:"error",m:'Something went wrong. Please try again.',h:'Error'});
              }

            });
          }
        },
        watch: {
          subscription:{
            handler(val){
              console.log(val);
              this.subscription_fields.subscription_type  = val.attributes.target.value;
              this.subscriptionFields.subscritpion_type   = val.attributes.target.value;
              this.subscription_fields.amount = val.value;
              this.subscriptionFields.amount = val.value;
              this.showpurchasediv = true;
            },
            deep: true
          },
          billing: {
             handler(val){
               this.subscription_fields.type = this.billing.type;
               this.subscription_fields.currency = this.data.currency;
               if( val.type != null ){
                 switch( val.type ){
                   case 'existingaccount':
                    if( Object.keys(this.subscriptionFields).length > 0){
                      for(let value in this.subscription_fields){
                        this.subscription_fields[value];
                      }
                      for(let value in val.existingaccount){
                        this.subscription_fields[value] = val.existingaccount[value];
                      }
                    } else {
                        this.subscription_fields = val.existingaccount;
                    }

                   break;
                   case 'newaccount':
                     if( Object.keys(this.subscriptionFields).length > 0){
                       for(let value in val.newaccount){
                         this.subscription_fields[value] = val.newaccount[value];
                       }
                     } else {
                         this.subscription_fields = val.newaccount;
                     }

                   break;
                 }
               }
             },
             deep: true
          }
        }
    }
</script>