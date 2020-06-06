<template>
    <vk-grid class="uk-child-width-1-1 uk-margin-remove">
        <div class="uk-padding-remove uk-margin-remove">
            <vk-card class="br-banner uk-width-1-1 uk-light uk-padding-large">
                <vk-grid class="uk-child-width-1-2">
                    <div>
                        <h1>Veriry Account</h1>
                        <h4 class="uk-margin-remove">Verify and set account password to allow user to access the account and its services.</h4>
                    </div>
                </vk-grid>
            </vk-card>
        </div>
        <div class="uk-padding-remove uk-margin-remove">
          <vk-card padding="large">
            <vk-grid class="uk-child-width-1-2@xl uk-child-width-1-2@l uk-child-width-1-2@m uk-padding-large">
              <div>
                <div class="uk-flex uk-flex-center uk-flex-middle uk-padding-large">
                  <div>
                    <img src="@/assets/images/verify.png" width="400" /> 
                  </div>
                </div>
              </div>
              <div>
                <div class="uk-width-1-1 uk-text-center">
                  <h1>Activating Your Account.</h1>
                  <div v-if="loading">
                    <vk-spinner ratio="3"></vk-spinner>
                  </div>
                  <transition name="slide-fade">
                    <vk-card class="uk-card-success uk-light" v-if="verified">
                      <h3>
                        <vk-icon icon="happy"></vk-icon>
                        Your account is now active.
                      </h3>
                    </vk-card>
                  </transition>
                </div>
              </div>
            </vk-grid>
          </vk-card>
        </div>
    </vk-grid>
</template>

<script>
    export default {
        name: "verify",
        data () {
          return {
            loading: true,
            verified: false
          }
        },
        created () {
          this.bralcoaxios({ url: this.$store.state.app.env.backend_url+'/api/v1/4irclub/auth/email/verify' , request: 'POST', form: { '_method': 'PUT', 'token': this.$route.params.token } }).then( (response) => {
              let resolve   = this.bralcoresponse(response);
              this.loading  = false;
              this.verified = resolve.verified;
              this.$router.push({name:'home'});
          });
        }
    }
</script>
