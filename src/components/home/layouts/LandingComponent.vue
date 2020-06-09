<template>
    <vk-grid class="uk-child-width-1-1 uk-margin-remove">
        <div class="uk-padding-remove uk-margin-remove">
            <vk-card class=" uk-width-1-1 uk-light br-banner uk-padding-large">
                <vk-grid class="uk-child-width-expand uk-text-center">
                    <div>
                        <h1>4th INDUSTRIAL REVOLUTION CLUB</h1>
                        <h4 class="uk-text-break uk-margin-remove">
                            Life Long Learning to re-engineer your career and business to 
                            be adaptive to the demands of the emerging 4th Industrial Revolution.
                        </h4>
                    </div>
                </vk-grid>
                <div class='box'>
                    <div class='wave -one'></div>
                    <div class='wave -two'></div>
                    <div class='wave -three'></div>
                </div>
            </vk-card>
        </div>
        <div class="uk-padding-remove uk-margin-remove">
            <vk-card class="uk-width-1-1">
                <vk-grid class="uk-child-width-1-1">
                    <div>
                        <vk-grid class="uk-child-width-1-2@xl uk-child-width-1-2@l uk-child-width-1-2@m uk-child-width-expand@s uk-padding-large">
                            <div>
                                <h2 class="uk-margin-remove">ABOUT 4TH INDUSTRIAL REVOLUTION CLUB</h2>
                                <h4 class="uk-margin">
                                    Lifelong learning is the "ongoing, voluntary, and self-motivated" pursuit of knowledge for either personal or professional reasons. 
                                    Therefore, it not only enhances social inclusion, active citizenship, and personal development, but also self-sustainability, as well as competitiveness and employability.
                                </h4>
                                <h4 class="uk-margin"> 
                                    This is necessitated by the drive towards the 4th industrial revolution. The fourth industrial revolution is the current and developing environment in which disruptive technologies and trends such as the Internet of Things (IoT), robotics, virtual reality (VR) and artificial intelligence (AI) are changing the way we live and work. 
                                    Reskilling – the process of learning new skills so you can do a different job, or of training people to do a different job.
                                </h4>
                                <a class="uk-button uk-button-red uk-button-large" :href="$router.resolve({name:'aboutus'}).href"> Learn More </a>
                            </div>
                            <div class="uk-text-center uk-visible@m uk-visible@l">
                            </div>
                        </vk-grid>
                    </div>
                    <div class="uk-text-center">
                        <h2 class="uk-margin-remove">MEMBERS ACCESS FEATURES</h2>
                        <div class="uk-padding-small">
                            <vueper-slides
                                class="no-shadow"
                                :visible-slides="2"
                                :slide-ratio="1 / 3"
                                :gap="5"
                                :dragging-distance="70">
                                <vueper-slide v-for="(slide, i) in slides" :key="i" :image="slide.image" :title="slide.title" :loading="true"  />
                            </vueper-slides>
                            <a class="uk-button uk-button-red uk-button-large" :href="$router.resolve({name:'aboutus'}).href"> View More </a>
                        </div>
                    </div>
                 
                </vk-grid>
            </vk-card>
        </div>

        <div>

        </div>
    </vk-grid>
</template>

<script>
    // In your Vue.js component.
    import { VueperSlides, VueperSlide } from 'vueperslides'
    import 'vueperslides/dist/vueperslides.css'

    export default {
        name: 'landing',
        components: {
            VueperSlides, VueperSlide 
        },
        data () {
            return {
                plansLink:this.$router.resolve({name:"plans"}).href,
                slides: [
                    { image: "/../assets/images/webinars.png", title: " Monthly Topical Webinairs." },                
                    { image: "/../assets/images/business-coach.jpg", title: " Business Consulting Opportunities." },                
                    { image: "/../assets/images/coach.png", title: "Free monthly group coaching (Career or Business)" },                
                    { image: "/../assets/images/code.png", title: " Free online courses." },                
                ]
            }
        }
    }
</script>
