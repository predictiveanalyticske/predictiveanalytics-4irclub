<template>
  <div>
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
                  <div class="uk-width-1-1 uk-padding-small">
                      <ul class="uk-list uk-list-large">
                          <li><vk-icon icon="check" class="uk-text-success"></vk-icon> Go to <strong>Safaricom Menu</strong></li>
                          <li><vk-icon icon="check" class="uk-text-success"></vk-icon> Select <strong>M-PESA</strong></li>
                          <li><vk-icon icon="check" class="uk-text-success"></vk-icon> Select <strong>Lipa na MPESA</strong></li>
                          <li><vk-icon icon="check" class="uk-text-success"></vk-icon> Select <strong>Buy Good and Services</strong></li>
                          <li><vk-icon icon="check" class="uk-text-success"></vk-icon> Enter Paybill No <strong>{{ $store.state.app.data.global.company.mpesa_paybill }}</strong></li>
                          <li><vk-icon icon="check" class="uk-text-success"></vk-icon> Enter Amount <strong>{{ fields.amount }}</strong></li>
                      </ul>
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
                  <div class="uk-width-1-1 uk-padding-small uk-text-center">
                    <h3>4IRClub Visa Online Payment</h3>
                    <p>Your card will be charged <strong>{{ fields.amount }}</strong></p>
                    <creditcard />
                  </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</div>
</template>
<script>
import { TweenLite, Bounce, Elastic } from 'gsap/all'
import creditcard from '@/components/home/layouts/extra/CreditCardComponent'
export default {
  components: {
    creditcard,
  },
  name: "paymentmethod",
  props: ["fields"],
  data () {
    return {
      mpesa: {
        show: false,
        target: 'accordionmpesa'
      },
      creditcard: {
        show: false,
        target: 'accordioncard'
      }
    }
  },
  methods: {
    selectMethod () {
      let el = event.target;
      this.selectiveToggle(this.toggleAccordion(el));
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
