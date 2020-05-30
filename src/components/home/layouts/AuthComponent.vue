<template>
    <vk-grid class="uk-child-width-1-1 uk-margin-remove">
        <div class="uk-padding-remove uk-margin-remove">
            <vk-card class="br-banner uk-width-1-1 uk-light uk-padding-large">
                <vk-grid class="uk-child-width-1-2">
                    <div>
                        <h1>Account Login</h1>
                        <h4 class="uk-margin-remove">Registered account can be able to access the services.</h4>
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
                      <h1>Welcome to the <br> 4th Industrial Revolution Club</h1>
                      <h4>To create an account click <a :href="$router.resolve({name:'signup'}).href">here</a>. <br> You will receive a free subscription <br> of up to 2weeks of trail.</h4>
                  </div>
                </div>
              </div>
              <div>
                <vk-card padding="large" type="blank">
                  <article class="uk-article uk-margin">
                      <h1 class="uk-article-title">Account Login</h1>
                      <p>This is a secure system and you will need to provide your login details to access other features in this website.</p>
                  </article>
                  <form @submit.prevent="attemptLogin" :action="$store.state.app.env.backend_url + '/api/v1/auth/login'" method="POST">
                      <fieldset class="uk-fieldset">
                          <div class="uk-margin">
                              <label>Email</label>
                              <input class="uk-input uk-form-large" required name="email" type="email" placeholder="Email Address">
                          </div>

                          <div class="uk-margin">
                              <label>Password</label>
                              <input class="uk-input uk-form-large" required name="password" type="password" placeholder="Password">
                          </div>

                          <div class="uk-margin">
                            <vk-button htmlType="submit" class="uk-button-red" size="large">Login</vk-button>
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
        name: "login",
        data () {
            return  {
                tab: 0,
                fields: {}
            }
        },
        methods: {
            attemptLogin (event) {
                let el = event.target
                let formData = new FormData(el);
                formData.append('return_url', this.$router.resolve({name:"home"}).href );
                this.bralcoaxios({ url: el.attributes.action.value, request:el.attributes.method.value, form: formData }).then( (response) => {
                    this.bralcoresponse(response);
                });
            }
        },
        mounted () {

        },
    }
</script>
