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
                    <article class="uk-article uk-margin uk-text-center">
                        <h1 class="uk-article-title">Set Account Password</h1>
                        <p>This is a secure system and you will need to provide your login details to access other features in this website.</p>
                    </article>
                    <form @submit.prevent="submitForm" :action="$store.state.app.env.backend_url + '/api/v1/4irclub/auth/password/reset/store/' + user.id" method="POST">
                        <fieldset class="uk-fieldset">

                            <div class="uk-margin">
                                <label>Password</label>
                                <input class="uk-input uk-form-large" required name="password" type="password" placeholder="Password">
                            </div>
                            <div class="uk-margin">
                                <label>Password</label>
                                <input class="uk-input uk-form-large" required name="password_confirmation" type="password" placeholder="Password">
                            </div>
                            <div class="uk-margin">
                                <vk-button htmlType="submit" class="uk-width-1-1" size="medium">Reset</vk-button>
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
                user: {}
            }
        },
        methods: {
            submitForm (event) {
                let el = event.target
                let formData = new FormData(el);

                formData.append('email',this.user.email);

                this.bralcoaxios({ url: el.attributes.action.value, request:el.attributes.method.value, form: formData }).then( (response) => {
                    var resolve = this.bralcoresponse(response);
                    if( resolve.status ){
                        this.$router.push({name:"auth"});
                    }
                });
            },
            initData(){
                this.bralcoaxios({ url: this.$store.state.app.env.backend_url + '/api/v1/4irclub/auth/password/reset/verify/' + this.$route.params.token, request:'GET' }).then( (response) => {
                    var resolve = this.bralcoresponse(response);
                    this.user = resolve.data.user;
                });   
            }
        },
        beforeRouteEnter(to,from,next){
            next( vm => {
                vm.initData();
                next();
            });
        },
        beforeMount(){
             this.$store.commit('banner_title','Reset Password')
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
