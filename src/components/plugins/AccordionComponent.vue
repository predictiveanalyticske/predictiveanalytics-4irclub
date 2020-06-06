<template>
  <div class="accordion uk-padding-remove">
      <div
          class="accordion-item"
          v-for="(content, i) in contents"
          :key="i"
          v-bind:class="{ 'accordion-active': content.active }"
      >
          <div class="accordion-header">
              <a href="#" @click.prevent="expand(i)">
                  <div class="accordion-header-div">{{ content.title }}</div>
                  <div class="accordion-header-div">
                      <div class="accordion-caret"></div>
                  </div>
              </a>
          </div>
          <div class="accordion-body" v-bind:ref="'accordion-body-' + i">
              <div class="accordion-content" v-if="content.description != undefined">{{ content.description }}</div>
              <div v-html="content.html"  class="accordion-content" v-if="content.html != undefined"></div>
          </div>
          <div class="accordion-footer">
                <div class="accordion-content" v-if="content.footer != undefined">{{ content.footer }}</div>
                <div class="accordion-content" v-if="content.footerhtml != undefined" v-html="content.footerhtml" ></div>
          </div>
      </div>
  </div>
</template>

<script>
 import gsap from "gsap";
 import { TweenLite, Bounce, Elastic } from 'gsap/all'
 export default {
    props: ['contents'],
    computed: {
        accordion () {
            return this.$refs;
        }
    },
    methods: {
        expand (i) {
            let el = this.$refs['accordion-body-'+i][0];
            if (this.contents[i].active === false) {
                this.contents[i].active = true;

                TweenLite.to(el, 1, {
                    height: el.scrollHeight,
                    ease: Elastic.easeOut.config(1, 0.3)
                });
            } else {
                this.contents[i].active = false;

                TweenLite.to(el, 0.5, {
                    height: 0,
                    ease: Bounce.easeOut
                });
            }
        }
    },
    beforeCreate(){
      // don't forget to register plugins
      gsap.registerPlugin(TweenLite, Elastic); 
    },
    mounted (){
        for(let value in this.contents){
            if( this.contents[value].active ){
                let el = this.$refs['accordion-body-'+value][0];
                TweenLite.to(el, 1, {
                    height: el.scrollHeight,
                    ease: Elastic.easeOut.config(1, 0.3)
                });
            }
        }
    }
}
</script>

<style lang="scss">
  @import '@/assets/css/accordion.scss'
</style>
