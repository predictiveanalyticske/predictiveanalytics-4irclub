<template>
    <vk-grid class="uk-child-width-1-1 uk-margin-remove">
        <div class="uk-padding-remove uk-margin-remove">
            <vk-card class="br-banner uk-light uk-padding-large">
                <vk-grid class="uk-child-width-1-1 uk-text-center">
                    <div>
                        <h1>Signup</h1>
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
          <vk-card padding="small">
            <vk-grid class="uk-child-width-1-2@xl uk-child-width-1-2@l uk-child-width-1-2@m">
              <div class="uk-flex uk-flex-left uk-flex-middle">
                <div>
                    <img src="@/assets/images/signup.png"/>
                </div>
              </div>
              <div>
                <vk-card padding="large" type="blank">
                  <article class="uk-article uk-margin">
                      <h1 class="uk-article-title">Setup Account</h1>
                      <p>This is a secure system and you will need to provide your login details to access other features in this website.</p>
                  </article>
                  <form @submit.prevent="attemptLogin" :action="$store.state.app.env.backend_url + '/api/v1/4irclub/signup'" method="POST">
                      <fieldset class="uk-fieldset">
                          <div class="uk-margin">
                              <label>First Name</label>
                              <input class="uk-input uk-form-large" required name="firstname" type="text" placeholder="First Name">
                          </div>

                          <div class="uk-margin">
                              <label>Last Name</label>
                              <input class="uk-input uk-form-large" required name="lastname" type="text" placeholder="Last Name">
                          </div>

                          <div class="uk-margin">
                              <label>Email Address</label>
                              <input class="uk-input uk-form-large" required name="email" type="email" placeholder="Email Address">
                          </div>

                          <div class="uk-margin">
                              <label>Password</label>
                              <input class="uk-input uk-form-large" required name="password" type="password" placeholder="Password">
                          </div>

                          <div class="uk-margin">
                              <label>Confirm Password</label>
                              <input class="uk-input uk-form-large" required name="password_confirmation" type="password" placeholder="Confirm Password">
                          </div>

                          <div class="uk-margin">
                            <vk-button htmlType="submit" class="uk-button-red" size="large">Signup</vk-button>
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
        name: "signup",
        methods: {
            attemptLogin (event) {
                let el = event.target
                let formData = new FormData(el);

                formData.append('client_key',    btoa(process.env.VUE_APP_PASSPORT_KEY));
                formData.append('client_secret', btoa(process.env.VUE_APP_PASSPORT_SECRET));

                if( this.$router.mode == "hash"){
                    formData.append('base_url', window.location.origin + '/#/');
                } else {
                    formData.append('base_url', window.location.origin);
                }

                this.bralcoaxios({ url: el.attributes.action.value, request:el.attributes.method.value, form: formData }).then( (response) => {
                    this.bralcoresponse(response);
                });
            }
        }
    }
</script>
