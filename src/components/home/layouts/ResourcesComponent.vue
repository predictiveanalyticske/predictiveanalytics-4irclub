<template>
    <vk-grid class="uk-child-width-1-1 uk-margin-remove" v-if="$route.params.item == undefined">
        <div class="uk-padding-remove uk-margin-remove">
            <vk-card class="br-banner uk-width-1-1 uk-light uk-padding-large">
                <vk-grid class="uk-child-width-1-1 uk-text-center">
                    <div>
                        <h1>Resources</h1>
                    </div>
                </vk-grid>
                <div class='box'>
                    <div class='wave -one'></div>
                    <div class='wave -two'></div>
                    <div class='wave -three'></div>
                </div>
            </vk-card>
        </div>
        <div class="uk-padding-remove uk-margin-remove">
          <vk-card class="uk-padding-large">
              <h3>Below is a list of resources to utilize and read through. </h3>
              <vk-grid class="uk-child-width-1-3">
               <div v-for="(value,index) in data" :key="index">
                   <vk-card type="blank" class="uk-text-center uk-card-red uk-light uk-padding-small">
                    <h4>{{ value.name }}</h4>
                    <vk-icon icon="file" ratio="6"></vk-icon>
                    <a class="uk-button uk-button-default uk-width-1-1 uk-marging" href="#"><vk-icon icon="download"></vk-icon></a>
                   </vk-card>
               </div>
              </vk-grid>
          </vk-card>
        </div>
    </vk-grid>
</template>

<script>
    export default {
        name: 'resources',
        data () {
          return {
            cards: {},
            data: {},
          }
        },
        beforeCreate () {
            this.bralcoaxios({ url: this.$store.state.app.env.backend_url + "/api/v1/4irclub/resources", request: "GET" }).then( (response) => {
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
        }
    }
</script>

<style>
  .uk-card-100{
    height: 100% !important;
  }
</style>
