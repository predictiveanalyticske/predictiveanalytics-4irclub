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
                <div class="uk-flex uk-flex-left uk-flex-middle">
                  <div>
                  </div>
                </div>
              </div>
              <div>
                <vk-card padding="large" type="blank">
                  <article class="uk-article uk-margin">
                      <h1 class="uk-article-title">Set Account Password</h1>
                  </article>
                  <form @submit.prevent="submitForm" :action="$store.state.app.env.backend_url + '/api/v1/auth/password/set/' + user" method="POST">
                      <fieldset class="uk-fieldset">

                          <div class="uk-margin">
                              <label>Password</label>
                              <input class="uk-input uk-form-large" required name="password" type="password" placeholder="Password">
                          </div>

                          <div class="uk-margin">
                              <label>Confirm Password</label>
                              <input class="uk-input uk-form-large" required name="password_confirmation" type="password" placeholder="Password">
                          </div>

                          <div class="uk-margin">
                            <vk-button htmlType="submit" class="uk-button-red" size="large">Activate</vk-button>
                          </div>
                      </fieldset>
                  </form>
                </vk-card>
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
            user: null
          }
        },
        methods: {
          submitForm() {
            let el = event.target;
            let formData = new FormData(el);
            formData.append( 'return_url', this.$router.resolve({name:"login"}).href );
            this.bralcoaxios({ url: el.attributes.action.value , request: el.attributes.method.value, form: formData}).then( (response) => {
                this.bralcoresponse(response);
            });
          }
        },
        created () {
          this.bralcoaxios({ url: this.$store.state.app.env.backend_url+'/api/v1/auth/email/verify' , request: 'POST', form: { '_method': 'PUT', 'token': this.$route.params.token } }).then( (response) => {
              let resolve = this.bralcoresponse(response);
              this.user = resolve.user;
          });
        },
    }
</script>
