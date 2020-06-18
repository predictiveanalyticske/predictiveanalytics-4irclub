<template>
    <vk-grid class="uk-child-width-1-1 uk-margin-remove">
        <div class="uk-padding-remove uk-margin-remove">
            <vk-card class="br-banner uk-width-1-1 uk-light uk-padding-large">
                <vk-grid class="uk-child-width-1-2">
                    <div>
                        <h1>Resource Not Found</h1>
                        <h4 class="uk-margin-remove">Verify and set account password to allow user to access the account and its services.</h4>
                    </div>
                </vk-grid>
            </vk-card>
        </div>
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
                <h1>Oops!!!</h1>
                <p> We could not find what you looking for. </p>
              </div>
            </vk-grid>
          </vk-card>
        </div>
    </vk-grid>
</template>

<script>
    export default {
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
