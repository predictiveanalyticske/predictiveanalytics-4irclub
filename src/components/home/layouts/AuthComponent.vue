<template>
    <vk-grid class="uk-child-width-1-1 uk-margin-remove">
        <div class="uk-padding-remove uk-margin-remove">
          <vk-card padding="large">
            <vk-grid class="uk-child-width-1-2@xl uk-child-width-1-2@l uk-child-width-1-2@m uk-child-width-1-1@s">
              <div class="uk-visible@s">
                <vk-card padding="large" type="blank">
                <img src="@/assets/images/login.png" alt="">
                </vk-card>
              </div>
              <div>
                <vk-card padding="large" type="blank">
                  <article class="uk-article uk-margin">
                      <h1 class="uk-article-title">Account Login</h1>
                      <p>This is a secure system and you will need to provide your login details to access other features in this website.</p>
                  </article>
                  <form @submit.prevent="attemptLogin" :action="$store.state.app.env.backend_url + '/api/v1/4irclub/auth/login'" method="POST">
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
                
                formData.append('client_id',     process.env.VUE_APP_PASSPORT_KEY);
                formData.append('client_secret', process.env.VUE_APP_PASSPORT_SECRET);
                formData.append('provider', 'clubusers');
                
                this.bralcoaxios({ url: el.attributes.action.value, request:el.attributes.method.value, form: formData }).then( (response) => {
                    this.bralcoresponse(response);
                });
            }
        },
        beforeMount(){
             this.$store.commit('banner_title','Signin')
             this.$store.commit('banner_content','');
             if( this.$store.getters.sidebar ){
                this.$store.commit('sidebar',false);
             }
        },
        mounted () {
            this.$store.commit('loader',false);
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        }
    }
</script>
