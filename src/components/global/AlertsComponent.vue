<template>
  <transition name="slide-fade">
    <div class="uk-width-1-1 uk-text-center" ref="alerts" v-if="showAlert">
      <vk-card class="uk-card-alerts" padding="small">
        <div v-html="data" class="uk-width-3-4@xl uk-width-3-4@l uk-width-3-4@m"></div>
        <div class="uk-width-1-4@xl uk-width-1-4@l uk-width-1-4@m">
          <a href="#" @click.prevent=""><vk-icon icon="close"></vk-icon></a>
        </div>
      </vk-card>
    </div>
  </transition>
</template>
<script>
  export default {
    beforeMount () {
      console.log(document.cookies);
    },
    data () {
      return {
        showAlert: false
      }
    },
    name: "alerts",
    methods: {
      close () {
        let alerts = this.$refs.alerts;
        console.log(alerts);
      }
    },
    props: ["data"]
  }
</script>
