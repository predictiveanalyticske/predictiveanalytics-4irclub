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
                                        <vk-button htmlType="submit" class="uk-width-1-1" size="medium">Login</vk-button>
                                        <vk-button size="medium" class="uk-width-1-1 uk-margin-small-top" @click="studentlogin" >Login With Lab</vk-button>
                                    </div>
                                </fieldset>
                            </form>
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
            resetPassword (event) {
                let el = event.target
                let formData = new FormData(el);
                this.bralcoaxios({ url: el.attributes.action.value, request:el.attributes.method.value, form: formData }).then( (response) => {
                    this.bralcoresponse(response);
                });
            },
            loginConfig (response){

                    localStorage.setItem('access_token',response.data.token.access_token);
                    localStorage.setItem('token_type',response.data.token.token_type);
                    localStorage.setItem('expires_in',response.data.token.expires_in);
                    localStorage.setItem('refresh_token',response.data.token.refresh_token);
                    localStorage.setItem('isSubscribed',response.data.isSubscribed);
                    localStorage.setItem('isPaid',response.data.isPaid);

                    this.$store.commit('access_token',response.data.token.access_token);
                    this.$store.commit('token_type', response.data.token.token_type);
                    this.$store.commit('expires_in',response.data.token.expires_in);
                    this.$store.commit('refresh_token',response.data.token.refresh_token);
                    this.$store.commit('isAuthenticated',true);
                    this.$store.commit('isSubscribed',response.data.isSubscribed);
                    this.$store.commit('isPaid',response.data.isPaid);

                    switch(response.data.isSubscribed){
                        case true:

                            if(!response.data.isPaid){
                                localStorage.setItem('pendingPayment',response.data.payment);
                                window.location.href = window.location.hash != ""
                                                        ? window.location.origin + '/' + window.location.hash.split('/')[0] + '/' + this.$router.resolve({name:"checkout",params:{ payment: response.data.payment }}).href
                                                        : window.location.origin + this.$router.resolve({name:"checkout",params:{ payment: response.data.payment }}).href ;
                            } else {
                                window.location.href = window.location.hash != ""
                                                        ? window.location.origin + '/' + window.location.hash.split('/')[0] + '/' + this.$router.resolve({name:"home"}).href
                                                        : window.location.origin + this.$router.resolve({name:"checkout",params:{ payment: response.data.payment }}).href ;
                            }

                        break;
                        case false:

                            window.location.href = window.location.hash != ""
                                                    ? window.location.origin + '/' + window.location.hash.split('/')[0] + '/' + this.$router.resolve({name:"plans"}).href
                                                    : window.location.origin + this.$router.resolve({name:"checkout",params:{ payment: response.data.payment }}).href ;

                        break;
                    }
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
