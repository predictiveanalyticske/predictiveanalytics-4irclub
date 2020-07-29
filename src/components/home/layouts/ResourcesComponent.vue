  <template>
    <vk-grid class="uk-child-width-1-1 uk-margin-remove" v-if="$route.params.item == undefined">
        <div class="uk-padding-remove uk-margin-remove">
          <vk-card class="uk-padding-large" type="blank">
              <h3 class="uk-text-center">Below is a list of resources to utilize and read through. </h3>
              <vk-grid class="uk-child-width-1-3">
               <div v-for="(value,index) in data" :key="index">
                   <vk-card class="uk-text-center uk-dark uk-padding-small">
                    <h4>{{ value.name }}</h4>
                    <vk-icon icon="file" ratio="6"></vk-icon>
                    <a class="uk-button uk-button-default uk-width-1-1 uk-marging" @click.prevent="download(value.id,value.name, value.filename)"><vk-icon icon="download"></vk-icon></a>
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
                this.$store.commit('banner_title','Resources')
                this.$store.commit('banner_content','');
            },
            download (item,filename,ext){
                this.bralcoaxios({ url: this.$store.getters.backendurl + '/api/v1/4irclub/resources/download/' + item, request: "POST", responseType: 'blob'}).then( (response) => {
                  var resolve = this.bralcoresponse(response);
                    var fileURL = window.URL.createObjectURL(new Blob([resolve]));
                    var fileLink = document.createElement('a');
                    fileLink.href = fileURL;

                    fileLink.setAttribute('download', filename + '.' + ext.split('.')[1]);

                    document.body.appendChild(fileLink);
                    fileLink.click();
                });
            }
        }
    }
</script>

<style>
  .uk-card-100{
    height: 100% !important;
  }
</style>
