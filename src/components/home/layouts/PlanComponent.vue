<template>
      <vk-grid class="uk-child-width-1-1 uk-margin-remove">
          <div class="uk-margin-remove uk-padding-remove">
            <vk-card class="uk-padding-small">
              <div class="uk-flex uk-flex-center">
                <vk-card type="blank" class="uk-width-1-1 uk-padding-remove">
                  <h2>Select your plan</h2>
                  <vk-grid class="uk-child-width-expand">
                    <div class="uk-width-2-3">
                      <subscriptions :fields="fields" :data="{'monthly_cost':data.monthly_cost,'annual_cost':data.annual_cost}" class="uk-width-1-1 uk-padding-remove-top"/>
                      <vk-button class="uk-button-red uk-margin" size="large" @click="showpurchase" v-if="showbuy && !$store.getters.isAuthenticated">Next</vk-button>
                      <vk-button class="uk-button-red uk-margin" size="large" @click="goToCheckout" v-if="$store.getters.isAuthenticated">Next</vk-button>
                      <transition name="slideDown">
                        <vk-grid class="uk-child-width-1-1 uk-margin" v-if="showpurchasediv">
                          <div>
                            <h4 class="uk-margin-small">Billing Details</h4>
                            <billinginfo :fields="billing" class="uk-width-1-1 uk-padding-remove-top"/>
                          </div>
                          <div>
                            <h4>Subscription details</h4>
                          </div>
                          <div>
                            <vk-button class="uk-button-red uk-light" @click="submitForm" size="large">Next</vk-button>
                          </div>
                        </vk-grid>
                      </transition>
                    </div>
                    <div class="uk-width-1-3">
                        <vk-card class="br-plans" padding="small">
                            <div slot="header">
                              <h3 class="uk-margin-remove">Order Summary</h3>
                            </div>
                            <vk-grid class="uk-child-width-expand">
                              <div>
                                 <p class="uk-margin-remove"> {{ data.name }}</p>
                                 <p class="uk-margin-remove">{{ data.category }}</p>
                              </div>
                              <div>
                                  <p class="uk-margin-remove"> {{ fields.amount }}</p>
                                  <p class="uk-margin-remove"> {{ fields.subscription_type }}</p>
                              </div>
                            </vk-grid><hr>
                            <vk-grid class="uk-child-width-expand">
                              <div>
                                 <h5 class="uk-margin-remove"> Today's Charge</h5>
                              </div>
                              <div>
                                  <h3 class="uk-margin-remove"> {{ fields.amount }}</h3>
                              </div>
                            </vk-grid><hr>
                        </vk-card>
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
        beforeRouteEnter (to,from,next) {
          next( vm => {
            vm.initData(),
            next()
          });
        },
        methods: {
          goToCheckout(){
            let formData = new FormData();

            for( let value in this.fields ){
              formData.append(value,this.fields[value]);
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

            for( let value in this.fields ){
              formData.append(value,this.fields[value]);
            }
            formData.append('plan', this.$route.params.item);
            formData.append('client_key',    btoa(process.env.VUE_APP_PASSPORT_KEY));
            formData.append('client_secret', btoa(process.env.VUE_APP_PASSPORT_SECRET));

            if( this.$router.mode == "hash"){
                formData.append('base_url', window.location.origin + '/#/');
            } else {
                formData.append('base_url', window.location.origin);
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
