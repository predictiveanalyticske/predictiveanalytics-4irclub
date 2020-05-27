<template>
<div>
  <div class="accordion  uk-padding-remove">
      <div class="accordion-item">
          <div class="accordion-header">
              <a href="#" @click.prevent="selectUser" >
                  <div class="accordion-header-div"><input value="newuser" target="accordionnew" class="uk-radio" name="account" type="radio"> New Account</div>
                  <div class="accordion-header-div">
                      <div class="accordion-caret"></div>
                  </div>
              </a>
          </div>
          <div class="accordion-body" ref="accordionnew">
              <div class="accordion-content">
                <div class="uk-width-1-1 uk-padding-small">
                  <h3>Personal Information</h3>
                  <div class="uk-grid uk-child-width-1-2@l uk-child-width-1-2@m uk-child-width-1-2@xl uk-child-width-expand@s">
                      <div>
                          <div class="uk-margin"><label>First Name</label> <input class="uk-input" name="firstname" placeholder="First Name" required v-model="fields.newaccount.firstname" /></div>
                          <div class="uk-margin"><label>Last Name</label> <input class="uk-input" name="lastname" placeholder="Last Name" required v-model="fields.newaccount.lastname" /></div>
                      </div>
                      <div>
                          <div class="uk-margin"><label>Email</label> <input class="uk-input" name="email" placeholder="Email Address" required v-model="fields.newaccount.email" /></div>
                          <div class="uk-margin"><label>Phone</label> <input class="uk-input" name="text" placeholder="Phone Number" required v-model="fields.newaccount.phone" /></div>
                      </div>
                  </div>
                  <h3>Account Security</h3>
                  <div class="uk-grid uk-child-width-1-2@l uk-child-width-1-2@m uk-child-width-1-2@xl uk-child-width-expand@s">
                      <div><label>Password</label> <input class="uk-input" name="password" placeholder="Password" required v-model="this.fields.newaccount.password" /></div>
                      <div><label>Confirm Password</label> <input class="uk-input" name="confirmpassword" placeholder="Confirm Password" required v-model="this.fields.newaccount.confirmpassword" /></div>
                  </div>
                </div>
              </div>
          </div>
      </div>
  </div>
  <div class="accordion uk-padding-remove">
      <div class="accordion-item">
          <div class="accordion-header">
              <a href="#" @click.prevent="selectUser">
                  <div class="accordion-header-div"> <input value="existinguser" target="accordionexisting" class="uk-radio" name="account" type="radio"> Existing User</div>
                  <div class="accordion-header-div">
                      <div class="accordion-caret"></div>
                  </div>
              </a>
          </div>
          <div class="accordion-body" ref="accordionexisting">
              <div class="accordion-content">
                <div class="uk-width-1-1 uk-padding-small">
                  <h3>Enter Credentials</h3>
                  <div class="uk-grid uk-child-width-1-2@l uk-child-width-1-2@m uk-child-width-1-2@xl uk-child-width-expand@s">
                      <div><label>First Name</label> <input class="uk-input" name="email" placeholder="First Name" required v-model="fields.existingaccount.email" /></div>
                      <div><label>Last Name</label> <input class="uk-input" name="password" placeholder="Last Name" required v-model="fields.existingaccount.password" /></div>
                  </div>
                </div>
              </div>
          </div>
      </div>
  </div>
</div>
</template>


<script>
import { TweenLite, Bounce, Elastic } from 'gsap/all'

export default {
  name: "billinginfo",
  props: ["fields"],
  data () {
    return {
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
  methods: {
    selectUser () {
      let el = event.target;
      this.selectiveToggle(this.toggleAccordion(el));
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
      TweenLite.to(this.$refs[input.attributes.target.value], 1, {
          height:this.$refs[input.attributes.target.value].scrollHeight,
          ease: Elastic.easeOut.config(1, 0.3)
      });
      return input;
    },
    selectiveToggle(input){
      input.checked = true;
      switch( input.attributes.value.value ){
        case 'existinguser':
          this.showExisting.show = true;
          if( this.showNewAccount.show ){
            this.showNewAccount.show = false;
            TweenLite.to(this.$refs[this.showNewAccount.target], 0.5, {
                height: 0,
                ease: Bounce.easeOut
            });
          }
        break;
        case 'newuser':
          this.showNewAccount.show = true;
          if( this.showExisting.show ){
            this.showExisting.show = false;
            TweenLite.to(this.$refs[this.showExisting.target], 0.5, {
                height: 0,
                ease: Bounce.easeOut
            });
          }
        break
      }
    }
  }
}
</script>
