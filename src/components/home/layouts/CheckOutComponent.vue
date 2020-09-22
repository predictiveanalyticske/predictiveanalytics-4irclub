<template>
      <vk-grid class="uk-child-width-1-1 uk-margin-remove">
          <div class="uk-margin-remove uk-padding-remove">
            <vk-card padding="small">
              <div class="uk-flex uk-flex-center">
                <vk-card type="blank" class="uk-width-1-1 uk-padding-remove">
                  <h2>Review & Checkout</h2><hr>
                  <h3>Product details</h3>
                  <vk-grid class="uk-child-width-expand">
                    <div class="uk-width-2-3@xl uk-width-2-3@l uk-width-2-3@m uk-width-1-1@s">
                      <payment :fields="paymentFields" :data="paymentInit" :finish="initCheckout"/>
                    </div>
                    <div class="uk-width-1-3@xl uk-width-1-3@l uk-width-1-3@m uk-width-1-1@s">
                      <vk-card class="br-plans" padding="small">
                        <h5 class="uk-margin-small">Name</h5>
                        <h4 class="uk-margin-small">{{ product.name }}</h4><hr class="uk-margin-small">
                        <h5 class="uk-margin-small">Category</h5>
                        <h4 class="uk-margin-small">{{ product.category }}</h4><hr class="uk-margin-small">
                        <h4 class="uk-margin-small">Features</h4>
                        <ul class="uk-list uk-list-bullet">
                            <li v-for="(value,index) in features" :key="index">{{ value.name }}</li>
                        </ul>
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
            features: [],
            global: {},
            paymentFields:{
              method: null,
              checkout: false,
            },
            product: {
              category: '',
              details: '',
              name: '',
            }
          }
        },
        computed: {
          paymentInit(){
            if( Object.keys(this.data).length > 0){
              return {
                mpesa_paybill:this.data.mpesa.paybill,
                flutterEnv:   this.data.flutterwave.env,
                flutterKey:   this.data.flutterwave.public_key,
                amount:       this.data.payment.amount,
                currency:     this.global.currency,
                payment:      this.data.payment.id,
                email:        this.data.user.email,
                phone:        this.data.user.phone,
                name:         this.data.user.first_name+' '+this.data.user.last_name,
                country:      this.data.user.country
              }
            } else {
              return {};
            }
          },
        },
        beforeRouteEnter (to,from,next) {
          next( vm => {
            vm.initData(),
            next()
          });
        },
        methods: {
          initData(){
            this.bralcoaxios({ url: this.$store.state.app.env.backend_url + "/api/v1/4irclub/subscription/payment/" + this.$route.params.payment, request: "GET" }).then( (response) => {
                let resolve = this.bralcoresponse(response);
                this.data   = resolve.data;
                this.features = this.data.subscription.features || [];
                this.$store.commit('banner_title','Plan Review and Checkout');
                this.$store.commit('banner_content',this.data.subscription.name);
            });
            this.bralcoaxios({ url: this.$store.state.app.env.backend_url + "/api/v1/home", request: "GET" }).then( (response) => {
                let resolve = this.bralcoresponse(response)
                this.global = resolve.data.company;
            });
             if( this.$store.getters.sidebar ){
                this.$store.commit('sidebar',false);
             }
          },
          initCheckout () {
            let formData = new FormData();
            formData.append('method', this.paymentFields.method);

            this.bralcoaxios({ url: this.$store.state.app.env.backend_url + "/api/v1/4irclub/subscribe/challenge/checkout", request: "POST", form: formData }).then( (response) => {
               let resolve = this.bralcoresponse(response);
               this.bralcoswal({t:"success",m: resolve.data.m, h:resolve.data.h});
               this.$store.commit('isSubscribed',true);
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
        },
        watch: {
          data: {
            handler(value){
              if( Object.keys(value).length > 0){
              this.product.category = value.subscription.category;
              this.product.details = value.subscription.details;
              this.product.name = value.subscription.name;
              }
            },
            deep: true
          }
        }
    }
</script>
