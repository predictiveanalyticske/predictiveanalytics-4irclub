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
          <div class="accordion-body" ref="accordionnew">
              <div class="accordion-content">
                <div class="uk-width-1-1 uk-padding-small">
                  <h3>Personal Information</h3>
                  <form ref="newuser">
                    <vk-grid class="uk-child-width-1-2@xl uk-child-width-1-2@l uk-child-width-1-2@m uk-child-width-1-1@s">
                      <div>
                        <label>First Name</label> 
                        <input class="uk-input" name="firstname" placeholder="First Name" required v-model="fields.newaccount.first_name" />
                      </div>
                      <div>
                        <label>Last Name</label> 
                        <input class="uk-input" name="lastname" placeholder="Last Name" required v-model="fields.newaccount.last_name" />
                      </div>
                      <div>
                        <label>Email</label> 
                        <input class="uk-input" name="email" placeholder="Email Address" required v-model="fields.newaccount.email" />
                      </div>
                      <div>
                        <label>Phone Number</label>
                        <vue-phone-number-input @update="getPhoneNumber" :required="true" :size="'10'" v-model="formatedNumber" :defaultCountryCode="'KE'"/>
                        <input type="hidden" class="uk-input" name="phone" v-model="formatedNumber"/>
                      </div>
                      <div class="uk-width-1-1">
                        <h3>Account Security</h3>
                      </div>
                      <div>
                        <label>Password</label>
                        <input class="uk-input" name="password" type="password" placeholder="Password" required v-model="fields.newaccount.password" />
                      </div>
                      <div>
                        <label>Confirm Password</label> <input class="uk-input" name="password_confirmation" type="password" placeholder="Confirm Password" required v-model="fields.newaccount.password_confirmation" />
                      </div>
                    </vk-grid>
                  </form>
                </div>
              </div>
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
          <div class="accordion-body" ref="accordionexisting">
              <div class="accordion-content">
                <div class="uk-width-1-1 uk-padding-small">
                  <h3>Enter Credentials</h3>
                    <vk-grid class="uk-child-width-1-2@xl uk-child-width-1-2@l uk-child-width-1-2@m uk-child-width-1-1@s">
                      <div>
                        <label>Email Address</label> 
                        <input class="uk-input" name="email" type="text" placeholder="Email Address" required v-model="fields.existingaccount.email" />
                      </div>
                      <div>
                        <label>Password</label> 
                        <input class="uk-input" type="password" name="password" placeholder="Password" required v-model="fields.existingaccount.password" />
                      </div>
                    </vk-grid>
                </div>
              </div>
          </div>
      </div>
  </div>
</div>
</template>

<script>
import gsap from "gsap";
import { TweenLite, Bounce, Elastic } from 'gsap/all'

export default {
  name: "billinginfo",
  props: ["fields"],
  data () {
    return {
      fieldsItems: this.fields,
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
      TweenLite.to(this.$refs[input.attributes.target.value], 1, {
          height:this.$refs[input.attributes.target.value].scrollHeight,
          ease: Elastic.easeOut.config(1, 0.3)
      });
      return input;
    },
    selectiveToggle(input){
      input.checked = true;
      switch( input.attributes.value.value ){
        case 'existingaccount':
          this.fields.type = "existingaccount";
          this.showExisting.show = true;
          if( this.showNewAccount.show ){
            this.showNewAccount.show = false;
            TweenLite.to(this.$refs[this.showNewAccount.target], 0.5, {
                height: 0,
                ease: Bounce.easeOut
            });
          }
        break;
        case 'newaccount':
          this.fields.type = "newaccount";
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
  },
}
</script>
