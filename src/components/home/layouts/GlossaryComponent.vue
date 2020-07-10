<template>
    <vk-grid class="uk-child-width-1-1 uk-margin-remove">
        <div class="uk-padding-remove uk-margin-remove">
          <vk-card class="uk-padding-large">
              <vk-grid class="uk-child-width-1-1 uk-margin-remove">
                  <div>

                  </div>
                  <div>

                  </div>
              </vk-grid>
          </vk-card>
        </div>
    </vk-grid>
</template>

<script>
    export default {
        name: 'glossary',
        data () {
          return {
            cards: {},
            data: {},
          }
        },
        beforeRouteEnter (to,from,next) {
            next( vm => {
                vm.checkSubscription(),
                next()
            });
        },
        methods: {
            checkSubscription(){
                switch( JSON.parse(this.$store.getters.isSubscribed) && JSON.parse(this.$store.getters.isPaid) ){
                    case true:
                        this.iniData();
                    break;
                    case false:
                        this.$router.push({name:"home"});
                    break;
                }
            },
            iniData(){
                this.bralcoaxios({ url: this.$store.state.app.env.backend_url + "/api/v1/glossary", request: "GET" }).then( (response) => {
                    let resolve = this.bralcoresponse(response);
                    console.log(resolve)
                });
                this.$store.commit('banner_title','Glossary')
                this.$store.commit('banner_content','');
                if( this.$store.getters.sidebar ){
                    this.$store.commit('sidebar',false);
                }
            }
        }
    }
</script>

<style>
  .uk-card-100{
    height: 100% !important;
  }
</style>
