<template>
  <router-view name="global"></router-view>
</template>

<script>
export default {
  name: 'App',
  computed: {
    storage () {
      let items = {};
      for(let value in window.localStorage){
        if( typeof  window.localStorage[value] == 'string' && value != undefined &&window.localStorage[value] != undefined && window.localStorage[value] != '' ){
          items[value] = window.localStorage[value];
        }
      }
      return items;
    }
  },
  watch: {
    storage: {
      handler(val){
        if( val.length > 0 ){
            this.$store.commit('access_token',val.getItem('access_token'));
            this.$store.commit('token_type',  val.getItem('token_type'));
            this.$store.commit('expires_in',  val.getItem('expires_in'));
            this.$store.commit('isAuthenticated',  true);
        }
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style>
  @import './assets/css/style.css';
</style>

<style lang="scss">
  @import '@/assets/css/accordion.scss';
</style>
