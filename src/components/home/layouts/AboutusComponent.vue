<template>
    <vk-grid class="uk-child-width-1-1 uk-margin-remove">
        <div class="uk-padding-remove uk-margin-remove" id="content">
            <vk-card>
                <div class="uk-flex uk-flex-center">
                  <div class="uk-width-2-3@xl uk-width-2-3@l uk-width-1-2@m uk-width-1-1@s">
                    <vk-grid class="uk-child-width-1-1">
                            <div class="uk-text-center@s">
                                <h1 class="br-heading">Platform Objective</h1><hr>
                                <h4 class="br-heading-title">
                                    Life Long Learning to re-engineer your career, institution and business to be adaptive to the demands of the emerging 4th Industrial Revolution.
                                    Lifelong learning is the "ongoing, voluntary, and self-motivated" pursuit of knowledge for either personal or professional reasons. Therefore, it not only enhances social inclusion, active citizenship, and personal development, but also self-sustainability, as well as competitiveness and employability.
                                </h4>
                                <h4>This is necessitated by the drive towards the 4th industrial revolution.
                                    The fourth industrial revolution is the current and developing environment in which disruptive technologies and trends such as the Internet of Things (IoT), robotics, virtual reality (VR) and artificial intelligence (AI) are changing the way we live and work.
                                    Reskilling – the process of learning new skills so you can do a different job, or of training people to do a different job. ... While upskilling points out the same, it focuses more on improving worker's skills so they can work within the same job.
                                </h4>
                            </div>
                            <div class="uk-text-center@s">
                                <h1 class="br-heading">Post Covid Business Recovery</h1><hr>
                                <blockquote>
                                <h5>An excerpt from Mckinsey Report by David Fine, Julia Klier et Al on How to Rebuild and reimagine Jobs amid the coronavirus crisis. </h5>
                                </blockquote>
                                <h4>
                                    Even before the COVID-19 crisis, structural that were reshaping the labor market and increasing demand for particular skills were under way. 
                                    Technological advances were expected to bring large-scale change in demand for particular roles in the workforce. For example, demand was forecast to increase for ICT specialists and managers as well as for “future skills,” such as digital literacy and cognitive, social, and emotional skills. Demand was expected to decline for administrative roles.  
                                </h4>   
                                <h4>
                                    The COVID-19 crisis ushers in a new paradigm for reskilling across three dimensions. First, physical distancing causes traditional formats to be replaced online, calling for creativity in delivering effective training (specifically for soft skills, such as teamwork). Second, rapid reskilling requires much shorter interventions and a different system to recognize those skills.
                                    Microcredits will replace traditional degrees in many cases. Third, a crisis of this degree calls for a mindset shift toward the greater good of society as opposed to focusing on competitive advantage for a specific company. Companies that otherwise would be business competitors will need to collaborate and provide reskilling opportunities at an industry level.
                                </h4>
                            </div>
                        </vk-grid>
                    </div>
                 </div>
            </vk-card>
        </div>
    </vk-grid>
</template>

<script>
    export default {
        name: 'about',
        beforeMount(){
             this.$store.commit('banner_title','About Us')
             this.$store.commit('banner_content','');
             if( this.$store.getters.sidebar ){
                this.$store.commit('sidebar',false);
             }
        },
        mounted (){
             this.$store.commit('loader',false);
             let grid = document.getElementById('content');
             document.body.scrollTop = grid.offsetTop;
             document.documentElement.scrollTop = grid.offsetTop;
        }
    }
</script>
