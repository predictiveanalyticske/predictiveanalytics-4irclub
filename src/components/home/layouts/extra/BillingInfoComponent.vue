<template>
<div>
  <div class="accordion  uk-padding-remove">
      <div class="accordion-item">
          <div class="accordion-header">
              <a href="#" @click.prevent="selectUser" >
                  <div class="accordion-header-div"><input value="newaccount" target="accordionnew" class="uk-radio" name="account" type="radio"> New Account</div>
                  <div class="accordion-header-div">
                      <div class="accordion-caret"></div>
                  </div>
              </a>
          </div>
      </div>
  </div>
  <div class="accordion uk-padding-remove">
      <div class="accordion-item">
          <div class="accordion-header">
              <a href="#" @click.prevent="selectUser">
                  <div class="accordion-header-div"> <input value="existingaccount" target="accordionexisting" class="uk-radio" name="account" type="radio"> Existing User</div>
                  <div class="accordion-header-div">
                      <div class="accordion-caret"></div>
                  </div>
              </a>
          </div>
      </div>
  </div>
</div>
</template>

<script>
import gsap from "gsap";
import { TweenLite, Elastic } from 'gsap/all'

export default {
  props: { 
    fields: {
      type: Object,
      detault: {}
    }
  },
  data () {
    return {
      formatedNumber: '',
      showNewAccount: {
        show: false,
        target: 'accordionnew'
      },
      showExisting: {
        show: false,
        target: 'accordionexisting'
      }
    }
  },
  beforeCreate(){
    // don't forget to register plugins
    gsap.registerPlugin(TweenLite, Elastic); 
  },
  methods: {
    openUrl(){
      this.$store.commit('loader',true);
      let el      = event.currentTarget;
      let target  = el.attributes['data-target'].value;
      let url     = process.env.VUE_APP_ENDPOINT_URL + '/auth/' + target;
      let current = window.open(url,'_blank');
      current.focus(); 
    },
    selectUser () {
      let el = event.target;
      this.selectiveToggle(this.toggleAccordion(el));
    },
    getPhoneNumber (val) {
      this.fields.newaccount.phone = val.formattedNumber;
      this.formatedNumber = val.formattedNumber;
    },
    toggleAccordion(el){
      let input;
      switch( el.parentElement.tagName ){
        case 'A':
          input = el.parentElement.children.item(0).children.item(0);
        break;
        case 'DIV':
          input = el.parentElement.children.item(0).children.item(0).children.item(0);
        break;
      }
      // TweenLite.to(this.$refs[input.attributes.target.value], 1, {
      //     height:this.$refs[input.attributes.target.value].scrollHeight,
      //     ease: Elastic.easeOut.config(1, 0.3)
      // });
      return input;
    },
    selectiveToggle(input){
      input.checked = true;
      let url = '';
      switch( input.attributes.value.value ){
        case 'existingaccount':
          this.fields.type = "existingaccount";
          url = process.env.VUE_APP_ENDPOINT_URL + '/api/v1/account/auth?type=login&callback='+btoa(window.location)+'&app='+btoa(process.env.VUE_APP_ROLE);
        break;
        case 'newaccount':
          this.fields.type = "newaccount";
          url = process.env.VUE_APP_ENDPOINT_URL + '/api/v1/account/auth?type=signup&callback='+btoa(window.location)+'&app='+btoa(process.env.VUE_APP_ROLE)+'&authenticate='+1;
        break
      }
      this.$store.commit('loader',true);
      window.addEventListener("message", (event) => {
          if (event.origin == process.env.VUE_APP_ENDPOINT_URL) { 
              var data          = event.data;
              this.fields.token = data.values;
              if( data.close ){
                this.$store.commit('loader',false);
              } 
          } 
      },false);
      let current = window.open(url,'popup','height=800px, width=600px');
      current.focus();
    }
  },
}
</script>
