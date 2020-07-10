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
                  <h1 class="br-heading">Your email address is verified.</h1>
                  <h2>You will be redirected to login in {{ count.value }} seconds</h2>
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
        verified: false,
        count: {
          type: Number,
          value: 5
        }
      }
    },
    methods: {
      countDownTimer() {
        let self = this;
        if(this.count.value > 0) {
            setTimeout(function() {
                self.count.value -= 1;
                self.countDownTimer()
            }, 1000)
        } else {
          this.$router.push({name:'auth'});
        }
      },
      initData() {
        let user = JSON.parse(atob(this.$route.params.user));
        let formData = new FormData();

        for(let value in user){
          formData.append( value, user[value]);
        }

        this.bralcoaxios({ url: this.$store.state.app.env.backend_url+'/api/v1/4irclub/auth/challenge' , request: 'POST', form: formData }).then( (response) => {
            let resolve   = this.bralcoresponse(response);
            console.log(resolve);
        });
      }
    },
    mounted () {
        this.$store.commit('loader',false);
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    },
    name: "loginchallenge",
  }
</script>
