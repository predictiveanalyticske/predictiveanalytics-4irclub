<template>
    <vk-grid class="uk-child-width-1-1 uk-margin-remove">
        <div class="uk-padding-remove uk-margin-remove">
          <vk-card padding="large">
              <div class="uk-text-center">
                  <div class="success-checkmark">
                    <div class="check-icon">
                      <span class="icon-line line-tip"></span>
                      <span class="icon-line line-long"></span>
                      <div class="icon-circle"></div>
                      <div class="icon-fix"></div>
                    </div>
                  </div>
                  <h1 class="br-heading">SignIn with Lab Predictive Analytics.</h1>
              </div>
          </vk-card>
        </div>
    </vk-grid>
</template>

<script>
  export default {
    beforeMount(){
          this.$store.commit('banner_title','Verify Emaill Address')
          this.$store.commit('banner_content','');
    },
    beforeRouteEnter(to,from,next){
      next( vm => {
        vm.initData(),
        next();
      });
    },
    data () {
      return {
        loading: true,
      }
    },
    methods: {
      initData() {
        let user = JSON.parse(atob(this.$route.params.user));
        let formData = new FormData();
        console.log(user);
        for(let value in user){
          formData.append( value, user[value]);
        }

        // formData.append('base_url', window.location.origin + process.env.BASE_URL);
        // formData.append('client_id', btoa(process.env.VUE_APP_PASSPORT_KEY));
        // formData.append('client_secret', btoa(process.env.VUE_APP_PASSPORT_SECRET));

        // this.bralcoaxios({ url: this.$store.state.app.env.backend_url+'/api/v1/4irclub/auth/challenge' , request: 'POST', form: formData }).then( (response) => {
        //   let resolve = this.bralcoresponse(response);
        //   this.loginConfig(resolve);
        // });
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

    },
    mounted () {
        this.$store.commit('loader',false);
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    },
    name: "loginchallenge",
  }
</script>
