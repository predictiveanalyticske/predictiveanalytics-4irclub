<template>
    <vk-grid class="uk-child-width-1-1 uk-margin-remove">
        <div class="uk-padding-remove uk-margin-remove">
          <vk-card padding="large">
            <vk-grid class="uk-child-width-1-2@xl uk-child-width-1-2@l uk-child-width-1-2@m uk-padding-large">
              <div>
                <div class="uk-flex uk-flex-left uk-flex-middle">
                  <div>
                  </div>
                </div>
              </div>
              <div>
                <h1 class="br-heading">We were unable to find to find the resource you were looking for.</h1>
              </div>
            </vk-grid>
          </vk-card>
        </div>
    </vk-grid>
</template>

<script>
    export default {
        beforeMount(){
             this.$store.commit('banner_title','Oops!!')
             this.$store.commit('banner_content','Nothing was found.');
        },
        beforeRouteEnter (to,from,next) {
          next( vm => {
            vm.initData(),
            next()
          });
        },
        methods: {
          initData(){
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
            this.$store.commit('loader',false);
          }
        },
        name: "verify",
    }
</script>
