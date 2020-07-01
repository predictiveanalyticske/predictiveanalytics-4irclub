<template>
    <vk-grid class="uk-child-width-1-1 uk-margin-remove" v-if="$route.params.item == undefined">
        <div class="uk-padding-remove uk-margin-remove">
          <vk-card class="uk-padding-large">
              <h3>Below is a list of resources to utilize and read through. </h3>
              
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
                        this.initData();
                    break;
                    case false:
                        this.$router.push({name:"home"});
                    break;
                }
            },
            iniData(){
                this.bralcoaxios({ url: this.$store.state.app.env.backend_url + "/api/v1/4irclub/glossary", request: "GET" }).then( (response) => {
                    var resolve = this.bralcoresponse(response);
                    this.data   = resolve.data.resources;
                    let items = [];
                    for(let value of this.data){
                        items.push([{
                            active: true,
                            title: value.name,
                            html:  '<div class="uk-padding-small"><vk-icon icon="download"></vk-icon><a href="'+this.$store.getters.backendurl+'"/api/v1/resources/download/{item}"" target="_blank" class="uk-button uk-button-default">Download</a></div>'
                        }]);
                    }
                    this.cards = items; 
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
