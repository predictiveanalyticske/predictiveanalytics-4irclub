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
                  <h4>Billing Details</h4>
                  <accordion :contents="billing" class="uk-width-1-1 uk-padding-remove-top"/>
                  <h4>Subscription etails</h4>
                  <accordion v-if="subscription.length > 0" :contents="subscription" class="uk-width-1-1 uk-padding-remove-top"/>
                  <h4>Payment Details</h4>
                  <accordion :contents="payment" class="uk-width-1-1 uk-padding-remove-top"/>
                  <vk-button class="uk-button-red uk-light" size="large">Checkout</vk-button>
                </vk-card>
              </div>
            </vk-card>
          </div>
      </vk-grid>
</template>

<script>
    import accordion from '@/components/plugins/AccordionComponent'
    export default {
        components: {
          accordion
        },
        name: 'plan',
        data () {
          return {
            data: {},
            fields:{
              amount: 0,
              subscription:{
                amount:0
              }
            },
            items: [],
            subscription: [],
            billing: [
              {
                active: false,
                title: "Existing User Login",
                html: '<div class="uk-grid uk-child-width-expand@s uk-child-width-1-2@xl uk-child-width-1-2@l uk-child-width-1-2@m"><div><div class="uk-margin"><label>Email</label><input class="uk-input" required v-model="fields.email" name="email" type="email" placeholder="Email Address"></div></div><div><div class="uk-margin"><label>Password</label><input class="uk-input" required v-model="fields.password" name="password" type="password" placeholder="Password"></div></div></div>'
              },
              {
                active: false,
                title: "Create a New Account",
                html: '<div class="uk-grid uk-child-width-1-1"><div><h3>Personal Information</h3><div class="uk-grid uk-child-width-1-2@l uk-child-width-1-2@m uk-child-width-1-2@xl uk-child-width-expand@s"><div><div class="uk-margin"><label>First Name</label> <input class="uk-input"name="firstname"placeholder="First Name"required v-model="fields.firstname"></div><div class="uk-margin"><label>Last Name</label> <input class="uk-input"name="lastname"placeholder="Last Name"required v-model="fields.lastname"></div></div><div><div class="uk-margin"><label>Email</label> <input class="uk-input"name="email"placeholder="Email Address"required v-model="fields.email"></div><div class="uk-margin"><label>Phone</label> <input class="uk-input"name="text"placeholder="Phone Number"required v-model="fields.phone"></div></div></div></div><div><h3>Account Security</h3><div class="uk-grid uk-child-width-1-2@l uk-child-width-1-2@m uk-child-width-1-2@xl uk-child-width-expand@s"><div><label>Password</label> <input class="uk-input"name="password"placeholder="Password"required v-model="fields.password"></div><div><label>Confirm Password</label> <input class="uk-input"name="confirmpassword"placeholder="Confirm Password"required v-model="fields.confirmpassword"></div></div></div></div>'
              }
            ],
            payment: [
              {
                active: true,
                title: "Payment Method",
                html: '<vk-grid class="uk-padding-small uk-width-1-1"><div><div class="uk-child-width-auto uk-grid uk-grid-small uk-margin"><label><input @click="selectPayment"class="uk-radio"name="subscription"type="radio"> Lipa na Mpesa (Pay via Mpesa)</label></div></div><div><div class="uk-child-width-auto uk-grid uk-grid-small uk-margin"><label><input @click="selectPayment"class="uk-radio"name="subscription"type="radio"> Pay via Visa</label></div></div></vk-grid>'
              },
            ],
            showPayment: false,
          }
        },
        beforeCreate () {
            this.bralcoaxios({ url: this.$store.state.app.env.backend_url + "/api/v1/subscriptions/fetch/view/" + this.$route.params.item, request: "GET" }).then( (response) => {
                var resolve = this.bralcoresponse(response);
                this.data   = resolve.data;
                this.items.push({title:"What's in the package ?", active: true, html: this.data.details});
                this.subscription.push({title:"Subscription Plans", active: true, html: '<vk-grid class="uk-padding-small uk-width-1-1"><div><div class="uk-inline"><input :value="'+this.data.monthly_cost+'"class="uk-radio"name="subscription"type="radio"v-model="'+this.fields.subscription.amount+'"><lable>Monthly Subscription</lable></div><div class="uk-padding-small uk-grid uk-grid-small"><div class="uk-leader-fill-content uk-width-expand">Total</div><div>'+ this.data.monthly_cost +'</div></div></div><div><div class="uk-inline"><input :value="'+this.data.annual_cost+'"class="uk-radio"name="subscription"type="radio"v-model="'+this.fields.subscription.amount+'"><lable>Annual Subscription</lable></div><div class="uk-padding-small uk-grid uk-grid-small"><div class="uk-leader-fill-content uk-width-expand">Total</div><div>'+ this.data.annual_cost +'</div></div></div></vk-grid>'});
            });
        },
        methods: {
          // buyPackage(value){
            // this.fields.payment = value;
            // this.showPayment = true;
            // event.target.scrollTop = this.$el.lastElementChild.offsetTop;
          // },
          selectPayment () {
            let el = event.target;
            console.log(el);
          }
        }
    }
</script>