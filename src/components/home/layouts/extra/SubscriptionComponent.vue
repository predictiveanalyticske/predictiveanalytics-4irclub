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
          <div class="accordion-content uk-padding">
             <label><h6 class="uk-margin-remove"><input @click="selectSubscription" class="uk-radio" name="subscription" type="radio" v-model="fields.amount" data-target="monthly" :value="data.monthly_cost"> Monthly Subscription</h6></label>
             <div class="uk-padding-small uk-grid uk-grid-small">
                 <div class="uk-leader-fill-content uk-width-expand">Total</div>
                 <div>{{ data.monthly_cost }}</div>
             </div>
             <label><h6 class="uk-margin-remove"><input class="uk-radio" @click="selectSubscription" name="subscription" type="radio" v-model="fields.amount" data-target="annual" :value="data.annual_cost"> Annual Subscription</h6></label>
             <div class="uk-padding-small uk-grid uk-grid-small">
                 <div class="uk-leader-fill-content uk-width-expand">Total</div>
                 <div>{{ data.annual_cost }}</div>
             </div>
          </div>
        </div>
    </div>
  </div>
</template>
<script>
  import { TweenLite, Elastic } from 'gsap/all'
  export default {
    methods: {
      selectSubscription () {
        let el = event.target;
        this.fields.subscription_type = el.attributes['data-target'].value;
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
    props: ["fields","data"],
  }
</script>
