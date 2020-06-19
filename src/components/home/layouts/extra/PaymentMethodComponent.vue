<template>
  <transition name="slide-fade">
   <div v-if="paymentCharge" >
      <div class="accordion  uk-padding-remove">
          <div class="accordion-item">
              <div class="accordion-header">
                  <a href="#" @click.prevent="selectMethod" >
                      <div class="accordion-header-div"><input value="mpesa" target="accordionmpesa" class="uk-radio" name="paymentmethod" type="radio"> Pay via Mpesa</div>
                      <div class="accordion-header-div">
                          <div class="accordion-caret"></div>
                      </div>
                  </a>
              </div>
              <div class="accordion-body" ref="accordionmpesa">
                  <div class="accordion-content">
                    <div class="uk-width-1-1 uk-padding-large">
                        <h3>Guide</h3>
                        <ul class="uk-list uk-list-large">
                            <li><vk-icon icon="check" class="uk-text-success"></vk-icon> Go to <strong>Safaricom Menu</strong></li>
                            <li><vk-icon icon="check" class="uk-text-success"></vk-icon> Select <strong>M-PESA</strong></li>
                            <li><vk-icon icon="check" class="uk-text-success"></vk-icon> Select <strong>Lipa na MPESA</strong></li>
                            <li><vk-icon icon="check" class="uk-text-success"></vk-icon> Select <strong>Buy Good and Services</strong></li>
                            <li><vk-icon icon="check" class="uk-text-success"></vk-icon> Enter Paybill No <strong> {{ data.mpesa_paybill }}</strong></li>
                            <li><vk-icon icon="check" class="uk-text-success"></vk-icon> Enter Amount <strong>{{ total }}</strong></li>
                        </ul>
                        <form method="POST" @submit.prevent="validatePayment" :action="this.$store.state.app.env.backend_url+'/api/v1/4irclub/subscribe/pay/mpesa/'+data.payment">
                          <div class="uk-margin">
                            <label>Phone Number</label>
                            <vue-phone-number-input @update="getPhoneNumber" :onlyCountries="['KE']" :required="true" :size="'10'" v-model="phoneNumber" :defaultCountryCode="'KE'"/>
                            <input type="hidden" class="uk-input" name="phone" v-model="formatedNumber"/>
                          </div>
                          <vk-button size="large" class="uk-button-red" htmlType="submit" >Pay {{ total }}</vk-button>
                        </form>
                    </div>
              </div>
          </div>
      </div>
      <div class="accordion uk-padding-remove">
          <div class="accordion-item">
              <div class="accordion-header">
                  <a href="#" @click.prevent="selectMethod">
                      <div class="accordion-header-div"> <input value="creditcard" target="accordioncard" class="uk-radio" name="paymentmethod" type="radio"> Pay via Card</div>
                      <div class="accordion-header-div">
                          <div class="accordion-caret"></div>
                      </div>
                  </a>
              </div>
              <div class="accordion-body" ref="accordioncard">
                  <div class="accordion-content">
                    <div class="uk-width-1-1 uk-padding-large">
                      <h3>Guide</h3>
                      <ul class="uk-list uk-list-large">
                          <li><vk-icon icon="check" class="uk-text-success"></vk-icon> Valid Card</li>
                          <li><vk-icon icon="check" class="uk-text-success"></vk-icon> Amount Charge is <strong>{{ total }}</strong></li>
                      </ul>
                      <div id="card-element" class="uk-margin-small uk-padding-small"></div>
                        <vk-button size="large" class="uk-margin uk-button-red" @click="initPayment">Pay {{ total }}</vk-button>
                    </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  </div>
  <vk-card v-if="showPaymentMessage" class="uk-text-center uk-card-success uk-light">
    <h2><vk-icon icon="happy" ratio="2"></vk-icon> Payment Successful</h2>
  </vk-card>
</transition>
</template>
<script>
import gsap from "gsap";
import { TweenLite, Bounce, Elastic } from 'gsap/all'
import {loadStripe} from '@stripe/stripe-js';

export default {
  name: "paymentmethod",
  props: ["fields","data"],
  data () {
    return {
      checkout: false,
      mpesa: {
        show: false,
        target: 'accordionmpesa'
      },
      creditcard: {
        show: false,
        target: 'accordioncard'
      },
      paymentCharge: true,
      phoneNumber: '',
      formatedNumber: '',
      showPaymentMessage: false,
    }
  },
  computed: {
    total () {
      return this.data.currency + ' ' +this.data.amount;
    },
    amount () {
      return this.data.amount;
    }
  },
  beforeCreate(){
    // don't forget to register plugins
    gsap.registerPlugin(TweenLite, Bounce, Elastic); 
  },
  mounted () {
    loadStripe(this.data.stripeKey).then((s) => {
        this.stripe = s;
        const elements = this.stripe.elements();
        this.cardElement = elements.create('card');
        this.cardElement.mount('#card-element');
    });
  },
  methods: {
    async initPayment () {
        const { paymentMethod, error } = await this.stripe.createPaymentMethod(
            'card', this.cardElement, {
                billing_details: {
                  name: 'Card Tester'
                }
            }
        );

        if (error) {
          console.error(error);
            // Display "error.message" to the user...
        } else {
          let formData = new FormData();
          formData.append('paymentMethod',JSON.stringify(paymentMethod));
          this.bralcoaxios({url: this.$store.state.app.env.backend_url + "/api/v1/4irclub/subscribe/pay/card", request: 'POST', form: formData}).then( (response) => {
            let resolve = this.bralcoresponse(response);
            if( resolve.data.charged ){
              this.paymentCharge = false;
              this.showPaymentMessage = true;
              this.fields.method = resolve.data.method;
              this.fields.checkout = resolve.data.checkout;
            }
          });
        }
    },
    getPhoneNumber (val) {
      // console.log(val.formatNational);
      if( val.formatNational != undefined && val.formatNational.length == 11){
        this.formatedNumber = val.countryCallingCode + val.nationalNumber;
      }
    },
    selectMethod () {
      let el = event.target;
      this.selectiveToggle(this.toggleAccordion(el));
    },
    validatePayment() {
      let el = event.target;
      let formData = new FormData(el);
      formData.append('amount',this.data.amount);
      this.bralcoaxios({url: el.attributes.action.value, request: el.attributes.method.value, form: formData}).then( (response) => {
        let resolve = this.bralcoresponse(response);
        console.log(resolve);
      });
    },
    toggleAccordion(el){
      let input;
      switch( el.parentElement.tagName ){
        case 'A':
          input = el.parentElement.children.item(0).children.item(0);
        break;
        case 'DIV':
          input = el.parentElement.children.item(0).children.item(0).children.item(0);
        break;
      }
      TweenLite.to(this.$refs[input.attributes.target.value], 1, {
          height:this.$refs[input.attributes.target.value].scrollHeight,
          ease: Elastic.easeOut.config(1, 0.3)
      });
      return input;
    },
    selectiveToggle(input){
      input.checked = true;
      switch( input.attributes.value.value ){
        case 'mpesa':
          this.mpesa.show = true;
          if( this.creditcard.show ){
            this.creditcard.show = false;
            TweenLite.to(this.$refs[this.creditcard.target], 0.5, {
                height: 0,
                ease: Bounce.easeOut
            });
          }
        break;
        case 'creditcard':
          this.creditcard.show = true;
          if( this.mpesa.show ){
            this.mpesa.show = false;
            TweenLite.to(this.$refs[this.mpesa.target], 0.5, {
                height: 0,
                ease: Bounce.easeOut
            });
          }
        break
      }
    }
  }
}
</script>
