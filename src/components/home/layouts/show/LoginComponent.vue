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
                <vk-card padding="small" type="blank">
                    <vk-tabs align="center" animation="fade">
                        <vk-tabs-item title="Login">
                            <article class="uk-article uk-margin uk-text-center">
                                <h1 class="uk-article-title">Account Login</h1>
                                <p>This is a secure system and you will need to provide your login details to access other features in this website.</p>
                            </article>
                            <vk-button @click="ssoLogin" class="uk-width-1-1" size="medium">Predictive Analytics SSO Login</vk-button>
                        </vk-tabs-item>
                        <vk-tabs-item title="Reset Password">
                            <article class="uk-article uk-margin uk-text-center">
                                <h1 class="uk-article-title">Account Reset Password</h1>
                                <p>Reset your account password.</p>
                            </article>
                            <form @submit.prevent="resetPassword" :action="$store.state.app.env.backend_url + '/api/v1/4irclub/auth/password/reset'" method="POST">
                                <fieldset class="uk-fieldset">

                                    <div class="uk-margin">
                                        <label>Email</label>
                                        <input class="uk-input uk-form-large" required name="email" type="email" placeholder="Email Address">
                                    </div>

                                    <div class="uk-margin">
                                        <vk-button htmlType="submit" class="uk-width-1-1" size="medium">Send</vk-button>
                                    </div>
                                </fieldset>
                            </form>
                        </vk-tabs-item>
                    </vk-tabs>
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
                    let resolve = this.bralcoresponse(response);
                    this.loginConfig(resolve);
                });
            },
            ssoLogin(){
              let url = this.$store.getters.env.VUE_APP_ENDPOINT_AUTH_URL;
                  url = url.replaceAll('#url#', btoa(window.location));
                  url = url.replaceAll('#role#',btoa(this.$store.getters.env.VUE_APP_ROLE));

              this.$store.commit('loader',true);

              window.addEventListener("message", (event) => {
                if (event.origin == this.$store.getters.env.VUE_APP_ENDPOINT_URL) {
                    var data = event.data;
                    this.loginConfig(data.values)
                    if( data.close ){
                      this.$store.commit('loader',false);
                    }
                }
              },false);

              let current = window.open(url,'popup','height=800px, width=600px');
              current.focus();

            },
            resetPassword (event) {
                let el = event.target
                let formData = new FormData(el);
                this.bralcoaxios({ url: el.attributes.action.value, request:el.attributes.method.value, form: formData }).then( (response) => {
                    this.bralcoresponse(response);
                });
            },
            loginConfig (data){

                    localStorage.setItem('access_token',data.access_token);
                    localStorage.setItem('token_type',data.token_type);
                    localStorage.setItem('expires_in',data.expires_in);
                    localStorage.setItem('refresh_token',data.refresh_token);


                    this.$store.commit('access_token',data.access_token);
                    this.$store.commit('token_type', data.token_type);
                    this.$store.commit('expires_in',data.expires_in);
                    this.$store.commit('refresh_token',data.refresh_token);
                    this.$store.commit('isAuthenticated',true);

                    this.bralcoaxios({ url: this.$store.getters.env.VUE_APP_ENDPOINT_URL + '/api/v1/4irclub/auth', request:'POST' }).then( (response) => {
                        let resolve = this.bralcoresponse(response);

                        this.$store.commit('isSubscribed',resolve.data.isSubscribed);
                        this.$store.commit('isPaid',resolve.data.isPaid);

                        localStorage.setItem('isSubscribed',resolve.data.isSubscribed);
                        localStorage.setItem('isPaid',resolve.data.isPaid);

                        switch(resolve.data.isSubscribed){
                            case true:
                                if(!resolve.data.isPaid){
                                    localStorage.setItem('pendingPayment',resolve.data.payment);
                                    window.location.href = window.location.hash != ""
                                                            ? window.location.origin + '/' + window.location.hash.split('/')[0] + '/' + this.$router.resolve({name:"checkout",params:{ payment: resolve.data.payment }}).href
                                                            : window.location.origin + this.$router.resolve({name:"checkout",params:{ payment: resolve.data.payment }}).href ;
                                } else {
                                    window.location.href = window.location.hash != ""
                                                            ? window.location.origin + '/' + window.location.hash.split('/')[0] + '/' + this.$router.resolve({name:"home"}).href
                                                            : window.location.origin + this.$router.resolve({name:"checkout",params:{ payment: resolve.data.payment }}).href ;
                                }
                            break;
                            case false:
                                window.location.href = window.location.hash != ""
                                                        ? window.location.origin + '/' + window.location.hash.split('/')[0] + '/' + this.$router.resolve({name:"plans"}).href
                                                        : window.location.origin + this.$router.resolve({name:"checkout",params:{ payment: resolve.data.payment }}).href ;
                            break;
                        }
                    });

            },
            studentlogin () {
                window.location.href = "https://lab.predictiveanalytics.co.ke/user/login/challenge?callbackurl=" + window.location.href + "challenge/";
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
