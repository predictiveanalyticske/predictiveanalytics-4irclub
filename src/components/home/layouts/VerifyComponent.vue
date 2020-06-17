<template>
    <vk-grid class="uk-child-width-1-1 uk-margin-remove">
        <div class="uk-padding-remove uk-margin-remove">
          <vk-card padding="large">
            <div class="success-checkmark">
              <div class="check-icon">
                <span class="icon-line line-tip"></span>
                <span class="icon-line line-long"></span>
                <div class="icon-circle"></div>
                <div class="icon-fix"></div>
              </div>
            </div>
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
          // this.bralcoaxios({ url: this.$store.state.app.env.backend_url+'/api/v1/4irclub/auth/email/verify' , request: 'POST', form: { '_method': 'PUT', 'token': this.$route.params.token } }).then( (response) => {
          //     let resolve   = this.bralcoresponse(response);
          //     this.loading  = false;
          //     this.verified = resolve.verified;
          // });
        }
    }
</script>

<style lang="scss">
  @import '@/assets/css/animation.scss';
</style>
