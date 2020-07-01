<template>
  <div class="accordion  uk-padding-remove">
    <div class="accordion-item">
        <div class="accordion-header">
            <a href="#" @click.prevent="true">
                <div class="accordion-header-div">Subscriptions</div>
                <div class="accordion-header-div">
                    <div class="accordion-caret"></div>
                </div>
            </a>
        </div>
        <div class="accordion-body" ref="accordionbody">
          <div class="accordion-content uk-padding-large">
            <vk-grid class="uk-child-width-1-2@xl uk-child-width-1-2@l uk-child-width-1-2@m uk-child-width-1-1@s">
              <div>
                <vk-card class="br-plans uk-text-center" padding="small">
                  <label><h6 class="uk-margin-remove"><input @click="selectSubscription" class="uk-radio" name="subscription" type="radio" v-model="amount" data-target="monthly" :value="data.monthly_cost"> Monthly Subscription</h6></label>
                  <h4 class="uk-text-muted uk-margin-remove">Monthly</h4>
                  <vk-card-title class="uk-margin-small">{{ data.currency }} {{ data.monthly_cost }}</vk-card-title>
                </vk-card>
              </div>
              <div>
                <vk-card class="br-plans uk-text-center" padding="small">
                  <label><h6 class="uk-margin-remove"><input class="uk-radio" @click="selectSubscription" name="subscription" type="radio" v-model="amount" data-target="annual" :value="data.annual_cost"> Annual Subscription</h6></label>
                  <h4 class="uk-text-muted uk-margin-remove">Annually</h4>
                  <vk-card-title class="uk-margin-small">{{ data.currency }} {{ data.annual_cost }}</vk-card-title>
                </vk-card>
              </div>
            </vk-grid>
          </div>
        </div>
    </div>
  </div>
</template>
<script>
  import gsap from "gsap";
  import { TweenLite, Elastic } from 'gsap/all'
  export default {
    methods: {
      selectSubscription () {
        let el = event.target;
        this.fields.subscription_type = el.attributes['data-target'].value;
        this.type = el.attributes['data-target'].value;
      }
    },
    beforeCreate(){
      // don't forget to register plugins
      gsap.registerPlugin(TweenLite, Elastic); 
    },
    data () {
      return {
        amount: 0,
        total: this.totalAmount,
        type: this.subType,
      }
    },
    mounted () {
      let el = this.$refs.accordionbody;
      TweenLite.to(el, 1, {
          height: el.scrollHeight,
          ease: Elastic.easeOut.config(1, 0.3)
      });
    },
    name: "subscription",
    props: ["fields","data","totalAmount","subType"],
    watch:{
      amount: {
        handler(val){
          if( val > 0){
            this.fields.amount = val;
            this.total  = this.data.currency + ' ' + val;
          }
        }
      }
    }
  }
</script>
