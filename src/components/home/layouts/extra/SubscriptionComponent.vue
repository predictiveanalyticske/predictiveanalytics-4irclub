<template>
  <div class="accordion uk-padding-remove">
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
              <div v-for="(value,index) in data" :key="index">
                <vk-card class="br-plans uk-text-center" padding="small">
                  <label>
                    <h6 class="uk-margin-remove">
                      <input @click="callback" class="uk-radio" name="subscription" type="radio" :target="value.type" :value="value.amount"> {{ value.type }} Subscription</h6>
                  </label>
                  <h4 class="uk-text-muted uk-margin-remove">{{ value.type }}</h4>
                  <vk-card-title class="uk-margin-small">{{ currency }} {{ value.amount }}</vk-card-title>
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
        let el = event.currentTarget;
        this.subscription.type = el.attributes.target.value;
        this.subscription.amount = el.value;
      }
    },
    beforeCreate(){
      // don't forget to register plugins
      gsap.registerPlugin(TweenLite, Elastic); 
    },
    data () {
      return {
        amount: 0,
        subscription: this.fields
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
    props: {
      data:{
        type: Array,
        required: true
      },
      currency:{
        type: String,
        required: true
      },
      callback: {
        type: Function,
        required: true,
      }
    },
  }
</script>

<style scoped>
  .accordion-body{
    height: inherit !important;
  }
</style>